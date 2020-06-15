//
// Created by dado on 14/06/2020.
//

#pragma once

#define IMGUI_DEFINE_MATH_OPERATORS

#include "house_maker_selection_editor.hpp"
#include "events__fsm.hpp"

#include <core/util.h>
#include <core/camera.h>
#include <core/resources/resource_metadata.hpp>

#include <graphics/imgui/imgui.h>
#include <graphics/imgui/imgui_internal.h>
#include <graphics/imgui/imgui_jsonvisit.hpp>

#include <render_scene_graph/render_orchestrator.h>
#include <render_scene_graph/runloop_graphics.h>

#include <eh_arch/models//house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/makers/image/house_maker_bitmap.hpp>

template <typename T>
class HouseMakerGUI : public BackEndService<T> {
public:
    HouseMakerGUI( SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg, ArchRenderController& arc,
                                  HouseMakerSelectionEditor& selectionEditor ) : sg(sg), rsg(rsg), asg(asg), arc(arc),
                                                                                 selectionEditor(selectionEditor) {
        rsg.setDragAndDropFunction(std::bind(&HouseMakerGUI::elaborateHouseCallback, this, std::placeholders::_1));
    }

    void elaborateHouseCallback( std::vector<std::string>& _paths ) {
        if ( _paths.empty() ) return;
        elaborateHouseStage1(_paths[0]);
        _paths.clear();
    }

    void elaborateHouseBitmap() {
        asg.setHouse(HouseMakerBitmap::make());
        asg.showIMHouse();
    }

    void elaborateHouseStage1( const std::string& filename ) {
        auto newHMB = HMBBSData{ getFileNameOnly(filename), RawImage{ FM::readLocalFileC(filename) } };
        HouseMakerBitmap::updateHMB(newHMB );
        updateHMB();
        sg.addRawImageIM(newHMB.filename, newHMB.image);
        asg.setHouse(HouseMakerBitmap::makeEmpty());
        asg.showIMHouse();
        asg.centerCameraMiddleOfHouse();
    }

    void updateHMB() {
        auto sourceImages = HouseMakerBitmap::prepareImages();

        auto sourceBim = sg.get<RawImage>(HouseMakerBitmap::HMB().filename + "_bin");
        if ( sourceBim ) {
            memcpy(sourceBim->data(), sourceImages.sourceFileImageBin.data, sourceBim->size());
            sg.updateRawImage(HouseMakerBitmap::HMB().filename + "_bin");
        } else {
            auto sourceBinParams = getImageParamsFromMat(sourceImages.sourceFileImageBin);
            auto sourceBinImage = RawImage{ sourceBinParams.width, sourceBinParams.height, sourceBinParams.channels,
                                            sourceImages.sourceFileImageBin.data };
            sg.addRawImageIM(HouseMakerBitmap::HMB().filename + "_bin", sourceBinImage);
        }
    }

    void ShowExampleAppDockSpace(bool* p_open)
    {
        static ImGuiDockNodeFlags dockspace_flags = ImGuiDockNodeFlags_None | ImGuiDockNodeFlags_PassthruCentralNode;

        // We are using the ImGuiWindowFlags_NoDocking flag to make the parent window not dockable into,
        // because it would be confusing to have two docking targets within each others.
        ImGuiWindowFlags window_flags = ImGuiWindowFlags_MenuBar | ImGuiWindowFlags_NoDocking;
        ImGuiViewport* viewport = ImGui::GetMainViewport();
        ImGui::SetNextWindowPos(viewport->GetWorkPos());
        ImGui::SetNextWindowSize(viewport->GetWorkSize());
        ImGui::SetNextWindowViewport(viewport->ID);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 0.0f);
        ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 0.0f);
        window_flags |= ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoCollapse | ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoMove | ImGuiWindowFlags_NoBackground;
        window_flags |= ImGuiWindowFlags_NoBringToFrontOnFocus | ImGuiWindowFlags_NoNavFocus;

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
        if (io.ConfigFlags & ImGuiConfigFlags_DockingEnable)
        {
            ImGuiID dockspace_id = ImGui::GetID("MyDockSpace");
            ImGui::DockSpace(dockspace_id, ImVec2(0.0f, 0.0f), dockspace_flags);
        }

        ImGui::End();
    }

    void update() {
        static bool doc = true;
        ShowExampleAppDockSpace(&doc);

        ImGui::Begin("SceneGraph");
        ImGui::Text("Scene nodes: %lu", sg.Nodes().size());
        sg.visitNodes([]( const GeomSPConst elem ) {
            ImGui::Text("%s", elem->Name().c_str());
        });
        ImGui::End();

        static bool boControl = true;
        ImGui::Begin("Control", &boControl, ImGuiWindowFlags_NoDecoration|ImGuiWindowFlags_NoTitleBar );
        if ( ImGui::Button("Elaborate") ) {
            elaborateHouseBitmap();
        }
        ImGui::SameLine();
        if ( ImGui::Button("Elaborate 3d") ) {
            this->backEnd->process_event(OnMakeHouse3dEvent{});
        }
        if ( ImGui::SliderFloat("Contrast", &HouseMakerBitmap::HMB().sourceContrast, 0.0f, 20.0f) ) {
            updateHMB();
        }
        if ( ImGui::SliderFloat("Brightness", &HouseMakerBitmap::HMB().sourceBrightness, 0.0f, 255.0f) ) {
            updateHMB();
        }
        if ( ImGui::SliderFloat("Gaussian", &HouseMakerBitmap::HMB().sourceGuassian, 1.0f, 5.0f) ) {
            updateHMB();
        }
        if ( ImGui::SliderInt("Gaussian Sigma", &HouseMakerBitmap::HMB().sourceGuassianSigma, 1, 21) ) {
            if ( !isOdd(HouseMakerBitmap::HMB().sourceGuassianSigma) ) HouseMakerBitmap::HMB().sourceGuassianSigma++;
            updateHMB();
        }
        if ( ImGui::SliderFloat("Gaussian Beta", &HouseMakerBitmap::HMB().sourceGuassianBeta, -5.0f, 5.0f) ) {
            updateHMB();
        }
        if ( ImGui::SliderFloat("minBinThreshold", &HouseMakerBitmap::HMB().minBinThreshold, 0.0f, 255.0f) ) {
            updateHMB();
        }
        if ( ImGui::SliderFloat("maxBinThreshold", &HouseMakerBitmap::HMB().maxBinThreshold, 0.0f, 255.0f) ) {
            updateHMB();
        }
        if ( !HouseMakerBitmap::HMB().filename.empty() ) {
            float tSize = 500.0f;
            auto texBin = rsg.RR().TM()->get(HouseMakerBitmap::HMB().filename + "_bin");
            auto ar = texBin->getAspectRatioVector();
            ImGui::Image(reinterpret_cast<ImTextureID *>(texBin->getHandle()), ImVec2{ tSize, tSize / ar.y() });
        }

        ImGui::Text("Winning Strategy: %d", HouseMakerBitmap::HMB().winningStrategy);
        ImGui::Text("Winning Margin: %f", HouseMakerBitmap::HMB().winningMargin);
        static float oldScaleFactor = HouseMakerBitmap::HMB().rescaleFactor;
        static float currentScaleFactorMeters = centimetersToMeters(HouseMakerBitmap::HMB().rescaleFactor);

        if ( ImGui::InputFloat("Scale Factor", &currentScaleFactorMeters, 0.001f, 0.01f, 5) ) {
            this->backEnd->process_event( OnGlobalRescaleEvent{ oldScaleFactor, currentScaleFactorMeters} );
            oldScaleFactor = HouseMakerBitmap::HMB().rescaleFactor;
        }

        static float fptf = arc.getFloorPlanTransparencyFactor();
        if ( ImGui::SliderFloat("floorPlanTransparencyFactor", &fptf, 0.0f, 1.0f) ) {
            arc.setFloorPlanTransparencyFactor(fptf);
            asg.showIMHouse();
        }

        if ( ImGui::Button("Publish") ) {
            FM::writeLocalFile("./asr2bed.json", asg.H()->serialize());
            Http::post(Url{ "/propertybim/5ea45ffeb06b0cfc7488ec45" }, asg.H()->serialize(),
                       []( HttpResponeParams params ) {
                           LOGRS("Published")
                       });
        }
        ImGui::End();

        ImGui::Begin("Camera");
        std::ostringstream camDump;
        camDump << *sg.DC().get();
        auto lines = split(camDump.str(), '\n');
        for ( const auto& line : lines ) {
            ImGui::Text("%s", line.c_str());
        }
        ImGui::End();

        if ( asg.H() ) {
            ImGui::Begin("House Properties");
            ImGui::Text("Walkable Area: %s", sqmToString(asg.H()->walkableArea).c_str());
            ImGui::Text("Num floors: %lu", asg.H()->mFloors.size());
            ImGui::InputFloat3("Best viewing position", &asg.H()->bestInternalViewingPosition[0]);
            ImGui::InputFloat3("Best viewing angle", &asg.H()->bestInternalViewingAngle[0]);
            if ( ImGui::Button("Set Starting Position") ) {
                asg.H()->bestInternalViewingPosition = rsg.DC()->getPosition();
                asg.H()->bestInternalViewingAngle = rsg.DC()->getIncrementQuatAngles();
            }
            if ( ImGui::Button("Set Dolly Position") ) {
                asg.H()->bestDollyViewingPosition = rsg.DC()->getPosition();
                asg.H()->bestDollyViewingAngle = rsg.DC()->getIncrementQuatAngles();
            }
            ImGui::End();

            ImGui::Begin("House Structure");
            asg.H()->visit<ImGUIJson>();
            ImGui::End();
        }

        selectionEditor.update(this->BackEnd());

//        ImGui::ShowDemoWindow();
    }

private:
    SceneGraph& sg;
    RenderOrchestrator& rsg;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    HouseMakerSelectionEditor& selectionEditor;
};
