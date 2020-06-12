//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct ActivateHouseMaker {
    void operator()( HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
//        rsg.RR().showBucket(CommandBufferLimits::UI2dStart, true);
//        rsg.RR().showBucket(CommandBufferLimits::GridStart, true);
//        rsg.RR().showBucket(CommandBufferLimits::PBRStart, false);
        rsg.setRigCameraController(CameraControlType::Edit2d);
        rsg.DC()->LockAtWalkingHeight(false);
        auto quatAngles = V3f{ M_PI_2, 0.0f, 0.0f };
        rsg.DC()->setIncrementQuatAngles(quatAngles);
        rsg.useSkybox(false);
        if ( hm.H() ) {
            auto quat = quatCompose(quatAngles);
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            hm.ASG().centerCameraMiddleOfHouse(hm.H());
        }
        fader( 0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart) );
        fader( 0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::GridStart) );
        fader( 0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart) );
    }
};
