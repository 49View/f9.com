//
// Created by dado on 14/06/2020.
//

#pragma once

#include <core/resources/resource_metadata.hpp>
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_utils.h>
#include <graphics/imgui/ImGuizmo.h>

#include <eh_arch/models/house_service.hpp>
#include <eh_arch/models/htypes_functions.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>

#include "eh_arch/state_machine/arch_sm_events__fsm.hpp"
#include "property_listing_orchestrator.hpp"

class HouseMakerSelectionEditor {
public:
    [[maybe_unused]] HouseMakerSelectionEditor( SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                               ArchRenderController& arc, PropertyListingOrchestrator& _plo) : sg(sg), rsg(rsg), asg(asg), arc(arc), plo(_plo) {}
    template<typename BE>
    void update( BE *backEnd, const std::string& mediaFolder ) {

        // Just send this message every frame to compound few checks on position (automatic room selections etc)
        if ( asg.H() ) {
            backEnd->process_event(OnWhichRoomAmIEvent{});
        }

        static bool boSelection = false;
        ImGui::Begin("Selection", &boSelection);
        auto selected = arc.selectionFront();
        if ( selected ) {
            switch ( selected->elem->type ) {
                case RoomT:
                    roomSelector(dynamic_cast<RoomBSData*>(selected->elem), backEnd, mediaFolder );
                    break;
                case WallT:
                    HouseService::findRoomArchSegmentWithWallHash(asg.H(), selected->elem->hash, selected->index);
                    break;
                default:
                    break;
            }
        } else {
            // Activate property (listing) view so one can change listing attributes in here
            propertyLister(mediaFolder);
        }
        ImGui::End();
    }

private:
    void propertyLister( const std::string& mediaFolder ) {
        ImGui::LabelText("Name", "%s", plo.ActiveProperty().name.c_str());
        ImGui::LabelText("addressLine1", "%s", plo.ActiveProperty().addressLine1.c_str());
        ImGui::LabelText("addressLine2", "%s", plo.ActiveProperty().addressLine2.c_str());
        ImGui::LabelText("addressLine3", "%s", plo.ActiveProperty().addressLine3.c_str());
        ImGui::LabelText("buyOrLet", "%s", plo.ActiveProperty().buyOrLet.c_str());
        ImGui::LabelText("priceReadable", "%s", plo.ActiveProperty().priceReadable.c_str());
        ImGui::LabelText("status", "%s", plo.ActiveProperty().status.c_str());

        ImGui::Text("%s", plo.ActiveProperty().description.c_str());
        for ( const auto& feature : plo.ActiveProperty().keyFeatures ) {
            ImGui::BulletText("%s", feature.c_str());
        }
        ImGui::LabelText("Geo location", "%f, %f", plo.ActiveProperty().location.coordinates.x(),
                         plo.ActiveProperty().location.coordinates.y());
        int imgCounter = 0;
        for ( const auto& thumb : plo.ActiveProperty().thumbs ) {
            if ( thumb.empty() ) continue;
            if ( !sg.exists(ResourceGroup::Image, thumb) ) {
                std::string filename = mediaFolder + thumb;
                sg.addRawImage(thumb, RawImage{ FM::readLocalFileC(filename)});
            } else {
                auto im = rsg.TH(thumb);
                if ( imgCounter++ % 4 != 0 ) ImGui::SameLine();
                ImGui::Image(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize));
            }
        }
//        std::vector<std::string> thumbs{};
    }

    template<typename R>
    void materialChange( GHTypeT label, R *elem ) {

        MaterialAndColorProperty *targetMP = getCommonMaterialChangeMapping(label, elem);
        if ( !targetMP ) return;

        auto imr = sg.get<Material>(targetMP->materialHash);
        if ( !imr ) return;

        ImGui::BeginGroup();
        ImGui::Text("%s", GHTypeToString(label).c_str());

        auto im = rsg.TH(imr->getDiffuseTexture());
        auto matButtonId = std::to_string(label) + targetMP->materialHash;

        ImGui::PushID(matButtonId.c_str());
        C4f target = targetMP->color;
        if ( ImGui::ImageButton(ImGuiRenderTexture(im), ImVec2(thumbSize, thumbSize), ImVec2(0, 0), ImVec2(1, 1), -1,
                                ImVec4(0, 0, 0, 0), ImVec4(target.x(), target.y(), target.z(), 1.0f)) ) {
//            res.prepare(label, "", ResourceGroup::Material);
            currLabel = label;
        }
        if ( ImGui::IsItemHovered() ) {
            ImGui::SetMouseCursor(ImGuiMouseCursor_Hand);
        }
        ImGui::PopID();
        ImGui::EndGroup();
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
        ImGui::Columns(2);
        for ( auto rn = startIndex; rn < ASType::LastRoom; rn++ ) {
            if ( ImGui::Checkbox(RoomService::roomTypeToName1to1(rn).c_str(), &hasRoomV[rn - startIndex]) ) {
                if ( hasRoomV[rn - startIndex] ) {
                    RoomService::addRoomType(room, rn, asg.H());
                    RoomService::removeRoomType(room, ASType::GenericRoom);
                } else {
                    RoomService::removeRoomType(room, rn);
                    if ( room->roomTypes.empty() ) {
                        RoomService::addRoomType(room, ASType::GenericRoom, asg.H());
                    }
                }
                HouseService::reevaluateDoorsAndWindowsAfterRoomChange(asg.H());
                backEnd->process_event(OnRecalculateFurnitureEvent{});
            }
            ImGui::NextColumn();
        }
        ImGui::Columns(1);
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
    void roomFurnitureEditor( RoomBSData *room, [[maybe_unused]] BE *backEnd ) {
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Text("Furnitures");
        ImGui::Separator();
        ImGui::Columns(3);
        for ( const auto& ff : room->mFittedFurniture ) {
            if ( ImGui::Button( ff->name.c_str() ) ) {
//                res.prepare(GHType::Furniture, ff->name, ResourceGroup::Geom);
                currLabel = GHType::Furniture;
            }
            ImGui::NextColumn();
        }
        ImGui::Columns(1);
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Text("Add furniture");
        ImGui::Columns(4);
        for ( auto fth = 0; fth < FurnitureTypeHandler::FT_Invalid; fth++ ) {
            auto ft = static_cast<FurnitureTypeHandler::Type>(fth);
            if ( ImGui::Button(FurnitureTypeHandler::name(ft).c_str()) ) {
//                res.prepare(GHType::Furniture, FurnitureTypeHandler::name(ft), ResourceGroup::Geom);
                currLabel = GHType::Furniture;
            }
            ImGui::NextColumn();
        }
        ImGui::Columns(1);
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
            KitchenRoomService::setNextMainWorktopIndexCandidate(room, [&]() {
                backEnd->process_event(OnRecalculateFurnitureEvent{});
            });
        }

        materialChange(GHType::KitchenWorktop, room);
        ImGui::SameLine();
        materialChange(GHType::KitchenBackSplash, room);
        ImGui::SameLine();
        materialChange(GHType::KitchenCabinet, room);
    }

    template<typename BE>
    void roomSelector( RoomBSData *room, BE *backEnd, const std::string& mediaFolder ) {
//        res.update(backEnd, mediaFolder, sg, rsg, room);
        materialChange(GHType::Wall, room);
        ImGui::SameLine();
        materialChange(GHType::Floor, room);
        ImGui::NewLine();
        materialChange(GHType::Skirting, room);
        ImGui::SameLine();
        materialChange(GHType::Coving, room);
        ImGui::SameLine();
        materialChange(GHType::Ceiling, room);
        roomMiscProperties(room, backEnd);
        roomTypeSelector(room, backEnd);
        roomTypePersonalisedEditor(room, backEnd);
        roomFurnitureEditor(room, backEnd);

//        auto nodes = sg.Nodes();
//        auto node = *nodes.begin();
//        auto sel = Selectable{ C4f::RED, node.second->TRS(), node.second, SelectableFlag::Selected};
//        showGizmo2( sel, rsg.DC() );
    }

private:
    SceneGraph& sg;
    RenderOrchestrator& rsg;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    PropertyListingOrchestrator& plo;
    GHTypeT currLabel{ GHType::None };
};
