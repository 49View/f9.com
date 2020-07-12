//
// Created by dado on 20/06/2020.
//

#pragma once

#include <core/resources/resource_metadata.hpp>
#include <core/util.h>
#include <graphics/imgui/imgui.h>
#include <poly/scene_graph.h>
#include <render_scene_graph/render_orchestrator.h>

#include <eh_arch/models/house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/models/htypes_functions.hpp>

#include "eh_arch/state_machine/arch_sm_events__fsm.hpp"
#include "selection_editor.hpp"

class RemoteEntitySelector {
public:

    ResourceMetadataListCallback resListCallback() {
        if ( resourceGroup == ResourceGroup::Material ) {
            return [this]( CRefResourceMetadataList el ) {
                metadataMaterialList = el;
            };
        }
        if ( resourceGroup == ResourceGroup::Geom ) {
            return [this]( CRefResourceMetadataList el ) {
                metadataGeomList = el;
            };
        }
        return nullptr;
    };

    void prepare( GHTypeT _label, const std::string& _presets, const std::string& _resourceGroup ) {
        label = _label;
        resourceGroup = _resourceGroup;
        auto presets =
                resourceGroup == ResourceGroup::Material ? defaultMaterialAndColorPropertyPresetsForGHType(_label)
                                                         : _presets;
        if ( !presets.empty() ) {
            ResourceMetaData::getListOf(resourceGroup, presets, resListCallback());
        }

    }

    static std::vector<std::string>
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

    template<typename BE, typename R>
    void update( BE *backEnd, const std::string& mediaFolder, SceneGraph& sg, RenderOrchestrator& rsg, R *_resource ) {

        if ( !_resource ) return;

        ImGui::Begin("Entity");
        ImGui::TextColored(ImVec4(0.5, 0.7, 0.2, 1.0), "%s", GHTypeToString(label).c_str());
        ImGui::NewLine();

        static char query[256] = { '\0' };
        if ( ImGui::InputText(resourceGroup.c_str(), query, 256, ImGuiInputTextFlags_EnterReturnsTrue) ) {
            ResourceMetaData::getListOf(resourceGroup, query, resListCallback());
        }

        if ( resourceGroup == ResourceGroup::Geom ) {
            if ( !metadataGeomList.empty() ) {
                int grouping = 3;
                for ( auto m = 0u; m < metadataGeomList.size(); m += 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if ( t > 0 ) ImGui::SameLine();
                        if ( m + t >= metadataGeomList.size() ) break;
                        const auto& meta = metadataGeomList[m + t];
                        if ( !meta.thumb.empty() ) {
                            auto imr = sg.get<RawImage>(meta.thumb);
                            if ( !imr ) {
                                auto fileData = FM::readLocalFileC(
                                        mediaFolder + "entities/" + meta.group + "/" + meta.thumb);
                                if ( !fileData.empty() ) {
                                    sg.addRawImageIM(meta.thumb, RawImage{ fileData });
                                }
                            }
                        }
                        auto im = rsg.TH( meta.thumb.empty() ? S::WHITE : meta.thumb);
                        if ( im ) {
                            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize)) ) {
                                backEnd->process_event(OnAddFurnitureSingleEvent{_resource, FurnitureSet{FT::FT_Sofa, meta.hash, meta.bboxSize, S::SQUARE}});
                            }
                            auto sanitizedTags = tagsSanitisedFor(query, meta.group, meta.tags);
                            if ( ImGui::IsItemHovered() ) {
                                ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
                                ImGui::BeginTooltip();
                                ImGui::Text("%s", arrayToStringCompact(sanitizedTags).c_str());
                                ImGui::EndTooltip();
                            }
                        }
                    }
                }
            }
        }

        if ( resourceGroup == ResourceGroup::Material ) {
            materialAndColorTarget = getCommonMaterialChangeMapping(label, _resource);
            if ( !materialAndColorTarget ) return;

            if ( !metadataMaterialList.empty() ) {
                int grouping = 3;
                for ( auto m = 0u; m < metadataMaterialList.size(); m += 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if ( t > 0 ) ImGui::SameLine();
                        if ( m + t >= metadataMaterialList.size() ) break;
                        const auto& meta = metadataMaterialList[m + t];
                        auto imr = sg.get<RawImage>(meta.thumb);
                        if ( !imr ) {
                            auto fileData = FM::readLocalFileC(
                                    mediaFolder + "entities/" + meta.group + "/" + meta.thumb);
                            if ( !fileData.empty() ) {
                                sg.addRawImageIM(meta.thumb, RawImage{ fileData });
                            }
                        }
                        auto im = rsg.TH(meta.thumb);
                        if ( im ) {
                            if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize)) ) {
                                materialAndColorTarget->materialHash = meta.hash;
                                materialAndColorTarget->materialName = meta.name;
                                backEnd->process_event(OnMakeHouse3dEvent{});
                            }
                            auto sanitizedTags = tagsSanitisedFor(query, meta.group, meta.tags);
                            if ( ImGui::IsItemHovered() ) {
                                ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
                                ImGui::BeginTooltip();
                                ImGui::Text("%s", arrayToStringCompact(sanitizedTags).c_str());
                                ImGui::EndTooltip();
                            }
                        }
                    }
                }

                std::vector<std::pair<std::string, C4f>> colors;

                ImGui::Separator();
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

                grouping = 3;
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
                                                            metadataColorList = el;
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
            }

            if ( !metadataColorList.empty() ) {
                int grouping = 3;
                for ( auto m = 0u; m < metadataColorList.size(); m += 3 ) {
                    ImGui::NewLine();
                    for ( int t = 0; t < grouping; t++ ) {
                        if ( m + t >= metadataColorList.size() ) break;
                        const auto& meta = metadataColorList[m + t];
                        if ( ImGui::ColorButton(meta.color.toString().c_str(),
                                                ImVec4(meta.color.x(), meta.color.y(), meta.color.z(), 1.0f), 0,
                                                ImVec2(thumbSize, thumbSize)) ) {
                            materialAndColorTarget->color = meta.color;
                            materialAndColorTarget->colorHash = meta.hash;
                            materialAndColorTarget->colorName = meta.name;
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
        }

        ImGui::End();
    }

private:
    GHTypeT label{ GHType::None };
    std::string resourceGroup{};
    MaterialAndColorProperty *materialAndColorTarget = nullptr;
    ResourceMetadataList metadataGeomList{};
    ResourceMetadataList metadataMaterialList{};
    ResourceMetadataList metadataColorList{};
};
