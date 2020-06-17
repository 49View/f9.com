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

template<typename T>
static ImTextureID ImGuiRenderTexture( const T& im ) {
    return reinterpret_cast<ImTextureID *>(im);
};

static constexpr int thumbSize = 128;

class RemoteEntitySelector {
public:
    RemoteEntitySelector( HouseMaterialProperty& target, const std::string& presets = {} ) : target(target) {
        if ( !presets.empty() ) {
            ResourceMetaData::getListOf(ResourceGroup::Material, presets,
                                        [&]( CRefResourceMetadataList el ) {
                                            metadataList = el;
                                        });
        }
    }

    void activate() {
        bActive = true;
    }
    void deactivate() {
        bActive = false;
    }

    std::vector<std::string>
    tagsSanitisedFor( const std::string& query, const std::string& group, const std::vector<std::string>& tags ) {
        auto ret = tags;
        erase_if(ret, [query]( const auto& elem ) -> bool {
            return elem == query;
        });
        if ( group == ResourceGroup::Material ) {
            erase_if(ret, []( const auto& elem ) -> bool {
                return elem == "sbsar";
            });
        }
        return ret;
    }

    template<typename BE>
    void update( BE *backEnd, SceneGraph& sg, RenderOrchestrator& rsg ) {
        if ( bActive ) {
            ImGui::Begin("Entity");
            static char query[256] = { '\0' };
            if ( ImGui::InputText("Material", query, 256, ImGuiInputTextFlags_EnterReturnsTrue) ) {
                ResourceMetaData::getListOf(ResourceGroup::Material, query,
                                            [&]( CRefResourceMetadataList el ) {
                                                metadataList = el;
                                            });
            }
            if ( !metadataList.empty() ) {
                int grouping = 3;
                for ( auto m = 0u; m < metadataList.size(); m += 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if ( m + t >= metadataList.size() ) break;
                        const auto& meta = metadataList[m + t];
                        auto imr = sg.get<RawImage>(meta.thumb);
                        if ( !imr ) {
                            sg.addRawImageIM(meta.thumb, RawImage{ FM::readLocalFileC(
                                    "/home/dado/media/media/entities/" + meta.group + "/" + meta.thumb) });
                        }
                        auto im = rsg.TH(meta.thumb);
                        if ( im ) {
                            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize)) ) {
                                target.materialHash = meta.hash;
                                target.materialName = meta.name;
                                backEnd->process_event(OnMakeHouse3dEvent{});
                            }
                            auto santizedTags = tagsSanitisedFor(query, meta.group, meta.tags);
                            if ( ImGui::IsItemHovered() ) {
                                ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
                                ImGui::BeginTooltip();
                                ImGui::Text("%s", arrayToStringCompact(santizedTags).c_str());
                                ImGui::EndTooltip();
                            }
                        }
                        ImGui::SameLine();
                    }
                }
            }
            ImGui::End();
        }

    }

private:
    HouseMaterialProperty& target;
    ResourceMetadataList metadataList{};
    bool bActive = true;
};

class RemoteColorSelector {
public:
    RemoteColorSelector( HouseMaterialProperty& target ) : target(target) {}

    void activate() {
        bActive = true;
    }
    void deactivate() {
        bActive = false;
    }

    template<typename BE>
    void update( BE *backEnd, SceneGraph& sg, RenderOrchestrator& rsg ) {
        if ( bActive ) {
            ImGui::Begin("Colors");

            std::vector<std::pair<std::string, C4f>> colors;

            ImGui::Text("Color Family");

            colors.emplace_back("red", C4f::INDIAN_RED);
            colors.emplace_back("green", C4f::FOREST_GREEN);
            colors.emplace_back("black", C4f::DARK_GRAY);

            colors.emplace_back("blue", C4f::SKY_BLUE);
            colors.emplace_back("cream", C4f::SAND);
            colors.emplace_back("grey", C4f::PASTEL_GRAY);

            colors.emplace_back("orange", C4f::PASTEL_ORANGE);
            colors.emplace_back("pink", C4f::HOT_PINK);
            colors.emplace_back("purple", C4f::DARK_PURPLE);

            colors.emplace_back("teal", C4f::PASTEL_CYAN);
            colors.emplace_back("white", C4f::LIGHT_GREY);
            colors.emplace_back("yellow", C4f::PASTEL_YELLOW);

            int grouping = 3;
            for ( auto m = 0u; m < colors.size(); m += 3 ) {
                ImGui::NewLine();
                for ( int t = 0; t < grouping; t++ ) {
                    if ( m + t >= colors.size() ) break;
                    const auto& color = colors[m + t];
                    if ( ImGui::ColorButton(color.first.c_str(),
                                            ImVec4(color.second.x(), color.second.y(), color.second.z(), 1.0f), 0,
                                            ImVec2(thumbSize, thumbSize)) ) {
                        ResourceMetaData::getListOf(ResourceGroup::Color, color.first,
                                                    [&]( CRefResourceMetadataList el ) {
                                                        metadataList = el;
                                                    });
                    }
                    if ( ImGui::IsItemHovered() ) {
                        ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
                        ImGui::SetTooltip("%s", color.first.c_str());
                    }
                    ImGui::SameLine();
                }
            }

            ImGui::Separator();
            ImGui::NewLine();
            ImGui::Text("Colors");

            if ( !metadataList.empty() ) {
                for ( auto m = 0u; m < metadataList.size(); m += 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if ( m + t >= metadataList.size() ) break;
                        const auto& meta = metadataList[m + t];
                        if ( ImGui::ColorButton(meta.color.toString().c_str(),
                                                ImVec4(meta.color.x(), meta.color.y(), meta.color.z(), 1.0f), 0,
                                                ImVec2(thumbSize, thumbSize)) ) {
                            target.color = meta.color;
                            target.colorHash = meta.hash;
                            target.colorName = meta.name;
                            backEnd->process_event(OnMakeHouse3dEvent{});
                        }
                        if ( ImGui::IsItemHovered() ) {
                            ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
                            ImGui::BeginTooltip();
                            ImGui::Text("Color Name:");
                            ImGui::Text("%s", meta.name.c_str());
                            ImGui::EndTooltip();
                        }
                        ImGui::SameLine();
                    }
                }
            }
            ImGui::End();
        }

    }

private:
    HouseMaterialProperty& target;
    ResourceMetadataList metadataList{};
    bool bActive = true;
};

class HouseMakerSelectionEditor {
public:
    HouseMakerSelectionEditor( SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                               ArchRenderController& arc ) : sg(sg), rsg(rsg), asg(asg), arc(arc) {}
    template<typename BE>
    void update( BE *backEnd ) {

        if ( res ) {
            res->update(backEnd, sg, rsg);
        }

        if ( rcs ) {
            rcs->update(backEnd, sg, rsg);
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
            if ( res ) res->deactivate();
            if ( rcs ) rcs->deactivate();
        }
        ImGui::End();
    }

private:
    void materialChange( const std::string& label, HouseMaterialProperty& targetMP, const std::string& presets = {} ) {
        ImGui::Separator();
        ImGui::Separator();
        ImGui::Text("%s", label.c_str());
        auto imr = sg.get<Material>(targetMP.materialHash);
        if ( imr ) {
            auto im = rsg.TH(imr->getDiffuseTexture());
            auto matButtonId = label + targetMP.materialHash;
            ImGui::PushID(matButtonId.c_str());
            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize)) ) {
                res = std::make_shared<RemoteEntitySelector>(targetMP, presets);
            }
            if ( ImGui::IsItemHovered() ) {
                ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
            }
            ImGui::PopID();
        }
        ImGui::SameLine();
        C4f target = targetMP.color;
        auto colorButtonId = label + target.toString();
        if ( ImGui::ColorButton(colorButtonId.c_str(), ImVec4(target.x(), target.y(), target.z(), 1.0f), 0,
                                ImVec2(thumbSize / 2, thumbSize / 2)) ) {
            rcs = std::make_shared<RemoteColorSelector>(targetMP);
        }
        if ( ImGui::IsItemHovered() ) {
            ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
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
    std::shared_ptr<RemoteEntitySelector> res;
    std::shared_ptr<RemoteColorSelector> rcs;
};
