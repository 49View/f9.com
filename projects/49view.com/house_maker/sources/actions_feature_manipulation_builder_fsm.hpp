//
// Created by dado on 04/06/2020.
//

#pragma once

#include <eh_arch/models/house_service.hpp>
#include <eh_arch/models/wall_service.hpp>


struct EnterFeatureManipulation {
    void operator()( HouseMakerStateMachine& hm ) noexcept {
        hm.showIMHouse();
    }
};


struct TouchedDownFirstTimeFeatureManipulationGuard {
    bool operator()( const OnFirstTimeTouchDownViewportSpaceEvent& mouseEvent, HouseMakerStateMachine& hm, ArchRenderController& ims ) noexcept {
        float aroundDistance = 0.05f;
        auto is = mouseEvent.viewportPos;
        auto afs = WallService::getNearestFeatureToPoint(hm.H(), is, aroundDistance);
        if ( afs.feature != ArchStructuralFeature::ASF_None ) {
            ims.addToSelectionList(afs, is);
            return true;
//            smFrotnEnd.setCurrentState(SMState::EditingWallsSelected);
        } else {
            auto door = HouseService::point<DoorBSData, IsInside>(hm.H(), is);
            if ( door ) {
                afs.feature = ArchStructuralFeature::ASF_Poly;
                afs.hash = door->hash;
                ims.addToSelectionList(afs, is);
//                smFrotnEnd.setCurrentState(SMState::EditingDoorSelected);
                return true;
            }
        }
        return false;
    }
};

struct TouchMoveFeatureManipulation {
    void operator()( const OnTouchMoveViewportSpaceEvent& mouseEvent, HouseMakerStateMachine& hm, ArchRenderController& ims ) noexcept {
        auto is = mouseEvent.viewportPos;
        ims.moveSelectionList(is, [&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
            WallService::moveFeature(hm.H(), asf, offset, false);
            HouseService::recalculateBBox(hm.H());
        });
        hm.showIMHouse();
    }
};

struct TouchUpEventFeatureManipulation {
    void operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
        ims.resetSelection();
        hm.showIMHouse();
//            elaborateHouseStageWalls( HouseService::rescaleWallInverse( houseJson.get(), hmbBSData.rescaleFactor ) );
    }
};

struct DeleteFeatureManipulation {
    void operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
        ims.deleteElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            WallService::deleteFeature(hm.H(), asf);
            HouseService::recalculateBBox(hm.H());
        });
        ims.resetSelection();
        hm.showIMHouse();
    }
};

struct KeyToggleFeatureManipulation {
    void operator()( ArchRenderController& ims, HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent ) noexcept {

        if ( keyEvent.keyCode == GMK_A ) {
            ims.splitFirstEdgeOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::splitEdgeAndAddPointInTheMiddle(hm.H(), asf, offset);
                HouseService::recalculateBBox(hm.H());
            });
            hm.showIMHouse();
            ims.resetSelection();
        }
    }
};