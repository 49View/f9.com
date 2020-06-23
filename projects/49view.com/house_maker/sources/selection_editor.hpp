//
// Created by dado on 14/06/2020.
//

#pragma once

#include <core/resources/resource_metadata.hpp>
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_utils.h>
#include <graphics/imgui/ImGuizmo.h>

#include <eh_arch/models//house_service.hpp>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>

#include "events__fsm.hpp"
#include "property_listing_orchestrator.hpp"
#include "selection_remote_entity_editor.hpp"

static inline void showGizmo2( Selectable& _node, std::shared_ptr<Camera> _cam ) {

    const Matrix4f& _view = _cam->getViewMatrix();
    const Matrix4f& _proj = _cam->getProjectionMatrix();
    const Rect2f& _viewport = _cam->ViewPort();

    if ( !checkBitWiseFlag(_node.flags, SelectableFlag::Selected) ) return;

    static ImGuizmo::OPERATION mCurrentGizmoOperation(ImGuizmo::TRANSLATE);
    static ImGuizmo::MODE mCurrentGizmoMode(ImGuizmo::LOCAL);
    static bool useSnap = false;
    static float snap[3] = { 1.f, 1.f, 1.f };
    static float bounds[] = { -0.5f, -0.5f, -0.5f, 0.5f, 0.5f, 0.5f };
    static float boundsSnap[] = { 0.1f, 0.1f, 0.1f };
    static bool boundSizing = false;
    static bool boundSizingSnap = false;

    float retinaMadness = AG.pixelDensity();
    Rect2f lViewport = _viewport;
    MatrixAnim& _trs = _node.trs;

    float rtop = AG.getScreenSizefUI.y() - ( (lViewport.top() + lViewport.height()) * retinaMadness);
    float rleft = (lViewport.origin().x() + lViewport.size().x()) * retinaMadness;
    ImGui::SetNextWindowPos( ImVec2{ rleft, rtop } );
    ImGui::SetNextWindowSize( ImVec2{ std::max(350.0f, AG.getScreenSizefUI.y()-rleft), 230.0f } );
    ImGui::Begin("Transform");

    ImGuizmo::BeginFrame();

//    bIsOver = ImGuizmo::IsOver();
//    bIsSelected = ImGuizmo::IsUsing();

    if (ImGui::IsKeyPressed(90))
        mCurrentGizmoOperation = ImGuizmo::TRANSLATE;
    if (ImGui::IsKeyPressed(88))
        mCurrentGizmoOperation = ImGuizmo::ROTATE;
    if (ImGui::IsKeyPressed(67)) // r Key
        mCurrentGizmoOperation = ImGuizmo::SCALE;
    if (ImGui::RadioButton("Tr", mCurrentGizmoOperation == ImGuizmo::TRANSLATE))
        mCurrentGizmoOperation = ImGuizmo::TRANSLATE;
    ImGui::SameLine();
    if (ImGui::RadioButton("Rt", mCurrentGizmoOperation == ImGuizmo::ROTATE))
        mCurrentGizmoOperation = ImGuizmo::ROTATE;
    ImGui::SameLine();
    if (ImGui::RadioButton("Sc", mCurrentGizmoOperation == ImGuizmo::SCALE))
        mCurrentGizmoOperation = ImGuizmo::SCALE;

    float matrixTranslation[3];
    float matrixRotation[3];
    float matrixRotationDeg[3];
    float matrixScale[3];

//    ImGuizmo::DecomposeMatrixToComponents( matrix, matrixTranslation, matrixRotation, matrixScale );

    _trs.Pos().fill( matrixTranslation );
    _trs.Euler().fill( matrixRotation );
    for ( auto q = 0; q < 3; q++ ) matrixRotationDeg[q] = radToDeg(matrixRotation[q]);
    _trs.Scale().fill( matrixScale );

    ImGui::InputFloat3("Tr", matrixTranslation, 3);
    ImGui::InputFloat3("Rt", matrixRotationDeg, 3);
    ImGui::InputFloat3("Sc", matrixScale, 3);

    V3f mtt = V3f{matrixTranslation};
    for ( auto q = 0; q < 3; q++ ) matrixRotation[q] = degToRad(matrixRotationDeg[q]);
    V3f mtr = V3f{matrixRotation};
    V3f mts = V3f{matrixScale};
    _trs.set( mtt, mtr, mts );

//    ImGuizmo::RecomposeMatrixFromComponents( matrixTranslation, matrixRotation, matrixScale, matrix );

    if (mCurrentGizmoOperation != ImGuizmo::SCALE)
    {
        if (ImGui::RadioButton("Local", mCurrentGizmoMode == ImGuizmo::LOCAL))
            mCurrentGizmoMode = ImGuizmo::LOCAL;
        ImGui::SameLine();
        if (ImGui::RadioButton("World", mCurrentGizmoMode == ImGuizmo::WORLD))
            mCurrentGizmoMode = ImGuizmo::WORLD;
    }
    if (ImGui::IsKeyPressed(86))
        useSnap = !useSnap;
    ImGui::Checkbox("", &useSnap);
    ImGui::SameLine();

    switch (mCurrentGizmoOperation)
    {
        case ImGuizmo::TRANSLATE:
            ImGui::InputFloat3("Snap", &snap[0]);
            break;
        case ImGuizmo::ROTATE:
            ImGui::InputFloat("Angle Snap", &snap[0]);
            break;
        case ImGuizmo::SCALE:
            ImGui::InputFloat("Scale Snap", &snap[0]);
            break;
        default:
            break;
    }
    ImGui::Checkbox("Bound Sizing", &boundSizing);
    if (boundSizing)
    {
        ImGui::PushID(3);
        ImGui::Checkbox("", &boundSizingSnap);
        ImGui::SameLine();
        ImGui::InputFloat3("Snap", boundsSnap);
        ImGui::PopID();
    }

    if ( ImGui::Button("Set Key") ) {
//        ### REF re-enable set key callback
//        std::visit( SelectionAddToKeyFrame{ LayoutMediator::Timeline::TimeLineName(),
//                                            LayoutMediator::Timeline::CurrentTime() }, _node.node );
    }
    ImGui::SameLine();

    static float matrix2[16];
    static V3f oldScaleDelta{1.0f};
//    static float oldRotationAngle = 0.0f;
    Matrix4f localTransform = Matrix4f{ _trs };
    float* matrix = localTransform.rawPtr();

    Vector2f rorign{lViewport.origin().x() * retinaMadness, rtop };
    Vector2f rsize{lViewport.size().x() * retinaMadness, lViewport.size().y() * retinaMadness};
    ImGuizmo::SetRect( rorign.x(), rorign.y(), rsize.x(), rsize.y() );

    ImGuizmo::Manipulate( _view.rawPtr(), _proj.rawPtr(), mCurrentGizmoOperation, mCurrentGizmoMode, matrix, matrix2,
                          useSnap ? &snap[0] : NULL, boundSizing?bounds:NULL, boundSizingSnap?boundsSnap:NULL);

    float matrixTranslationDelta[3]{0.0f, 0.0f, 0.0f};
    float matrixRotationDelta[3]{0.0f, 0.0f, 0.0f};
    float matrixScaleDelta[3]{0.0f, 0.0f, 0.0f};

    ImGuizmo::DecomposeMatrixToComponents( matrix2, matrixTranslationDelta, matrixRotationDelta, matrixScaleDelta );
    ImGuizmo::DecomposeMatrixToComponents( matrix, matrixTranslation, matrixRotation, matrixScaleDelta );

    switch (mCurrentGizmoOperation)
    {
        case ImGuizmo::TRANSLATE:
            _trs.set( mtt + V3f{matrixTranslationDelta}, mtr, mts );
            _node.node->updateTransform(mtt + V3f{matrixTranslationDelta} );
            break;
        case ImGuizmo::ROTATE: {
//            if ( ImGuizmo::IsUsing() ) {
//                auto rt = ImGuizmo::getRotationType();
//                auto ra = ( ImGuizmo::getRotationAngle() - oldRotationAngle );
//                V3f rot{};
//                switch (rt) {
//                    case ImGuizmo::MOVETYPE::ROTATE_X:
//                        rot = V3f::X_AXIS * ra;
//                        break;
//                    case ImGuizmo::MOVETYPE::ROTATE_Y:
//                        rot = V3f::Y_AXIS * ra;
//                        break;
//                    case ImGuizmo::MOVETYPE::ROTATE_Z:
//                        rot = V3f::Z_AXIS * ra;
//                        break;
//                    default:
//                        rot = Vector3f::ZERO;
//                        break;
//                }
//                _trs.set( mtt, mtr + rot*-1.0f, mts );
//                oldRotationAngle = ImGuizmo::getRotationAngle();
//            }
        }
            break;
        case ImGuizmo::SCALE: {
            V3f newScaleDelta = V3f{ matrixScaleDelta };
            auto mtsdelta = mts + ( newScaleDelta - oldScaleDelta );
            _trs.set( mtt, mtr, max( mtsdelta, Vector3f{0.0001f} ) );
            oldScaleDelta = newScaleDelta;
        }
            break;
        default:
            break;
    }

    ImGui::End();
}


class HouseMakerSelectionEditor {
public:
    HouseMakerSelectionEditor( SceneGraph& sg, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                               ArchRenderController& arc, PropertyListingOrchestrator& _plo,
                               RemoteEntitySelector& _res ) : sg(sg), rsg(rsg), asg(asg), arc(arc), plo(_plo),
                                                              res(_res) {}
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
            switch ( selected->elem->type ) {
                case RoomT:
                    roomSelector(dynamic_cast<RoomBSData*>(selected->elem), backEnd);
                    break;
                case WallT:
                    HouseService::findRoomArchSegmentWithWallHash(asg.H(), selected->elem->hash, selected->index);
                    break;
                default:
                    break;
            }
        } else {
            // Activate property (listing) view so one can change listing attributes in here
            propertyLister();
        }
        ImGui::End();
    }

private:
    void propertyLister() {
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
                sg.addRawImage(thumb, RawImage{ FM::readLocalFileC("/home/dado/media/media/" + thumb) });
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
            res.prepare(label);
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
    void roomFurnitureEditor( RoomBSData *room, BE *backEnd ) {
        ImGui::Separator();
        ImGui::NewLine();
        ImGui::Text("Furnitures");
        ImGui::Separator();
        ImGui::Columns(3);
        for ( const auto& ff : room->mFittedFurniture ) {
            ImGui::Button( ff->name.c_str() );
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
                RoomServiceFurniture::addFurnitureSingle( HouseService::findFloorOf(asg.H(), room->hash), room, asg.FurnitureMap(), ft );
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
    void roomSelector( RoomBSData *room, BE *backEnd ) {
        res.update(backEnd, sg, rsg, room);
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
    RemoteEntitySelector& res;
    GHTypeT currLabel{ GHType::None };
};
