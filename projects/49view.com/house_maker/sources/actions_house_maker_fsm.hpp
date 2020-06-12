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
        rsg.setRigCameraController(CameraControlType::Walk);
        rsg.useSkybox(true);
        if ( hm.H() ) {
            hm.ASG().show3dHouse(hm.H() , [&]( HouseBSData *house ) {
                V3f pos = V3f::ZERO;
                V3f quatAngles = V3f::ZERO;
                HouseService::bestStartingPositionAndAngle(house, pos, quatAngles);
                auto quat = quatCompose(quatAngles);
                rsg.DC()->setIncrementQuatAngles(quatAngles);
                Timeline::play(rsg.DC()->PosAnim(), 0,
                               KeyFramePair{ 0.9f, pos });
                Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
                rsg.RR().setVisibilityOnTags(ArchType::CeilingT, true);
                fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
                fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
                fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));
            });
        }
    }
};

struct ActivateBrowsingDollyHouse {
    void operator()( HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
//        rsg.RR().showBucket(CommandBufferLimits::UI2dStart, false);
//        rsg.RR().showBucket(CommandBufferLimits::GridStart, false);
//        rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
        rsg.setRigCameraController(CameraControlType::Fly);
        rsg.useSkybox(true);
        if ( hm.H() ) {
            hm.ASG().show3dHouse(hm.H(), [&]( HouseBSData *house ) {
                V3f pos = V3f::ZERO;
                V3f quatAngles = V3f::ZERO;
                HouseService::bestDollyPositionAndAngle(house, pos, quatAngles);
                auto quat = quatCompose(quatAngles);
                rsg.DC()->setIncrementQuatAngles(quatAngles);
                Timeline::play(rsg.DC()->PosAnim(), 0, KeyFramePair{ 0.9f, pos} );
                Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
                fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
                fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
                fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));

                rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
            });
        }
    }
};


struct KeyToggleHouseMaker {
    void operator()( HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent, RenderOrchestrator& rsg ) noexcept {

        if ( keyEvent.keyCode == GMK_R ) {
            HouseMakerBitmap::makeFromWalls(hm.H(), hm.HMB(), hm.SI());
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
            HouseMakerBitmap::rescale(houseJson, 1.0f / oldScaleFactor, metersToCentimeters(1.0f / oldScaleFactor));
            hm.HMB().rescaleFactor = metersToCentimeters(currentScaleFactorMeters);
            HouseMakerBitmap::rescale(houseJson, hm.HMB().rescaleFactor, centimetersToMeters(hm.HMB().rescaleFactor));
            hm.showIMHouse();
            hm.ASG().centerCameraMiddleOfHouse(houseJson);
        }
    }
};