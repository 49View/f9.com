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

class RemoteEntitySelector {
public:
    RemoteEntitySelector( std::string& target ) : target(target) {}

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
            if ( query[0] == '\0' ) {
                std::strcpy(query, target.c_str());
            }
            if ( ImGui::InputText("Floor", query, 256, ImGuiInputTextFlags_EnterReturnsTrue) ) {
                ResourceMetaData::getListOf(ResourceGroup::Material, query,
                                            [&]( CRefResourceMetadataList el ) {
                                                metadataList = el;
                                            });
            }
            if ( !metadataList.empty() ) {
                for ( const auto& meta : metadataList ) {
                    auto imr = sg.get<RawImage>(meta.thumb);
                    if ( !imr ) {
                        sg.addRawImageIM(meta.thumb, RawImage{ FM::readLocalFileC(
                                "/home/dado/media/media/entities/" + meta.group + "/" + meta.thumb) });
                    }
                    auto im = rsg.TH(meta.thumb);
                    if ( im ) {
                        if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(128, 128)) ) {
                            target = meta.hash;
                            backEnd->process_event(OnMakeHouse3dEvent{});
                        }
                        auto santizedTags = tagsSanitisedFor(query, meta.group, meta.tags);
                        ImGui::Text("%s", arrayToStringCompact(santizedTags).c_str());
                    }
                }
            }
            ImGui::End();
        }

    }

private:
    std::string& target;
    ResourceMetadataList metadataList{};
    bool bActive = true;
};

class RemoteColorSelector {
public:
    RemoteColorSelector( C4f& target ) : target(target) {}

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

            colors.emplace_back("red",   C4f::INDIAN_RED );
            colors.emplace_back("green", C4f::FOREST_GREEN );

            for ( const auto& color : colors ) {
                if ( ImGui::ColorButton(color.first.c_str(), ImVec4(color.second.x(), color.second.y(), color.second.z(), 1.0f), 0, ImVec2(128,128)) ) {
                ResourceMetaData::getListOf(ResourceGroup::Color, color.first,
                                            [&]( CRefResourceMetadataList el ) {
                                                metadataList = el;
                                            });
                }
            }

            if ( !metadataList.empty() ) {
                int grouping = 3;
                for ( auto m = 0u; m < metadataList.size(); m+= 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if (m+t >= metadataList.size() ) break;
                        const auto& meta = metadataList[m+t];
                        if ( ImGui::ColorButton(meta.color.toString().c_str(), ImVec4(meta.color.x(), meta.color.y(), meta.color.z(), 1.0f), 0, ImVec2(128, 128)) ) {
                            target = meta.color;
                            backEnd->process_event(OnMakeHouse3dEvent{});
                        }
                        ImGui::SameLine();
//                        ImGui::Text("%s", meta.name.c_str());
                    }
                }
            }
            ImGui::End();
        }

    }

private:
    C4f& target;
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
        if ( !ImGui::Begin("Selection", &boSelection) ) {
            if ( res ) res->deactivate();
            if ( rcs ) rcs->deactivate();
            ImGui::End();
            return;
        }
        auto selected = arc.selectionFront();
        if ( selected ) {
            auto *room = HouseService::find<RoomBSData>(asg.H(), selected->hash);
            if ( room ) {
                colorChange("Walls color", room->wallColor );
                materialChange("Floor", room->floorMaterial);
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
    void colorChange( const std::string& label, C4f& target ) {
        ImGui::Separator();
        ImGui::Text("%s", label.c_str());
        if ( ImGui::ColorButton(target.toString().c_str(), ImVec4(target.x(), target.y(), target.z(), 1.0f))) {
            rcs = std::make_shared<RemoteColorSelector>(target);
        }

//        std::vector<std::pair<std::string, C4f>> colors;
//
//        colors.emplace_back("Reds",   C4f::INDIAN_RED );
//        colors.emplace_back("Greens", C4f::FOREST_GREEN );
//
//        for ( const auto& color : colors ) {
//            ImGui::ColorButton(color.first.c_str(), ImVec4(color.second.x(), color.second.y(), color.second.z(), 1.0f));
//        }
//        auto imr = sg.get<Material>(target);
//        if ( imr ) {
//            auto im = rsg.TH(imr->getDiffuseTexture());
//            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(128, 128)) ) {
//                res = std::make_shared<RemoteEntitySelector>(target);
//            }
//        }
    }

    void materialChange( const std::string& label, std::string& target ) {
        ImGui::Separator();
        ImGui::Text("%s", label.c_str());
        auto imr = sg.get<Material>(target);
        if ( imr ) {
            auto im = rsg.TH(imr->getDiffuseTexture());
            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(128, 128)) ) {
                res = std::make_shared<RemoteEntitySelector>(target);
            }
        }
    }

private:
    SceneGraph& sg;
    RenderOrchestrator& rsg;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    std::shared_ptr<RemoteEntitySelector> res;
    std::shared_ptr<RemoteColorSelector> rcs;
};
