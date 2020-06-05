//
// Created by dado on 04/06/2020.
//

#pragma once

#include <eh_arch/models/house_service.hpp>
#include <eh_arch/models/wall_service.hpp>
#include <eh_arch/models/door_service.hpp>

struct EnterFeatureManipulation {
    void operator()( HouseMakerStateMachine& hm ) noexcept {
        hm.showIMHouse();
    }
};

struct UpdateFeatureManipulation {
    void operator()( HouseMakerStateMachine& hm ) noexcept {
        hm.showIMHouse();
    }
};

struct ExitFeatureManipulation {
    void operator()( HouseMakerStateMachine& hm, ArchRenderController& ims ) noexcept {
        ims.resetSelection();
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
        } else {
            auto door = HouseService::point<DoorBSData, IsInside>(hm.H(), is);
            if ( door ) {
                afs.feature = ArchStructuralFeature::ASF_Poly;
                afs.hash = door->hash;
                ims.addToSelectionList(afs, is);
                return true;
            }
        }
        return false;
    }
};

struct TouchMoveFeatureManipulation {
    bool operator()( const OnTouchMoveViewportSpaceEvent& mouseEvent, HouseMakerStateMachine& hm, ArchRenderController& ims ) noexcept {
        auto is = mouseEvent.viewportPos;
        ims.moveSelectionList(is, [&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
            WallService::moveFeature(hm.H(), asf, offset, false);
            HouseService::recalculateBBox(hm.H());
        });
        return true;
    }
};

struct TouchUpEventFeatureManipulation {
    bool operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
//            elaborateHouseStageWalls( HouseService::rescaleWallInverse( houseJson.get(), hmbBSData.rescaleFactor ) );
        return true;
    }
};

struct DeleteFeatureManipulation {
    bool operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
        ims.deleteElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            WallService::deleteFeature(hm.H(), asf);
            HouseService::recalculateBBox(hm.H());
        });
        return true;
    }
};

struct SpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
        ims.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            if ( auto door = HouseService::find<DoorBSData>(hm.H(), asf.hash); door ) {
                DoorService::toggleOrientations(door);
            }

        });
        return true;
    }
};

struct SpecialSpaceToggleFeatureManipulation {
    bool operator()( ArchRenderController& ims, HouseMakerStateMachine& hm ) noexcept {
        ims.toggleElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
            HouseMakerBitmap::makeFromSwapDoorOrWindow( hm.H(), hm.HMB(), hm.SI(), asf.hash );
        });
        return true;
    }
};


struct KeyToggleFeatureManipulation {
    bool operator()( ArchRenderController& ims, HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent ) noexcept {
        if ( keyEvent.keyCode == GMK_A ) {
            ims.splitFirstEdgeOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::splitEdgeAndAddPointInTheMiddle(hm.H(), asf, offset);
                HouseService::recalculateBBox(hm.H());
            });
            ims.resetSelection();
            return true;
        }
        return false;
    }
};
