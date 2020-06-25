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
    void
    operator()( SceneGraph& sg, ArchRenderController& arc, RenderOrchestrator& rsg, ArchOrchestrator& asg ) noexcept {
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
        sg.setCollisionEnabled(false);
    }
};

struct InitializeHouseMaker {
    void operator()( SceneGraph& sg, ArchRenderController& arc, RenderOrchestrator& rsg, ArchOrchestrator& asg,
                     OnActivateEvent ev ) noexcept {
        rsg.DC()->setQuatAngles(V3f{ M_PI_2, 0.0f, 0.0f });
        rsg.DC()->setPosition(V3f::UP_AXIS * 5.0f);
        ActivateHouseMaker{}(sg, arc, rsg, asg);
        if ( ev.ccf ) ev.ccf();
    }
};

static inline void show3dViewInternal( ArchOrchestrator& asg, std::function<void()> callback ) {
    if ( asg.HRC().houseId != asg.H()->propertyId ) {
        asg.make3dHouse(callback);
    } else {
        callback();
    }
}

struct ActivateHouseMakerWithTopDown3d {
    void
    operator()( SceneGraph& sg, ArchOrchestrator& asg, HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        auto show3d = [&]() {
            hm.ARC().setViewingMode(ArchViewingMode::AVM_TopDown3d);
            rsg.setRigCameraController(CameraControlType::Edit2d);
            rsg.DC()->LockAtWalkingHeight(false);
            auto quatAngles = V3f{ M_PI_2, 0.0f, 0.0f };
            rsg.DC()->setIncrementQuatAngles(quatAngles);
            rsg.useSkybox(false);
            hm.ARC().setFloorPlanTransparencyFactor(0.0f);
            asg.showIMHouse();
            auto quat = quatCompose(quatAngles);
            Timeline::play(rsg.DC()->QAngleAnim(), 0, KeyFramePair{ 0.9f, quat });
            asg.centerCameraMiddleOfHouse(2.0f);
            rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
            fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
            fader(0.9f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
            fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::PBRStart));
            sg.setCollisionEnabled(false);
        };

        show3dViewInternal( asg, show3d );
    }
};

struct ActivateBrowsing3d {
    void
    operator()( SceneGraph& sg, ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) noexcept {

        auto show3d = [&]() {
            arc.setViewingMode(ArchViewingMode::AVM_Walk);
            rsg.setRigCameraController(CameraControlType::Walk);
            rsg.useSkybox(true);
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
            sg.setCollisionEnabled(true);
        };

        show3dViewInternal( asg, show3d );
    }
};

struct ActivateBrowsingDollyHouse {
    void
    operator()( SceneGraph& sg, ArchOrchestrator& asg, HouseMakerStateMachine& hm, RenderOrchestrator& rsg ) noexcept {
        auto show3d = [&]() {
            hm.ARC().setViewingMode(ArchViewingMode::AVM_DollHouse);
            rsg.setRigCameraController(CameraControlType::Fly);
            rsg.useSkybox(true);
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
            sg.setCollisionEnabled(false);
        };

        show3dViewInternal( asg, show3d );
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

static inline void
updateSourceImagesIntoScene( SceneGraph& sg, ArchOrchestrator& asg, const SourceImages& sourceImages ) {
    auto binPropertyId = asg.H()->propertyId + "_bin";
    auto sourceBim = sg.get<RawImage>(binPropertyId);
    if ( sourceBim ) {
        memcpy(sourceBim->data(), sourceImages.sourceFileImageBin.data, sourceBim->size());
        sg.updateRawImage(binPropertyId);
    } else {
        auto sourceBinParams = getImageParamsFromMat(sourceImages.sourceFileImageBin);
        auto sourceBinImage = RawImage{ sourceBinParams.width, sourceBinParams.height, sourceBinParams.channels,
                                        sourceImages.sourceFileImageBin.data };
        sg.addRawImageIM(binPropertyId, sourceBinImage);
    }
}

struct UpdateHMB {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg ) {
        updateSourceImagesIntoScene(sg, asg, HouseMakerBitmap::prepareImages(asg.H()));
    }
};


static inline void
prepareProperty( const PropertyListing& property, ArchOrchestrator& asg, const std::string& mediaFolder ) {

    asg.loadHouse(property._id, [&, property, mediaFolder]() {
        HouseMakerBitmap::createSourceDataImage(asg.H(), property, mediaFolder);
        asg.centerCameraMiddleOfHouse();
        asg.onEvent(ArchIOEvents::AIOE_OnLoad);
    }, [&, property]() {
        asg.setHouse(HouseMakerBitmap::makeEmpty(property, mediaFolder));
        asg.centerCameraMiddleOfHouse();
        asg.onEvent(ArchIOEvents::AIOE_OnLoad);
    });

}

struct CreateHouseTextures {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg ) {
        updateSourceImagesIntoScene(sg, asg, HouseMakerBitmap::getSourceImages());
        sg.addRawImageIM(asg.H()->propertyId, asg.H()->sourceData.image);
        if ( asg.H()->sourceData.floorPlanBBox.size().x() == 0.0f ||
             asg.H()->sourceData.floorPlanBBox.size().y() == 0.0f ) {
            asg.H()->sourceData.floorPlanBBox = Rect2f{ V2fc::ZERO, V2f{ asg.H()->sourceData.image.width *
                                                                         asg.H()->sourceData.rescaleFactor,
                                                                         asg.H()->sourceData.image.height *
                                                                         asg.H()->sourceData.rescaleFactor } };
        }
        asg.showIMHouse();
        asg.onEvent(ArchIOEvents::AIOE_OnLoadComplete);
    }
};

JSONDATA(ExcaliburPostBody, url, upsert)
    std::string url;
    bool upsert = false;
    ExcaliburPostBody( const std::string& url, bool upsert ) : url(url), upsert(upsert) {}
};

struct ImportExcaliburLink {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc,
                     const CLIParamMap& cli,
                     OnImportExcaliburLinkEvent event ) {
        auto body = ExcaliburPostBody{ event.excaliburLink, false };
        Http::post(Url{ "/property/fetch/floorplan/excalibur" }, body.serialize(),
                   [&]( HttpResponeParams params ) {
                       PropertyListing property{ params.BufferString() };
                       prepareProperty(property, asg, *cli.getParam("mediaFolder"));
//                    asg.saveHouse();
                   });
    }
};

struct CreateNewPropertyFromFloorplanImage {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc,
                     const CLIParamMap& cli,
                     OnCreateNewPropertyFromFloorplanImageEvent event ) {
        Http::post(Url{ "/property/newFromImage/" + url_encode(getFileName(event.floorplanFileName)) },
                   FM::readLocalFileC(event.floorplanFileName), [&]( HttpResponeParams params ) {
                    PropertyListing property{ params.BufferString() };
                    prepareProperty(property, asg, *cli.getParam("mediaFolder"));
                    asg.saveHouse();
                });
    }
};

struct LoadFloorPlan {
    void operator()( SceneGraph& sg, ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc,
                     const CLIParamMap& cli,
                     OnLoadFloorPlanEvent event ) {
        prepareProperty(event.property, asg, *cli.getParam("mediaFolder"));
    }
};

struct MakeHouse3d {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        //HouseService::guessFittings( asg.H(), asg.FurnitureMap() );
        asg.make3dHouse([&]() {
            if ( arc.getViewingMode() == ArchViewingMode::AVM_DollHouse ||
                 arc.getViewingMode() == ArchViewingMode::AVM_TopDown3d ) {
                rsg.RR().setVisibilityOnTags(ArchType::CeilingT, false);
            }
        });
    }
};

struct ElaborateHouseBitmap {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        auto newHouse = HouseMakerBitmap::make(asg.H(), asg.FurnitureMap());
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
            // We do 2 re-scale because we do not want to have accuracy problems on chaining floating point operations
            // and we also want an absolute number as a scale factor that we can easily serialize.
            // The reason why we need to do 2 rescale is that we do not have a "1.0" scale factor as that depends
            // on the result of the ocr scan of the floorplan, so first we need to invert the current scale
            // then apply the new scale. It's a bit awkard but works.
            HouseMakerBitmap::rescale(asg.H(), 1.0f / oldScaleFactor, metersToCentimeters(1.0f / oldScaleFactor));
            asg.H()->sourceData.rescaleFactor = metersToCentimeters(currentScaleFactorMeters);
            HouseMakerBitmap::rescale(asg.H(), asg.H()->sourceData.rescaleFactor,
                                      centimetersToMeters(asg.H()->sourceData.rescaleFactor));
            // We need a full rebuild of the fittings because scaling doesn't go well with furnitures, IE we cannot
            // scale a sofa, hence only scaling the position will move the sofa away from it's desired location
            // which for example would be "against a wall". So because we cannot apply "scale" to furnitures we need
            // to re-run the complete algorithm to refit everything with the new scale.
            HouseService::guessFittings(asg.H(), asg.FurnitureMap());
            asg.showIMHouse();
            asg.centerCameraMiddleOfHouse();
        }
    }
};