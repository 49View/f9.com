//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct ClearEverthing {
    void operator()( HouseMakerStateMachine& hm ) noexcept {
        hm.clear();
    }
};

struct KeyToggleHouseMaker {
    void operator()( HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent ) noexcept {

        if ( keyEvent.keyCode == GMK_2 ) {
            hm.set2dMode();
        }
        if ( keyEvent.keyCode == GMK_3 ) {
            hm.set3dMode();
        }
        if ( keyEvent.keyCode == GMK_R ) {
            HouseMakerBitmap::makeFromWalls(hm.H(), hm.HMB(), hm.SI() );
            hm.showIMHouse();
        }
    }
};

struct GlobalRescale {
    void operator()( HouseMakerStateMachine& hm, OnGlobalRescaleEvent event ) {
        float oldScaleFactor = event.oldScaleFactor;
        float currentScaleFactorMeters = event.currentScaleFactorMeters;
        auto houseJson = hm.H();
        if ( houseJson ) {
            HouseMakerBitmap::rescale(houseJson, 1.0f/oldScaleFactor, metersToCentimeters(1.0f/oldScaleFactor));
            hm.HMB().rescaleFactor = metersToCentimeters(currentScaleFactorMeters);
            HouseMakerBitmap::rescale(houseJson, hm.HMB().rescaleFactor, centimetersToMeters(hm.HMB().rescaleFactor));
            hm.showIMHouse();
            hm.ASG().centerCameraMiddleOfHouse(houseJson);
        }
    }
};