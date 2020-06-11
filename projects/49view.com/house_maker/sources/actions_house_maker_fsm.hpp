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

struct ActivateBrowsing3d {
    void operator()( HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        rsg.RR().showBucket(CommandBufferLimits::UI2dStart, false);
        rsg.RR().showBucket(CommandBufferLimits::GridStart, false);
        rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
        rsg.setRigCameraController(CameraControlType::Walk);
        rsg.DC()->setQuatAngles(V3f{ 0.0f, 0.0f, 0.0f });
        if ( hm.H() ) {
            Timeline::play(rsg.DC()->PosAnim(), 0,
                           KeyFramePair{ 0.1f, V3f{ hm.H()->center.x(), 1.45f, hm.H()->center.y() } });
        }
        rsg.useSkybox(true);
        hm.ASG().show3dHouse(hm.H());
    }
};

struct ActivateBrowsingDollyHouse {
    void operator()( HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        rsg.RR().showBucket(CommandBufferLimits::UI2dStart, false);
        rsg.RR().showBucket(CommandBufferLimits::GridStart, true);
        rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
        rsg.setRigCameraController(CameraControlType::Fly);
        if ( hm.H() ) {
            auto quatAngles = V3f{1.0f, -0.75f, 0.0f};
            auto quat = quatCompose(quatAngles);
            rsg.DC()->setIncrementQuatAngles(quatAngles);
            Timeline::play(rsg.DC()->PosAnim(), 0,
                           KeyFramePair{ 0.9f, V3f{ hm.H()->bbox.bottomRight().x(), hm.H()->depth*3.0f, hm.H()->bbox.bottomRight().y() } });
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
        }
        rsg.useSkybox(true);
        hm.ASG().show3dHouse(hm.H());
    }
};


struct KeyToggleHouseMaker {
    void operator()( HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent, RenderOrchestrator& rsg ) noexcept {

        if ( keyEvent.keyCode == GMK_R ) {
            HouseMakerBitmap::makeFromWalls(hm.H(), hm.HMB(), hm.SI() );
            hm.showIMHouse();
        }
        if ( keyEvent.keyCode == GMK_O ) {
            rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
        }
        if ( keyEvent.keyCode == GMK_P ) {
            rsg.RR().showBucket(CommandBufferLimits::PBRStart, false);
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