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

struct TouchedDownFirstTimeFeatureManipulationGuard {
    bool operator()( const OnFirstTimeTouchDownViewportSpaceEvent& mouseEvent, ArchOrchestrator& hm,
                     ArchRenderController& arc ) noexcept {
        if ( !hm.H() ) return false;
        float aroundDistance = 0.05f;
        auto is = mouseEvent.viewportPos;
        auto afs = WallService::getNearestFeatureToPoint(hm.H(), is, aroundDistance);
        if ( afs.feature != ArchStructuralFeature::ASF_None ) {
            arc.singleToggleSelection(afs, is, SelectionFlags::RemoveAtTouchUp);
            return true;
        } else {
            if ( auto door = HouseService::point<DoorBSData, IsInside>(hm.H(), is); door ) {
                afs.feature = ArchStructuralFeature::ASF_Poly;
                afs.hash = door->hash;
                arc.singleToggleSelection(afs, is);
                return true;
            }
            if ( auto window = HouseService::point<WindowBSData, IsInside>(hm.H(), is); window ) {
                afs.feature = ArchStructuralFeature::ASF_Poly;
                afs.hash = window->hash;
                arc.singleToggleSelection(afs, is);
                return true;
            }
            if ( auto room = HouseService::point<RoomBSData, IsInside>(hm.H(), is); room ) {
                afs.feature = ArchStructuralFeature::ASF_Poly;
                afs.hash = room->hash;
                arc.singleToggleSelection(afs, is);
                return true;
            }
        }
        return false;
    }
};

struct TouchedDownFirstTimeFittedFurnitureGuard {
    bool operator()( const OnFirstTimeTouchDownViewportSpaceEvent& mouseEvent, ArchOrchestrator& hm,
                     ArchRenderController& arc ) noexcept {
//        if ( !hm.H() ) return false;
//        float aroundDistance = 0.05f;
//        auto is = mouseEvent.viewportPos;
//        if ( auto ff = HouseService::point<FittedFurniture, IsInside>(hm.H(), is); ff ) {
//            afs.feature = ArchStructuralFeature::ASF_Box;
//            arc.singleToggleSelection(afs, is);
//            return true;
//        }
        return false;
    }
};


struct EnterFittedFurniture {
    void operator()( ArchOrchestrator& hm, ArchRenderController& arc ) noexcept {
    }
};

struct TouchMoveFeatureManipulation {
    bool operator()( const OnTouchMoveViewportSpaceEvent& mouseEvent, ArchOrchestrator& hm,
                     ArchRenderController& arc ) noexcept {
        auto is = mouseEvent.viewportPos;
        arc.moveSelectionList(is, [&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
            WallService::moveFeature(hm.H(), asf, offset, false);
            HouseService::recalculateBBox(hm.H());
        });
        return true;
    }
};

struct TouchUpEventFeatureManipulation {
    bool operator()( ArchRenderController& arc, HouseMakerStateMachine& hm ) noexcept {
        return true;
    }
};

struct DeleteFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& hm ) noexcept {
        arc.deleteElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            if ( asf.feature == ArchStructuralFeature::ASF_Poly ) {
                HouseService::removeArch(hm.H(), asf.hash);
            } else {
                WallService::deleteFeature(hm.H(), asf);
                HouseService::recalculateBBox(hm.H());
            }
        });
        return true;
    }
};

struct SpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, ArchOrchestrator& hm ) noexcept {
        arc.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            if ( auto door = HouseService::find<DoorBSData>(hm.H(), asf.hash); door ) {
                DoorService::toggleOrientations(door);
            }

        });
        return true;
    }
};

struct SpecialSpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, HouseMakerStateMachine& hm, ArchOrchestrator& asg ) noexcept {
        arc.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            HouseMakerBitmap::makeFromSwapDoorOrWindow(asg.H(), asf.hash);
        });
        return true;
    }
};


struct KeyToggleFeatureManipulation {
    bool operator()( ArchRenderController& arc, HouseMakerStateMachine& hm, ArchOrchestrator& asg,
                     OnKeyToggleEvent keyEvent ) noexcept {
        if ( keyEvent.keyCode == GMK_A ) {
            arc.splitFirstEdgeOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::splitEdgeAndAddPointInTheMiddle(asg.H(), asf, offset);
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
