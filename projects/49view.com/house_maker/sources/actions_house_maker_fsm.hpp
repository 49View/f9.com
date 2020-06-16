//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct ClearEverthing {
    void operator()( RoomBuilder *rb, ArchOrchestrator& asg ) noexcept {
        rb->clear();
        HouseService::clearHouse(asg.H());
        asg.showIMHouse();
    }
};

struct ActivateHouseMaker {
    void operator()( ArchRenderController& arc, RenderOrchestrator& rsg, ArchOrchestrator& asg ) noexcept {
        arc.setViewingMode(ArchViewingMode::AVM_TopDown2d);
        rsg.setRigCameraController(CameraControlType::Edit2d);
        rsg.DC()->LockAtWalkingHeight(false);
        auto quatAngles = V3f{ M_PI_2, 0.0f, 0.0f };
        rsg.DC()->setIncrementQuatAngles(quatAngles);
        rsg.useSkybox(false);
        if ( asg.H() ) {
            auto quat = quatCompose(quatAngles);
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            asg.centerCameraMiddleOfHouse();
            arc.setFloorPlanTransparencyFactor(0.5f);
            asg.showIMHouse();
        }
        fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
        fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
        fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));
    }
};

struct InitializeHouseMaker {
    void operator()( ArchRenderController& arc, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                     OnActivateEvent ev ) noexcept {
        rsg.DC()->setQuatAngles(V3f{ M_PI_2, 0.0f, 0.0f });
        rsg.DC()->setPosition(V3f::UP_AXIS * 5.0f);
        ActivateHouseMaker{}(arc, rsg, asg);
        if ( ev.ccf ) ev.ccf();
    }
};

struct ActivateHouseMakerWithTopDown3d {
    void operator()( ArchOrchestrator& asg, HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        hm.ARC().setViewingMode(ArchViewingMode::AVM_TopDown3d);
        rsg.setRigCameraController(CameraControlType::Edit2d);
        rsg.DC()->LockAtWalkingHeight(false);
        auto quatAngles = V3f{ M_PI_2, 0.0f, 0.0f };
        rsg.DC()->setIncrementQuatAngles(quatAngles);
        rsg.useSkybox(false);
        if ( asg.H() ) {
            hm.ARC().setFloorPlanTransparencyFactor(0.0f);
            asg.showIMHouse();
            auto quat = quatCompose(quatAngles);
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            asg.centerCameraMiddleOfHouse(2.0f);
            rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
        }
        fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
        fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
        fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));
    }
};

struct ActivateBrowsing3d {
    void operator()( ArchOrchestrator& asg, HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        hm.ARC().setViewingMode(ArchViewingMode::AVM_Walk);
        rsg.setRigCameraController(CameraControlType::Walk);
        rsg.useSkybox(true);
        if ( asg.H() ) {
            V3f pos = V3f::ZERO;
            V3f quatAngles = V3f::ZERO;
            HouseService::bestStartingPositionAndAngle(asg.H(), pos, quatAngles);
            auto quat = quatCompose(quatAngles);
            rsg.DC()->setIncrementQuatAngles(quatAngles);
            Timeline::play(rsg.DC()->PosAnim(), 0,
                           KeyFramePair{ 0.9f, pos });
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            rsg.RR().setVisibilityOnTags(ArchType::CeilingT, true);
            fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
            fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
            fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));
        }
    }
};

struct ActivateBrowsingDollyHouse {
    void operator()( ArchOrchestrator& asg, HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        hm.ARC().setViewingMode(ArchViewingMode::AVM_DollHouse);
        rsg.setRigCameraController(CameraControlType::Fly);
        rsg.useSkybox(true);
        if ( asg.H() ) {
            V3f pos = V3f::ZERO;
            V3f quatAngles = V3f::ZERO;
            HouseService::bestDollyPositionAndAngle(asg.H(), pos, quatAngles);
            auto quat = quatCompose(quatAngles);
            rsg.DC()->setIncrementQuatAngles(quatAngles);
            Timeline::play(rsg.DC()->PosAnim(), 0, KeyFramePair{ 0.9f, pos });
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
            fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
            fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));

            rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
        }
    }
};


struct KeyToggleHouseMaker {
    void operator()( ArchOrchestrator& asg, HouseMakerStateMachine& hm, OnKeyToggleEvent keyEvent,
                     RenderOrchestrator& rsg ) noexcept {

        if ( keyEvent.keyCode == GMK_R ) {
            HouseMakerBitmap::makeFromWalls(asg.H());
            asg.showIMHouse();
        }
        if ( keyEvent.keyCode == GMK_O ) {
            rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
        }
        if ( keyEvent.keyCode == GMK_P ) {
            rsg.RR().showBucket(CommandBufferLimits::PBRStart, false);
        }

    }
};

struct UpdateHMB {
    void operator()( SceneGraph& sg ) {
        auto sourceImages = HouseMakerBitmap::prepareImages();

        auto sourceBim = sg.get<RawImage>(HouseMakerBitmap::HMB().filename + "_bin");
        if ( sourceBim ) {
            memcpy(sourceBim->data(), sourceImages.sourceFileImageBin.data, sourceBim->size());
            sg.updateRawImage(HouseMakerBitmap::HMB().filename + "_bin");
        } else {
            auto sourceBinParams = getImageParamsFromMat(sourceImages.sourceFileImageBin);
            auto sourceBinImage = RawImage{ sourceBinParams.width, sourceBinParams.height, sourceBinParams.channels,
                                            sourceImages.sourceFileImageBin.data };
            sg.addRawImageIM(HouseMakerBitmap::HMB().filename + "_bin", sourceBinImage);
        }
    }
};

struct LoadFloorPlan {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc,
                     OnLoadFloorPlanEvent event ) {
        auto newHMB = HMBBSData{ getFileNameOnly(event.floorPlanFileName),
                                 RawImage{ FM::readLocalFileC(event.floorPlanFileName) } };
        HouseMakerBitmap::updateHMB(newHMB);
        UpdateHMB{}(sg);
        sg.addRawImageIM(newHMB.filename, newHMB.image);
        asg.setHouse(HouseMakerBitmap::makeEmpty());
        asg.showIMHouse();
        asg.centerCameraMiddleOfHouse();
    }
};

struct MakeHouse3d {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        asg.make3dHouse([&]( HouseBSData *house ) {
            if ( arc.getViewingMode() == ArchViewingMode::AVM_DollHouse ||
                 arc.getViewingMode() == ArchViewingMode::AVM_TopDown3d ) {
                rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
            }
        });
    }
};

struct ElaborateHouseBitmap {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        auto newHouse = HouseMakerBitmap::make(asg.FurnitureMap());
        asg.setHouse(newHouse);
        asg.showIMHouse();
    }
};

struct FurnishHouse {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        HouseService::guessFittings(asg.H(), asg.FurnitureMap());
        MakeHouse3d{}(asg, rsg, arc);
        asg.showIMHouse();
    }
};


struct GlobalRescale {
    void operator()( HouseMakerStateMachine& hm, OnGlobalRescaleEvent event, ArchRenderController& arc,
                     ArchOrchestrator& asg ) {
        float oldScaleFactor = event.oldScaleFactor;
        float currentScaleFactorMeters = event.currentScaleFactorMeters;
        if ( asg.H() ) {
            HouseMakerBitmap::rescale(asg.H(), 1.0f / oldScaleFactor, metersToCentimeters(1.0f / oldScaleFactor));
            HouseMakerBitmap::HMB().rescaleFactor = metersToCentimeters(currentScaleFactorMeters);
            HouseMakerBitmap::rescale(asg.H(), HouseMakerBitmap::HMB().rescaleFactor,
                                      centimetersToMeters(HouseMakerBitmap::HMB().rescaleFactor));
            asg.showIMHouse();
            asg.centerCameraMiddleOfHouse();
        }
    }
};