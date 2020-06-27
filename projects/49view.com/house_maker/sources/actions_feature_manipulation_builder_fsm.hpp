//
// Created by dado on 04/06/2020.
//

#pragma once

#include <eh_arch/models/house_service.hpp>
#include <eh_arch/models/wall_service.hpp>
#include <eh_arch/models/door_service.hpp>

struct EnterFeatureManipulation {
    void operator()( ArchOrchestrator& asg ) noexcept {
        asg.showIMHouse();
    }
};

struct UpdateFeatureManipulation {
    void operator()( ArchOrchestrator& asg ) noexcept {
        asg.showIMHouse();
    }
};

struct ExitFeatureManipulation {
    void operator()( ArchOrchestrator& asg ) noexcept {
        asg.showIMHouse();
    }
};

enum class TouchedSelectionFlag {
    Keep,
    Toggle
};

static inline bool touchSelection( const V2f& is, TouchedSelectionFlag tsf, ArchOrchestrator& asg, ArchRenderController& arc) {
    if ( !asg.H() ) return false;
    float aroundDistance = 0.05f;
    auto afs = WallService::getNearestFeatureToPoint(asg.H(), is, aroundDistance);
    if ( afs.feature != ArchStructuralFeature::ASF_None ) {
        if ( tsf == TouchedSelectionFlag::Toggle ) arc.singleSelectionToggle(afs, is, SelectionFlags::RemoveAtTouchUp);
        if ( tsf == TouchedSelectionFlag::Keep ) arc.singleSelectionKeep(afs, is, SelectionFlags::RemoveAtTouchUp);
        return arc.selectionCount() > 0;
    } else {
        if ( auto door = HouseService::point<DoorBSData, IsInside>(asg.H(), is); door ) {
            afs.feature = ArchStructuralFeature::ASF_Poly;
            afs.elem = door.get();
            if ( tsf == TouchedSelectionFlag::Toggle ) arc.singleSelectionToggle(afs, is);
            if ( tsf == TouchedSelectionFlag::Keep ) arc.singleSelectionKeep(afs, is);
            return arc.selectionCount() > 0;
        }
        if ( auto window = HouseService::point<WindowBSData, IsInside>(asg.H(), is); window ) {
            afs.feature = ArchStructuralFeature::ASF_Poly;
            afs.elem = window.get();
            if ( tsf == TouchedSelectionFlag::Toggle ) arc.singleSelectionToggle(afs, is);
            if ( tsf == TouchedSelectionFlag::Keep ) arc.singleSelectionKeep(afs, is);
            return arc.selectionCount() > 0;
        }
        if ( auto ff = HouseService::point<FittedFurniture, IsInside>(asg.H(), is); ff ) {
            afs.feature = ArchStructuralFeature::ASF_Poly;
            afs.elem = ff.get();
            if ( tsf == TouchedSelectionFlag::Toggle ) arc.singleSelectionToggle(afs, is);
            if ( tsf == TouchedSelectionFlag::Keep ) arc.singleSelectionKeep(afs, is);
            return arc.selectionCount() > 0;
        }
        if ( auto room = HouseService::point<RoomBSData, IsInside>(asg.H(), is); room ) {
            afs.feature = ArchStructuralFeature::ASF_Poly;
            afs.elem = room.get();
            if ( tsf == TouchedSelectionFlag::Toggle ) arc.singleSelectionToggle(afs, is);
            if ( tsf == TouchedSelectionFlag::Keep ) arc.singleSelectionKeep(afs, is);
            return arc.selectionCount() > 0;
        }
    }
    // If it gets here and didn't hit anything it means that it points nothing, so clear the selections
    arc.resetSelection();
    return false;//arc.selectionCount() > 0;
}

struct SingleTapViewportHouseMakerManipulationGuard {
    bool operator()( const OnSingleTapViewportSpaceEvent& mouseEvent, ArchOrchestrator& asg,
                     ArchRenderController& arc ) noexcept {
        return touchSelection( mouseEvent.viewportPos, TouchedSelectionFlag::Toggle, asg, arc );
    }
};

struct SingleTapViewportSpaceFeatureManipulationGuard {
    bool operator()( const OnSingleTapViewportSpaceEvent& mouseEvent, ArchOrchestrator& asg,
                     ArchRenderController& arc ) noexcept {
        return !touchSelection( mouseEvent.viewportPos, TouchedSelectionFlag::Toggle, asg, arc );
    }
};

struct TouchedDownFirstTimeFeatureManipulationGuard {
    bool operator()( const OnFirstTimeTouchDownViewportSpaceEvent& mouseEvent, ArchOrchestrator& asg,
                     ArchRenderController& arc ) noexcept {
        bool res = touchSelection( mouseEvent.viewportPos, TouchedSelectionFlag::Keep, asg, arc );
        UpdateFeatureManipulation()(asg);
        return res;
    }
};

struct TouchedDownFirstTimeFittedFurnitureGuard {
    bool operator()( const OnFirstTimeTouchDownViewportSpaceEvent& mouseEvent, ArchOrchestrator& asg,
                     ArchRenderController& arc ) noexcept {
        bool res = touchSelection( mouseEvent.viewportPos, TouchedSelectionFlag::Keep, asg, arc );
        UpdateFeatureManipulation()(asg);
        return !res;
    }
};


struct EnterFittedFurniture {
    void operator()( ArchOrchestrator& asg, ArchRenderController& arc ) noexcept {
    }
};

struct TouchMoveFeatureManipulation {
    bool operator()( const OnTouchMoveViewportSpaceEvent& mouseEvent, ArchOrchestrator& asg,
                     ArchRenderController& arc ) noexcept {
        auto is = mouseEvent.viewportPos;
        arc.moveSelectionList(is, [&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
            if ( asf.feature == ArchStructuralFeature::ASF_Poly ) {
                HouseService::moveArch(asg.H(), dynamic_cast<ArchStructural*>(asf.elem), offset);
            } else {
                WallService::moveFeature( asf, offset, false);
                HouseService::recalculateBBox(asg.H());
                HouseMakerBitmap::makeFromWalls(asg.H());
            }
        });
        return true;
    }
};

struct TouchUpEventFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& asg, RenderOrchestrator& rsg ) noexcept {
        MakeHouse3d{}(asg, rsg, arc);
        asg.showIMHouse();
        return true;
    }
};

struct DeleteFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& asg, RenderOrchestrator& rsg ) noexcept {
        arc.deleteElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            if ( asf.feature == ArchStructuralFeature::ASF_Poly ) {
                HouseService::removeArch(asg.H(), asf.elem->hash);
            } else {
                WallService::deleteFeature(asf);
                HouseService::recalculateBBox(asg.H());
            }
            MakeHouse3d{}(asg, rsg, arc);
            asg.showIMHouse();

        });
        return true;
    }
};

struct SpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& hm ) noexcept {
        arc.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            switch ( asf.elem->type ) {
                case DoorT:
                    DoorService::toggleOrientations(dynamic_cast<DoorBSData*>(asf.elem));
                    break;
                case FittedFurnitureT:
                    RoomServiceFurniture::rotateFurniture(dynamic_cast<FittedFurniture*>(asf.elem));
                    break;
                default:
                    break;
            }
        });
        return true;
    }
};

struct IncrementalScaleFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& hm, OnIncrementalScaleEvent event ) noexcept {
        arc.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            switch ( asf.elem->type ) {
                case FittedFurnitureT:
                    RoomServiceFurniture::scaleIncrementalFurniture(dynamic_cast<FittedFurniture*>(asf.elem), event.incrementalScaleFactor );

                    break;
                default:
                    break;
            }
        });
        return true;
    }
};

struct SpecialSpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, HouseMakerStateMachine& hm, ArchOrchestrator& asg ) noexcept {
        arc.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            HouseMakerBitmap::makeFromSwapDoorOrWindow(asg.H(), asf.elem->hash);
        });
        return true;
    }
};


struct KeyToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, HouseMakerStateMachine& hm, ArchOrchestrator& asg,
                     OnKeyToggleEvent keyEvent ) noexcept {
        if ( keyEvent.keyCode == GMK_A ) {
            arc.splitFirstEdgeOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::splitEdgeAndAddPointInTheMiddle(asf, offset);
                HouseService::recalculateBBox(asg.H());
            });
            arc.resetSelection();
            return true;
        }
        if ( keyEvent.keyCode == GMK_D ) {
            auto fus = WallService::createTwoShapeAt(asg.H(), keyEvent.viewportPos);
            if ( FloorService::isFloorUShapeValid(fus) ) {
                HouseMakerBitmap::makeAddDoor(asg.H(), fus);
            }
            return true;
        }
        return false;
    }
};
