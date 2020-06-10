//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct ActivateHouseMaker {
    void operator()( HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        rsg.RR().showBucket(CommandBufferLimits::UI2dStart, true);
        rsg.RR().showBucket(CommandBufferLimits::GridStart, true);
        rsg.RR().showBucket(CommandBufferLimits::PBRStart, false);
        rsg.setRigCameraController(CameraControlType::Edit2d);
        rsg.DC()->LockAtWalkingHeight(false);
        rsg.DC()->setQuatAngles(V3f{ M_PI_2, 0.0f, 0.0f });
        rsg.useSkybox(false);
        hm.ASG().centerCameraMiddleOfHouse(hm.H());
//        fader( 3.0f, 1.0f, rsg.RR().CL()[CommandBufferLimits::GridStart].mVList );
//        fader( 3.0f, 1.0f, rsg.RR().CL()[CommandBufferLimits::GridStart].mVListTransparent );
    }
};
