//
// Created by Dado on 2018-10-16.
//

#include "house_maker_statemachine.h"
#include <core/resources/resource_builder.hpp>
#include <core/file_manager.h>
#include <core/raw_image.h>
#include <graphics/render_light_manager.h>
#include <graphics/imgui/imgui.h>
#include <poly/scene_dependency_resolver.hpp>
#include <poly/follower.hpp>

#include <eh_arch/render/wall_render.hpp>
#include <eh_arch/render/window_render.hpp>
#include <eh_arch/render/room_render.hpp>
#include <eh_arch/render/house_render.hpp>
#include <core/math/vector_util.hpp>
#include <eh_arch/models/wall_service.hpp>

HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg ) :
        RunLoopBackEndBase(_sg, _rsg),
        ScenePreLoader(_sg, _rsg),
        asg(_asg) {
    rb = std::make_unique<RoomBuilder>(_sg, _rsg, houseJson);
}

void HouseMakerStateMachine::activateImpl() {
    loadSceneEntities();
}

void HouseMakerStateMachine::luaFunctionsSetup() {
}

void HouseMakerStateMachine::elaborateHouseBitmap() {
    houseJson = HouseMakerBitmap::make(hmbBSData, sourceImages);
//    HouseService::guessFittings(houseJson.get(), furnitureMap);
    asg.showIMHouse(houseJson, ims);
}

void HouseMakerStateMachine::elaborateHouseStage1( const std::string& filename ) {
    hmbBSData = HMBBSData{ getFileNameOnly(filename), RawImage{ FM::readLocalFileC(filename) } };
    sg.addRawImageIM(hmbBSData.filename, hmbBSData.image);
    updateHMB();
    houseJson = HouseMakerBitmap::makeEmpty(hmbBSData);
    asg.showIMHouse(houseJson, ims);
    rsg.DC()->setPosition(rsg.DC()->center(houseJson->bbox, 0.0f));
}

void HouseMakerStateMachine::elaborateHouseStageWalls( const V2fVectorOfVector& wallPoints ) {
    HouseMakerBitmap::makeFromWalls( houseJson, wallPoints, hmbBSData, sourceImages);
    HouseService::guessFittings(houseJson.get(), furnitureMap);
}

void HouseMakerStateMachine::updateHMB() {
    sourceImages = HouseMakerBitmap::prepareImages(hmbBSData);

    auto sourceBim = sg.get<RawImage>(hmbBSData.filename + "_bin");
    if ( sourceBim ) {
        memcpy(sourceBim->data(), sourceImages.sourceFileImageBin.data, sourceBim->size());
        sg.updateRawImage(hmbBSData.filename + "_bin");
    } else {
        auto sourceBinParams = getImageParamsFromMat(sourceImages.sourceFileImageBin);
        auto sourceBinImage = RawImage{ sourceBinParams.width, sourceBinParams.height, sourceBinParams.channels,
                                        sourceImages.sourceFileImageBin.data };
        sg.addRawImageIM(hmbBSData.filename + "_bin", sourceBinImage);
    }
};

void HouseMakerStateMachine::elaborateHouseCallback( std::vector<std::string>& _paths ) {
    if ( _paths.empty() ) return;
    elaborateHouseStage1(_paths[0]);
    _paths.clear();
}

void HouseMakerStateMachine::set2dMode( const V3f& pos ) {
    rsg.RR().showBucket(CommandBufferLimits::UI2dStart, true);
    rsg.RR().showBucket(CommandBufferLimits::PBRStart, false);
    rsg.setRigCameraController(CameraControlType::Edit2d);
    rsg.DC()->LockAtWalkingHeight(false);
    rsg.DC()->setPosition(pos);
    rsg.DC()->setQuatAngles(V3f{ M_PI_2, 0.0f, 0.0f });
    rsg.useSkybox(false);
}

void HouseMakerStateMachine::set3dMode() {
    rsg.RR().showBucket(CommandBufferLimits::UI2dStart, false);
    rsg.RR().showBucket(CommandBufferLimits::PBRStart, true);
    rsg.setRigCameraController(CameraControlType::Walk);
    rsg.DC()->setQuatAngles(V3f{ 0.0f, 0.0f, 0.0f });
    if ( houseJson ) {
        Timeline::play(rsg.DC()->PosAnim(), 0,
                       KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.45f, houseJson->center.y() } });
    }
    rsg.useSkybox(true);
    asg.show3dHouse(houseJson);
}

void HouseMakerStateMachine::showIMHouse() {
    asg.showIMHouse(houseJson, ims);
}

void HouseMakerStateMachine::activatePostLoad() {

    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    Http::get(Url{ "/furnitureset/uk_default" }, [&, this]( HttpResponeParams& res ) {
        FurnitureSetContainer fset{ res.bufferString };
        for ( const auto& f : fset.set ) {
            furnitureMap.addIndex(f);
        }
    });

    rsg.RR().createGrid(CommandBufferLimits::UnsortedStart + 1, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ),
                        ( Color4f::DARK_GRAY ), V2f{ 15.0f }, 0.015f);
    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
    rsg.changeTime("summer 14:00");

    rsg.useSkybox(true);
    rsg.RR().useVignette(true);
    rsg.RR().useFilmGrain(true);
    rsg.RR().useBloom(false);
    rsg.useSSAO(true);

    luaFunctionsSetup();

    set2dMode(V3f::UP_AXIS * 5.0f);

    rsg.setDragAndDropFunction(std::bind(&HouseMakerStateMachine::elaborateHouseCallback, this, std::placeholders::_1));

//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/asr2bedroomflat.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/canbury_park_road.jpg");
    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/halterA7-11.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/test_lightingpw.png");

    rb->loadSegments(FM::readLocalFileC("/home/dado/Documents/GitHub/f9.com/builds/house_maker/debug/bespoke_segments14807935707459752956") );
    finaliseBespoke();

}

void HouseMakerStateMachine::clear() {
    rb->clear();
    if ( houseJson ) {
        HouseService::clearHouse(houseJson.get());
        showIMHouse();
    }
    bespokeWalls.clear();
}

void HouseMakerStateMachine::appendBespokeWalls( const V2fVectorOfVector& bwalls ) {
    bespokeWalls.insert( bespokeWalls.end(), bwalls.begin(), bwalls.end() );
}

void HouseMakerStateMachine::finaliseBespoke() {
    appendBespokeWalls( rb->bespokeriseWalls(1.0f) );
    elaborateHouseStageWalls( bespokeWalls );
    rb->clear();
    showIMHouse();
    smFrotnEnd.setCurrentState(SMState::Browsing);
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData& _aid ) {
    // Debug control panel using imgui
#ifdef _USE_IMGUI_

    ImGui::Begin("Control");
    if ( ImGui::SliderFloat("Contrast", &hmbBSData.sourceContrast, 0.0f, 20.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("Brightness", &hmbBSData.sourceBrightness, 0.0f, 255.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("Gaussian", &hmbBSData.sourceGuassian, 1.0f, 5.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderInt("Gaussian Sigma", &hmbBSData.sourceGuassianSigma, 1, 21) ) {
        if ( !isOdd(hmbBSData.sourceGuassianSigma) ) hmbBSData.sourceGuassianSigma++;
        updateHMB();
    }
    if ( ImGui::SliderFloat("Gaussian Beta", &hmbBSData.sourceGuassianBeta, -5.0f, 5.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("minBinThreshold", &hmbBSData.minBinThreshold, 0.0f, 255.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("maxBinThreshold", &hmbBSData.maxBinThreshold, 0.0f, 255.0f) ) {
        updateHMB();
    }
    static float scaleFactorInc = 0.01f;
    static float oldScaleFactorInc = 0.01f;
    if ( ImGui::InputFloat("Scale Factor", &scaleFactorInc, 0.01f, 0.01f, 4) ) {
        if ( houseJson ) {
            float sc = sign(scaleFactorInc-oldScaleFactorInc) > 0.0f ? 1.01f : 0.99f;
            HouseMakerBitmap::rescale(houseJson.get(), sc, sc);
            oldScaleFactorInc = scaleFactorInc;
//            rb->scale( centimetersToMeters(hmbBSData.rescaleFactor) );
            showIMHouse();
        }
    }
    if ( ImGui::Button("Elaborate") ) {
        elaborateHouseBitmap();
    }
    if ( ImGui::Button("Add Walls") ) {
        smFrotnEnd.setCurrentState(SMState::InsertingWalls);
    }
    if ( ImGui::Button("Edit Walls") ) {
        smFrotnEnd.setCurrentState(SMState::EditingWalls);
    }
    if ( ImGui::Button("2d") ) {
        auto pos = houseJson ? V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() } : V3f::UP_AXIS * 5.0f;
        set2dMode(pos);
    }
    if ( ImGui::Button("3d") ) {
        set3dMode();
    }
    if ( ImGui::Button("Publish") ) {
        FM::writeLocalFile("./asr2bed.json", houseJson->serialize());
        Http::post(Url{ "/propertybim/5ea45ffeb06b0cfc7488ec45" }, houseJson->serialize(),
                   [this]( HttpResponeParams params ) {
                       LOGRS("Published");
                   });
    }
    ImGui::End();

    ImGui::Begin("SourceImages");
    ImGui::Text("Source");
    if ( !hmbBSData.filename.empty() ) {
        float tSize = 1000.0f;
        auto tex = rsg.RR().TM()->get(hmbBSData.filename);
        auto ar = tex->getAspectRatioVector();
        ImGui::Image(reinterpret_cast<ImTextureID *>(tex->getHandle()), ImVec2{ tSize, tSize / ar.y() });

        auto texBin = rsg.RR().TM()->get(hmbBSData.filename + "_bin");
        ImGui::Image(reinterpret_cast<ImTextureID *>(texBin->getHandle()), ImVec2{ tSize, tSize / ar.y() });
    }
    ImGui::End();

    ImGui::Begin("Camera");
    std::ostringstream camDump;
    camDump << *sg.DC().get();
    auto lines = split(camDump.str(), '\n');
    for ( const auto& line : lines ) {
        ImGui::Text("%s", line.c_str());
    }
    ImGui::End();

////    ImGui::InputScalar("minWallPixelWidth", ImGuiDataType_U64, &hmbBSData.minWallPixelWidth);
////    ImGui::InputScalar("maxWallPixelWidth", ImGuiDataType_U64, &hmbBSData.maxWallPixelWidth);
//    ImGui::InputScalar("mainWallStrategyIndex", ImGuiDataType_S32, &hmbBSData.mainWallStrategyIndex);
//    ImGui::InputScalar("RooomScore", ImGuiDataType_Float, &hmbBSData.roomScore);

#endif

    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_SHIFT) && _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
        clear();
    }

    bool isLeftAltPressed = _aid.TI().checkKeyPressed(GMK_LEFT_ALT);
    bool isEscapePressed = _aid.TI().checkKeyPressed(GMK_ESCAPE);
    if ( smFrotnEnd.getCurrentState() == SMState::Browsing && isLeftAltPressed ) {
        smFrotnEnd.setCurrentState(SMState::InsertingWalls);
    }
    if ( smFrotnEnd.getCurrentState() == SMState::InsertingWalls && isEscapePressed ) {
        smFrotnEnd.setCurrentState(SMState::Browsing);
    }

    if ( smFrotnEnd.getCurrentState() == SMState::Browsing ) {
        if ( _aid.isMouseDoubleTap(TOUCH_ZERO) ) {
        auto cpos = rsg.DC()->getPosition();
        Timeline::play(rsg.DC()->PosAnim(), 0,
                       KeyFramePair{ 0.2f, V3f{ cpos.x(), lerp(0.5f, 0.0f, cpos.y()), cpos.z() } });
        }
    }

    if ( smFrotnEnd.getCurrentState() == SMState::InsertingWalls ) {
        if ( _aid.hasMouseMoved(TOUCH_ZERO) && _aid.isMouseTouchedDown(TOUCH_ZERO) ) {
            rb->setCurrentPointerPos(_aid.mousePos(TOUCH_ZERO));
        }
        if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
            rb->validateAddPoint(_aid.mousePos(TOUCH_ZERO));
        }
        if ( _aid.TI().checkModKeyPressed(GMK_LEFT_CONTROL) && _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            rb->undo();
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            rb->changeSegmentType(ArchType::WallT);
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_X) ) {
            rb->changeSegmentType(ArchType::WindowT);
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_C) ) {
            rb->changeSegmentType(ArchType::DoorT);
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_F) ) {
            finaliseBespoke();
        }
    }

    auto cs = smFrotnEnd.getCurrentState();
    if ( cs == SMState::EditingWalls || cs == SMState::EditingWallsSelected ) {
        if ( _aid.isMouseTouchedDownFirstTime(TOUCH_ZERO) ) {
            float aroundDistance = 0.05f;
            auto is = _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC());
            auto afs = WallService::getNearestFeatureToPoint(houseJson.get(), is, aroundDistance);
            if ( afs.feature != ArchStructuralFeature::ASF_None ) {
                ims.addToSelectionList(afs, is);
                showIMHouse();
                smFrotnEnd.setCurrentState(SMState::EditingWallsSelected);
            } else {
                auto door = HouseService::point<DoorBSData, IsInside>(houseJson.get(), is);
                if ( door ) {
                    afs.feature = ArchStructuralFeature::ASF_Poly;
                    afs.hash = door->hash;
                    ims.addToSelectionList(afs, is);
                    showIMHouse();
                    smFrotnEnd.setCurrentState(SMState::EditingDoorSelected);
                }
            }
        }
        if ( cs == SMState::EditingWallsSelected && _aid.hasMouseMoved(TOUCH_ZERO) ) {
            auto is = _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC());
            ims.moveSelectionList(is, [&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::moveFeature(houseJson.get(), asf, offset, false);
            });
            showIMHouse();
        }
        if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
            smFrotnEnd.setCurrentState(SMState::EditingWalls);
            ims.resetSelection();
            showIMHouse();
//            elaborateHouseStageWalls( HouseService::rescaleWallInverse( houseJson.get(), hmbBSData.rescaleFactor ) );
        }
        if ( cs == SMState::EditingWallsSelected && ims.singleSelectedFeature() == ArchStructuralFeature::ASF_Edge &&
             _aid.TI().checkKeyToggleOn(GMK_A) ) {
            ims.splitFirstEdgeOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf, const V2f& offset ) {
                WallService::splitEdgeAndAddPointInTheMiddle(houseJson.get(), asf, offset);
            });
            showIMHouse();
            ims.resetSelection();
        }
        if ( cs == SMState::EditingWallsSelected && _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
            ims.deleteElementsOnSelectionList([&]( const ArchStructuralFeatureDescriptor& asf ) {
                WallService::deleteFeature(houseJson.get(), asf);
            });
            showIMHouse();
            ims.resetSelection();
        }
    }
    rsg.UI().updateAnim();
}
