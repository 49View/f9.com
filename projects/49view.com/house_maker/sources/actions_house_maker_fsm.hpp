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

struct QuickZoomIn {
    void operator()( HouseMakerStateMachine& hm ) noexcept {
        hm.quickZoomIn();
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
