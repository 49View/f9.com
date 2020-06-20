//
// Created by dado on 14/06/2020.
//

#pragma once

#include <core/resources/resource_metadata.hpp>
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_utils.h>

#include <eh_arch/models//house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>

#include "events__fsm.hpp"
#include "property_listing_orchestrator.hpp"
#include "selection_remote_entity_editor.hpp"

class HouseMakerSelectionEditor {
public:
    HouseMakerSelectionEditor( SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                               ArchRenderController& arc, PropertyListingOrchestrator& _plo, RemoteEntitySelector& _res ) : sg(sg), rsg(rsg), asg(asg), arc(arc), plo(_plo), res(_res) {}
    template<typename BE>
    void update( BE *backEnd ) {

        // Just send this message every frame to compound few checks on position (automatic room selections etc)
        if ( asg.H() ) {
            backEnd->process_event(OnWhichRoomAmIEvent{});
        }

        static bool boSelection = false;
        ImGui::Begin("Selection", &boSelection);
        auto selected = arc.selectionFront();
        if ( selected ) {
            auto *room = HouseService::find<RoomBSData>(asg.H(), selected->hash);
            if ( room ) {
                roomSelector(room, backEnd);
            } else {
                auto *wall = HouseService::find<WallBSData>(asg.H(), selected->hash);
                if ( wall ) {
                    LOGRS("Wall selected: " << wall->epoints[selected->index] << " "
                                            << wall->epoints[selected->index + 1]);
                    auto aci = HouseService::findRoomArchSegmentWithWallHash(asg.H(), wall->hash, selected->index);
                    if ( aci ) {
                        ImGui::Text("Wall index: %d", static_cast<int>(*aci));
                    }
                }
            }
        } else {
            res.prepare(nullptr);
            // Activate property (listing) view so one can change listing attributes in here
            propertyLister();
        }
        ImGui::End();
    }

private:
    void propertyLister() {
        ImGui::LabelText( "Name", "%s", plo.ActiveProperty().name.c_str());
        ImGui::LabelText( "addressLine1", "%s", plo.ActiveProperty().addressLine1.c_str());
        ImGui::LabelText( "addressLine2", "%s", plo.ActiveProperty().addressLine2.c_str());
        ImGui::LabelText( "addressLine3", "%s", plo.ActiveProperty().addressLine3.c_str());
        ImGui::LabelText( "buyOrLet", "%s", plo.ActiveProperty().buyOrLet.c_str());
        ImGui::LabelText( "priceReadable", "%s", plo.ActiveProperty().priceReadable.c_str());
        ImGui::LabelText( "status", "%s", plo.ActiveProperty().status.c_str());

        ImGui::Text( "%s", plo.ActiveProperty().description.c_str());
        for ( const auto& feature : plo.ActiveProperty().keyFeatures ) {
            ImGui::BulletText("%s", feature.c_str());
        }
        ImGui::LabelText("Geo location", "%f, %f", plo.ActiveProperty().location.coordinates.x(), plo.ActiveProperty().location.coordinates.y());
        int imgCounter = 0;
        for ( const auto& thumb : plo.ActiveProperty().thumbs ) {
            if ( thumb.empty() ) continue;
            if (!sg.exists(ResourceGroup::Image, thumb)) {
                sg.addRawImage(thumb, RawImage{FM::readLocalFileC("/home/dado/media/media/" + thumb)});
            } else {
                auto im = rsg.TH(thumb);
                if ( imgCounter++ % 4 != 0 ) ImGui::SameLine();
                ImGui::Image( ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize) );
            }
        }
//        std::vector<std::string> thumbs{};
    }

    void materialChange( const std::string& label, MaterialAndColorProperty& targetMP, const std::string& presets = {} ) {
        ImGui::Separator();
        ImGui::Text("%s", label.c_str());
        auto imr = sg.get<Material>(targetMP.materialHash);
        if ( imr ) {
            auto im = rsg.TH(imr->getDiffuseTexture());
            auto matButtonId = label + targetMP.materialHash;
            ImGui::PushID(matButtonId.c_str());
            C4f target = targetMP.color;
            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize), ImVec2(0,0), ImVec2(1,1), -1, ImVec4(0,0,0,0), ImVec4(target.x(), target.y(), target.z(), 1.0f)) ) {
                res.prepare(&targetMP, presets);
            }
            if ( ImGui::IsItemHovered() ) {
                ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
            }
            ImGui::PopID();
        }
    }

    template<typename BE>
    void roomMiscProperties( RoomBSData *room, BE *backEnd ) {
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Separator();
        ImGui::Text("Properties");
        if ( ImGui::Checkbox("Has Coving", &room->mHasCoving) ) {
            backEnd->process_event(OnMakeHouse3dEvent{});
        }
    }

    template<typename BE>
    void roomTypeSelector( RoomBSData *room, BE *backEnd ) {
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Separator();
        ImGui::Text("Room type");
        static std::array<bool, ASType::LastRoom> hasRoomV{};
        auto startIndex = ASType::GenericRoom;
        for ( auto rn = startIndex; rn < ASType::LastRoom; rn++ ) {
            hasRoomV[rn - startIndex] = RoomService::hasRoomType(room, rn);
        }
        for ( auto rn = startIndex; rn < ASType::LastRoom; rn++ ) {
            if ( ImGui::Checkbox(RoomService::roomTypeToName1to1(rn).c_str(), &hasRoomV[rn - startIndex]) ) {
                if ( hasRoomV[rn - startIndex] ) {
                    RoomService::addRoomType(room, rn);
                    RoomService::removeRoomType(room, ASType::GenericRoom);
                } else {
                    RoomService::removeRoomType(room, rn);
                    if ( room->roomTypes.empty() ) {
                        RoomService::addRoomType(room, ASType::GenericRoom);
                    }
                }
                HouseService::reevaluateDoorsAndWindowsAfterRoomChange(asg.H());
                backEnd->process_event(OnRecalculateFurnitureEvent{});
            }
        }
    }

    template<typename BE>
    void roomTypePersonalisedEditor( RoomBSData *room, BE *backEnd ) {
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Separator();
        if ( RoomService::hasRoomType(room, ASType::Kitchen) ) {
            kitchenSelector(room, backEnd);
        }
    }

    template<typename BE>
    void kitchenSelector( RoomBSData *room, BE *backEnd ) {
        ImGui::Text("Kitchen Shape");
        if ( ImGui::RadioButton("Straight", room->kitchenData.kitchenShape == KS_Straight) ) {
            room->kitchenData.kitchenShape = KS_Straight;
            backEnd->process_event(OnRecalculateFurnitureEvent{});
        }
        ImGui::SameLine();
        if ( ImGui::RadioButton("L-Shape", room->kitchenData.kitchenShape == KS_LShape) ) {
            room->kitchenData.kitchenShape = KS_LShape;
            backEnd->process_event(OnRecalculateFurnitureEvent{});
        }
        ImGui::SameLine();
        if ( ImGui::RadioButton("U-Shape", room->kitchenData.kitchenShape == KS_UShape) ) {
            room->kitchenData.kitchenShape = KS_UShape;
            backEnd->process_event(OnRecalculateFurnitureEvent{});
        }
        ImGui::SameLine();
        if ( ImGui::RadioButton("Custom", room->kitchenData.kitchenShape == KS_Custom) ) {
            room->kitchenData.kitchenShape = KS_Custom;
            backEnd->process_event(OnRecalculateFurnitureEvent{});
        }

        if ( ImGui::Button("MainWallToggle") ) {
            for ( auto t = 0u; t < room->mWallSegmentsSorted.size(); t++ ) {
                room->kitchenData.kitchenIndexMainWorktop++;
                if ( room->kitchenData.kitchenIndexMainWorktop >= room->mWallSegmentsSorted.size() ) {
                    room->kitchenData.kitchenIndexMainWorktop = 0;
                }
                if ( room->mWallSegmentsSorted[room->kitchenData.kitchenIndexMainWorktop].length() > 1.5f ) {
                    backEnd->process_event(OnRecalculateFurnitureEvent{});
                    break;
                }
            }
        }

        materialChange("Worktop", room->kitchenData.worktopMaterial, "granite+marble");
        materialChange("Units", room->kitchenData.unitsMaterial, "wood+metal");
    }

    template<typename BE>
    void roomSelector( RoomBSData *room, BE *backEnd ) {
        res.update(backEnd, sg, rsg);
        materialChange("Walls", room->wallsMaterial, "plaster");
        materialChange("Floor", room->floorMaterial, "wood+tiles+carpet");
        materialChange("Skirting", room->skirtingMaterial, "wood+tiles");
        materialChange("Coving", room->covingMaterial, "wood+tiles");
        materialChange("Ceiling", room->ceilingMaterial, "plaster");
        roomMiscProperties(room, backEnd);
        roomTypeSelector(room, backEnd);
        roomTypePersonalisedEditor(room, backEnd);
    }

private:
    SceneGraph& sg;
    RenderOrchestrator& rsg;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    PropertyListingOrchestrator& plo;
    RemoteEntitySelector& res;
};
