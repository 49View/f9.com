//
// Created by dado on 14/06/2020.
//

#pragma once

#include <core/resources/resource_metadata.hpp>
#include <graphics/imgui/imgui.h>

#include <eh_arch/models//house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>

#include "events__fsm.hpp"

class HouseMakerSelectionEditor {
public:
    HouseMakerSelectionEditor( ArchOrchestrator& asg, ArchRenderController& arc ) : asg(asg), arc(arc) {}

    template <typename BE>
    void update( BE* backEnd ) {
        auto selected = arc.selectionFront();
        if ( selected ) {
            ImGui::Begin("Selection");
            auto *room = HouseService::find<RoomBSData>( asg.H(), selected->hash);
            if ( room ) {
                ImGui::Text("Floor");
                static char roomFloorMaterial[256] = {'\0'};
                if ( roomFloorMaterial[0] == '\0' ) {
                    std::strcpy(roomFloorMaterial, room->floorMaterial.c_str());
                }
                if ( ImGui::InputText("", roomFloorMaterial, 256,
                                      ImGuiInputTextFlags_EnterReturnsTrue | ImGuiInputTextFlags_CallbackCompletion |
                                      ImGuiInputTextFlags_CallbackHistory, [](ImGuiInputTextCallbackData* cb) -> int {
                    LOGRS("CC")
                    return 1;
                }, (void*)this)) {
                room->floorMaterial = roomFloorMaterial;
                backEnd->process_event(OnMakeHouse3dEvent{});
//                    ResourceMetaData::getListOf(ResourceGroup::Material, roomFloorMaterial,
//                                                []( CRefResourceMetadataList el ) {
//                                                    for ( auto const& emd : el ) {
//                                                        LOGRS("entity thumb" << emd.thumb);
//                                                    }
//                                                });
                }
                ImGui::Separator();
                ImGui::Text("Walls color");
                if ( ImGui::ColorPicker3("Wall Color", &room->wallColor[0]) ) {
                    backEnd->process_event(OnMakeHouse3dEvent{});
                }
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
                        asg.showIMHouse();
                    }
                }
            } else {
                auto *wall = HouseService::find<WallBSData>(asg.H(), selected->hash);
                if ( wall ) {
                    LOGRS("Wall selected: " << wall->epoints[selected->index] << " " << wall->epoints[selected->index + 1]);
                    auto aci = HouseService::findRoomArchSegmentWithWallHash(asg.H(), wall->hash, selected->index);
                    if ( aci ) {
                        ImGui::Text("Wall index: %d", static_cast<int>(*aci));
                    }
                }
            }

            ImGui::End();
        }
    }

private:
    ArchOrchestrator& asg;
    ArchRenderController& arc;
};
