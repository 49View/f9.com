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
#include <graphics/imgui/imgui_jsonvisit.hpp>

#include "transition_table_fsm.hpp"

HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg, ArchRenderController& _ims ) :
        RunLoopBackEndBase(_sg, _rsg),
        ScenePreLoader(_sg, _rsg),
        asg(_asg), ims(_ims) {
    ims.renderMode( FloorPlanRenderMode::Debug3d );
    rb = std::make_shared<RoomBuilder>(_sg, _rsg, houseJson);
    backEnd = std::make_unique<FrontEnd>( *this, rb.get(), _asg, _sg, _rsg, houseJson.get(), _ims );
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
    houseJson = HouseMakerBitmap::make(hmbBSData, sourceImages);
    asg.showIMHouse(houseJson, ims);
    if ( houseJson->bbox.isValid() ) {
        rsg.DC()->setPosition(rsg.DC()->center(houseJson->bbox, 0.0f));
    }
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

void HouseMakerStateMachine::set2dMode() {
    auto pos = houseJson ? V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() } : V3f::UP_AXIS * 5.0f;
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

    set2dMode();

    rsg.setDragAndDropFunction(std::bind(&HouseMakerStateMachine::elaborateHouseCallback, this, std::placeholders::_1));

    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt1.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt2.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/asr2bedroomflat.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/canbury_park_road.jpg");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/halterA7-11.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/test_lightingpw.png");

//    rb->loadSegments(FM::readLocalFileC("/home/dado/Documents/GitHub/f9.com/builds/house_maker/debug/bespoke_segments14807935707459752956") );
//    finaliseBespoke();

    backEnd->process_event( OnActivateEvent{} );
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
}

void HouseMakerStateMachine::quickZoomIn() {
    auto cpos = rsg.DC()->getPosition();
    Timeline::play(rsg.DC()->PosAnim(), 0,
                   KeyFramePair{ 0.2f, V3f{ cpos.x(), lerp(0.5f, 0.0f, cpos.y()), cpos.z() } });
}

void imguiTreeOpenAtStart( bool& _bOpen ) {
    if ( _bOpen ) {
        ImGui::SetNextTreeNodeOpen( true );
        _bOpen = false;
    }
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
    ImGui::Text( "Winning Strategy: %d", hmbBSData.winningStrategy );
    ImGui::Text( "Winning Margin: %f", hmbBSData.winningMargin );
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

    ImGui::Begin("Structure");
    static bool lbStructureOpen = true;
    imguiTreeOpenAtStart( lbStructureOpen );
    if ( ImGui::CollapsingHeader( "Structure" )) {
        houseJson->visit<ImGUIJson>();
    }
    ImGui::End();


#endif

    bool isLeftAltPressed = _aid.TI().checkKeyPressed(GMK_LEFT_ALT);

    if ( isLeftAltPressed ) {
        backEnd->process_event( OnAltPressedEvent{} );
    }
    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_SHIFT) && _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
        backEnd->process_event( OnClearEvent{} );
    }

    if ( _aid.isMouseDoubleTap(TOUCH_ZERO) ) {
        backEnd->process_event( OnDoubleTapEvent{} );
    }

    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_CONTROL) ) {
        if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            backEnd->process_event( OnUndoEvent{} );
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_T) ) {
            backEnd->process_event( OnSpecialSpaceEvent{} );
        }
    }

    if ( _aid.isMouseTouchedDownFirstTime(TOUCH_ZERO) ) {
        backEnd->process_event( OnFirstTimeTouchDownEvent{_aid.mousePos(TOUCH_ZERO)} );
        backEnd->process_event( OnFirstTimeTouchDownViewportSpaceEvent{_aid.mouseViewportPos(TOUCH_ZERO, rsg.DC())} );
    }
    if ( _aid.hasMouseMoved(TOUCH_ZERO) && _aid.isMouseTouchedDown(TOUCH_ZERO) ) {
        backEnd->process_event( OnTouchMoveEvent{_aid.mousePos(TOUCH_ZERO)} );
        backEnd->process_event( OnTouchMoveViewportSpaceEvent{_aid.mouseViewportPos(TOUCH_ZERO, rsg.DC())} );
    }
    if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
        backEnd->process_event( OnTouchUpEvent{_aid.mousePos(TOUCH_ZERO)} );
        backEnd->process_event( OnTouchUpViewportSpaceEvent{_aid.mouseViewportPos(TOUCH_ZERO, rsg.DC())} );
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_A) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_A} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_D) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_D, _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC())} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_2) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_2} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_3) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_3} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_Z} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_X) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_X} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_C) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_C} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_R) ) {
        backEnd->process_event( OnKeyToggleEvent{GMK_R} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ENTER) ) {
        backEnd->process_event( OnFinaliseEvent{} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_SPACE) ) {
        backEnd->process_event( OnSpaceEvent{} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ESCAPE) ) {
        backEnd->process_event( OnEscapeEvent{} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
        backEnd->process_event( OnDeleteEvent{} );
    }

}

HouseBSData *HouseMakerStateMachine::H() {
    return houseJson.get();
}
HMBBSData& HouseMakerStateMachine::HMB() {
    return hmbBSData;
}
SourceImages& HouseMakerStateMachine::SI() {
    return sourceImages;
}
