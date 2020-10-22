//
// Created by dado on 14/06/2020.
//

#pragma once

#define IMGUI_DEFINE_MATH_OPERATORS

#include "selection_editor.hpp"
#include "eh_arch/state_machine/arch_sm_events__fsm.hpp"

#include <core/util.h>
#include <core/camera.h>
#include <core/resources/resource_metadata.hpp>

#include <graphics/imgui/imgui.h>
#include <graphics/imgui/imgui_internal.h>
#include <graphics/imgui/imgui_jsonvisit.hpp>
#include <graphics/imgui/im_gui_console.h>

#include <render_scene_graph/render_orchestrator.h>
#include <render_scene_graph/runloop_graphics.h>

#include <eh_arch/models//house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/controller/outdoor_area/outdoor_area_ui.hpp>
#include <eh_arch/makers/image/house_maker_bitmap.hpp>

#include "property_listing_orchestrator.hpp"

template<typename T>
class HouseMakerGUI : public BackEndService<T> {
public:
    HouseMakerGUI( const CLIParamMap& _cli, SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg, ArchRenderController& arc,
                   HouseMakerSelectionEditor& selectionEditor, PropertyListingOrchestrator& _plo, OutdoorAreaUI& _oa ) : cli(_cli), sg(sg), rsg(rsg), asg(asg), arc(arc),
                                                                  selectionEditor(selectionEditor), plo(_plo), outdoorAreaUI(_oa) {
        rsg.setDragAndDropFunction(std::bind(&HouseMakerGUI::elaborateHouseCallback, this, std::placeholders::_1));
        Http::getNoCache(Url{ "/property/list/0/40" }, [&]( HttpResponeParams params ) {
            plo.PropertyList() = deserializeVector<PropertyListing>(params.BufferString());
        });
        floorPlanTransparency = std::make_shared<AnimType<float>>(1.0f, "FloorPlanTransparencyMenu");
    }

    void elaborateHouseCallback( std::vector<std::string>& _paths ) {
        if ( _paths.empty() ) return;
        if ( !asg.H() ) {
            this->backEnd->process_event(OnCreateNewPropertyFromFloorplanImageEvent{ _paths[0] });
            _paths.clear();
        }
    }

    void dockSpaceStartUp( bool *p_open ) {
        static ImGuiDockNodeFlags dockspace_flags = ImGuiDockNodeFlags_None | ImGuiDockNodeFlags_PassthruCentralNode;

        // We are using the ImGuiWindowFlags_NoDocking flag to make the parent window not dockable into,
        // because it would be confusing to have two docking targets within each others.
        ImGuiWindowFlags window_flags = ImGuiWindowFlags_NoDocking;
        ImGuiViewport *viewport = ImGui::GetMainViewport();
        ImGui::SetNextWindowPos(viewport->GetWorkPos());
        ImGui::SetNextWindowSize(viewport->GetWorkSize());
        ImGui::SetNextWindowViewport(viewport->ID);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 0.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 0.0f);
        window_flags |= ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoCollapse | ImGuiWindowFlags_NoResize |
                        ImGuiWindowFlags_NoMove | ImGuiWindowFlags_NoBackground;

        // Important: note that we proceed even if Begin() returns false (aka window is collapsed).
        // This is because we want to keep our DockSpace() active. If a DockSpace() is inactive,
        // all active windows docked into it will lose their parent and become undocked.
        // We cannot preserve the docking relationship between an active window and an inactive docking, otherwise
        // any change of dockspace/settings would lead to windows being stuck in limbo and never being visible.
        ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(0.0f, 0.0f));
        ImGui::Begin("DockSpace Demo", p_open, window_flags);
        ImGui::PopStyleVar();

        ImGui::PopStyleVar(2);

        // DockSpace
        ImGuiIO& io = ImGui::GetIO();
        if ( checkBitWiseFlag(io.ConfigFlags, ImGuiConfigFlags_DockingEnable) ) {
            ImGuiID dockspace_id = ImGui::GetID("MyDockSpace");
            ImGui::DockSpace(dockspace_id, ImVec2(0.0f, 0.0f), dockspace_flags);
        }

        ImGui::End();
    }

    void postProperty() {
        FM::writeLocalFile("./propertylatest.json", asg.H()->serialize());
        Http::post(Url{ "/property" }, plo.ActiveProperty().serialize());
        asg.saveHouse();
    }

    void update() {
        static bool doc = true;
        dockSpaceStartUp(&doc);

//        ImGui::Begin("SceneGraph");
//        ImGui::Text("Scene nodes: %lu", sg.Nodes().size());
//        sg.visitNodes([]( const GeomSPConst& elem ) {
//            ImGui::Text("%s", elem->Name().c_str());
//        });
//        ImGui::End();

        static bool boControl = true;
        ImGui::Begin("Control", &boControl, ImGuiWindowFlags_NoDecoration | ImGuiWindowFlags_NoTitleBar);
        static char exacliburLink[2048];
        if ( ImGui::InputText("Excalibur!", exacliburLink, 2048, ImGuiInputTextFlags_EnterReturnsTrue) ) {
            this->backEnd->process_event(OnImportExcaliburLinkEvent{exacliburLink});
        }

        if ( asg.H() ) {
            if ( asg.hasEvent(ArchIOEvents::AIOE_OnLoad) ) {
                this->backEnd->process_event(OnCreateHouseTexturesEvent{});
            }
            if ( ImGui::Button("Elaborate") ) {
                this->backEnd->process_event(OnElaborateHouseBitmapEvent{});
            }
            ImGui::SameLine();
            if ( ImGui::Button("Furnish") ) {
                this->backEnd->process_event(OnRecalculateFurnitureEvent{});
            }
            ImGui::SameLine();
            if ( ImGui::Button("Elaborate 3d") ) {
                this->backEnd->process_event(OnMakeHouse3dEvent{});
            }
            if ( ImGui::SliderFloat("NorthAngle", &asg.H()->sourceData.northCompassAngle, 0.0f, TWO_PI) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            static float slElevation = asg.H()->Elevation();
            if ( ImGui::InputFloat("Elevation", &slElevation, 3.0f, 9.0f, "%.0f") ) {
                this->backEnd->process_event(OnHouseChangeElevationEvent{slElevation});
            }
            if ( ImGui::Button("Toggle Collisions") ) {
                asg.toggleCollisions();
            }

            static float oldScaleFactor = asg.H()->sourceData.rescaleFactor;
            static float currentScaleFactorMeters = centimetersToMeters(asg.H()->sourceData.rescaleFactor);

            currentScaleFactorMeters = centimetersToMeters(asg.H()->sourceData.rescaleFactor);
            if ( ImGui::InputFloat("Scale Factor", &currentScaleFactorMeters, 0.001f, 0.01f, 5) ) {
                this->backEnd->process_event(OnGlobalRescaleEvent{ oldScaleFactor, currentScaleFactorMeters });
                oldScaleFactor = asg.H()->sourceData.rescaleFactor;
            }
            ImGui::Text("Walkable Area: %s", sqmToString(asg.H()->walkableArea).c_str());
            ImGui::Text("Num floors: %lu", asg.H()->mFloors.size());

            if ( ImGui::SliderFloat("floorPlanTransparencyFactor", &floorPlanTransparency->value, 0.0f, 1.0f) ) {
                rsg.RR().CLI( CommandBufferLimits::UI2dStart, [&](const std::shared_ptr<VPList>& v) {
                    v->setMaterialConstantAlpha( 1.0f-floorPlanTransparency->value );
                });
                rsg.RR().CLI( CommandBufferLimits::UnsortedCustom, [&](const std::shared_ptr<VPList>& v) {
                    v->setMaterialConstantAlpha( floorPlanTransparency->value );
                });
            }

            if ( ImGui::Button("Save") ) {
                plo.ActiveProperty().status = "staging";
                postProperty();
            }
            ImGui::SameLine();
            if ( ImGui::Button("Publish") ) {
                plo.ActiveProperty().status = "live";
                postProperty();
            }
        }
        ImGui::End();

        ImGui::Begin("Camera");
        std::ostringstream camDump;
        camDump << *sg.DC();
        auto lines = split(camDump.str(), '\n');
        for ( const auto& line : lines ) {
            ImGui::Text("%s", line.c_str());
        }
        ImGui::End();

        ImGui::Begin("Listing");
        for ( const auto& property : plo.PropertyList() ) {
            C4f color = C4fc::DARK_BLUE;
            if ( property.status == "live" ) color = C4fc::DARK_RED;
            if ( property.status == "defaults" ) color = C4fc::FOREST_GREEN;

            ImGui::PushID(property.status.c_str());
            ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(color.x(), color.y(), color.z(), 1.0f));
            ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(color.x(), color.y(), color.z(), 0.7f));
            ImGui::PushStyleColor(ImGuiCol_ButtonActive, ImVec4(color.x(), color.y(), color.z(), 0.5f));

            if ( ImGui::Button(( property.addressLine1 + property.name + property._id ).c_str()) ) {
                plo.ActiveProperty() = property;
                this->backEnd->process_event(OnLoadFloorPlanEvent{ plo.ActiveProperty() });
            }
            ImGui::PopStyleColor(3);
            ImGui::PopID();
        }
        ImGui::End();

        if ( asg.H() ) {
            ImGui::Begin("Conversion Parameters");
            if ( ImGui::SliderFloat("Contrast", &asg.H()->sourceData.sourceContrast, 0.0f, 20.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderFloat("Brightness", &asg.H()->sourceData.sourceBrightness, 0.0f, 255.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderFloat("Gaussian", &asg.H()->sourceData.sourceGaussian, 1.0f, 5.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderInt("Gaussian Sigma", &asg.H()->sourceData.sourceGaussianSigma, 1, 21) ) {
                if ( !isOdd(asg.H()->sourceData.sourceGaussianSigma) ) asg.H()->sourceData.sourceGaussianSigma++;
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderFloat("Gaussian Beta", &asg.H()->sourceData.sourceGaussianBeta, -5.0f, 5.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderFloat("minBinThreshold", &asg.H()->sourceData.minBinThreshold, 0.0f, 255.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            if ( ImGui::SliderFloat("maxBinThreshold", &asg.H()->sourceData.maxBinThreshold, 0.0f, 255.0f) ) {
                this->backEnd->process_event(OnUpdateHMBEvent{});
            }
            auto texBin = rsg.RR().TM()->get(asg.H()->propertyId + "_bin");
            if ( texBin ) {
                float tSize = 250.0f;
                auto ar = texBin->getAspectRatioVector();
                ImGui::Image(reinterpret_cast<ImTextureID *>(texBin->getHandle()), ImVec2{ tSize, tSize / ar.y() });
            }

            ImGui::Text("Winning Strategy: %d", asg.H()->sourceData.winningStrategy);
            ImGui::Text("Winning Margin: %f", asg.H()->sourceData.winningMargin);

            ImGui::End();


            ImGui::Begin("House Properties");
            auto colorOk = C4fc::SPRING_GREEN;
            auto colorBad = C4fc::INDIAN_RED;

            if ( ImGui::Button("Set Starting Position") ) {
                asg.H()->bestInternalViewingPosition = rsg.DC()->getPosition();
                asg.H()->bestInternalViewingAngle = rsg.DC()->quatAngle();
            }
            {
                bool bestInternalPositionSet = asg.H()->bestInternalViewingPosition != V3fc::ZERO;
                auto color = bestInternalPositionSet ? colorOk : colorBad;
                std::string ackText = bestInternalPositionSet ? "OK" : "Not set";
                ImGui::SameLine();
                ImGui::TextColored(ImVec4(color.x(), color.y(), color.z(), 1.0f), "%s", ackText.c_str());
            }
            ImGui::SameLine();
            if ( ImGui::Button("Set Dolly Position") ) {
                asg.H()->bestDollyViewingPosition = rsg.DC()->getPosition();
                asg.H()->bestDollyViewingAngle = rsg.DC()->quatAngle();
            }
            {
                bool bestDollyPositionSet = asg.H()->bestDollyViewingPosition != V3fc::ZERO;
                auto color = bestDollyPositionSet ? colorOk : colorBad;
                std::string ackText = bestDollyPositionSet ? "OK" : "Not set";
                ImGui::SameLine();
                ImGui::TextColored(ImVec4(color.x(), color.y(), color.z(), 1.0f), "%s", ackText.c_str());
            }
            ImGui::Separator();
            ImGui::Text("Camera paths");
            ImGui::SameLine();
            ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(colorOk.x(), colorOk.y(), colorOk.z(), 1.0f));
            if ( ImGui::Button("+") ) {
                this->backEnd->process_event(OnPushTourPathEvent{});
            }
            ImGui::PopStyleColor(1);
            int ki = 0;
            int tourIndex = 0;
            for ( auto& tour : asg.H()->tourPaths ) {
                if ( !tour.path.empty() ) {
                    ImGui::PushID(ki++);
                    ImGui::PushStyleColor(ImGuiCol_Button, ImVec4(colorBad.x(), colorBad.y(), colorBad.z(), 1.0f));
                    if ( ImGui::Button("-") ) {
                        this->backEnd->process_event(OnPopTourPathEvent{tourIndex});
                    }
                    ImGui::PopStyleColor(1);
                    ImGui::PopID();
                    ImGui::SameLine();
                }
                for ( auto& path : tour.path ) {
                    ImGui::PushID(ki++);
                    ImGui::SetNextItemWidth(100.0f);
                    ImGui::InputFloat("", &path.timestamp);
                    ImGui::PopID();
                    ImGui::SameLine();
                }
                ImGui::SameLine();
                ImGui::PushID(ki++);
                if ( ImGui::Button("K") ) {
                    this->backEnd->process_event(OnPushKeyFrameTourPathEvent{});
                }
                ImGui::PopID();
                tourIndex++;
            }
            ImGui::End();

            ImGui::Begin("House Structure");
            asg.H()->visit<ImGUIJson>();
            ImGui::End();
        }

        ImGuiLuaConsole(rsg);

        selectionEditor.update(this->BackEnd(), *cli.getParam("mediaFolder"));
        outdoorAreaUI.update( asg, rsg );

//        ImGui::ShowDemoWindow();

        // Modal callbacks
        if ( !rsg.CallbackPaths().empty() ) {
            ImGui::OpenPopup("New Floorplan");
            if ( ImGui::BeginPopupModal("New Floorplan", nullptr, ImGuiWindowFlags_AlwaysAutoResize) ) {
                if ( ImGui::Button("Import as new") ) {
                    this->backEnd->process_event(OnCreateNewPropertyFromFloorplanImageEvent{ rsg.CallbackPaths()[0] });
                    rsg.CallbackPaths().clear();
                }
                if ( ImGui::Button("Update floorplan") ) {
                    auto fext = getFileNameExt(rsg.CallbackPaths()[0], true);
                    Http::post(Url{ "/fs/updateFloorplan/" + asg.H()->propertyId + "/" + fext },
                               FM::readLocalFileC(rsg.CallbackPaths()[0]),
                               [&]( HttpResponeParams params ) {
                                   plo.ActiveProperty().floorplanUrl = std::string{
                                           reinterpret_cast<const char *>(params.buffer.get()), params.length };
                                   sg.addGenericCallback([&]() {
                                       this->backEnd->process_event(
                                               OnLoadFloorPlanEvent{ plo.ActiveProperty() });
                                   });
                               });
                    rsg.CallbackPaths().clear();
                }
                ImGui::EndPopup();
            }
        }

    }

    std::string MediaFolder() const {
        return *cli.getParam("mediaFolder");
    }

private:
    const CLIParamMap& cli;
    SceneGraph& sg;
    RenderOrchestrator& rsg;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    HouseMakerSelectionEditor& selectionEditor;
    PropertyListingOrchestrator& plo;
    OutdoorAreaUI& outdoorAreaUI;
    floata floorPlanTransparency;
};
