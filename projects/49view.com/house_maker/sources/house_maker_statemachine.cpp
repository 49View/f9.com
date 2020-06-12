//
// Created by Dado on 2018-10-16.
//

#include "house_maker_statemachine.h"
#include <core/file_manager.h>
#include <core/raw_image.h>
#include <graphics/render_light_manager.h>
#include <graphics/imgui/imgui.h>
#include <poly/scene_dependency_resolver.hpp>

#include <eh_arch/render/wall_render.hpp>
#include <eh_arch/render/room_render.hpp>
#include <eh_arch/render/house_render.hpp>
#include <core/math/vector_util.hpp>
#include <graphics/imgui/imgui_jsonvisit.hpp>

#include "transition_table_fsm.hpp"

HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg,
                                                ArchRenderController& _arc ) :
        RunLoopBackEndBase(_sg, _rsg),
        ScenePreLoader(_sg, _rsg),
        asg(_asg), arc(_arc) {
    arc.renderMode(FloorPlanRenderMode::Debug3d);
    rb = std::make_shared<RoomBuilder>(_sg, _rsg);
    backEnd = std::make_unique<FrontEnd>(*this, rb.get(), _asg, _sg, _rsg, houseJson.get(), _arc);
}

void HouseMakerStateMachine::activateImpl() {
    loadSceneEntities();
}

void HouseMakerStateMachine::elaborateHouseBitmap() {
    houseJson = HouseMakerBitmap::make(hmbBSData, sourceImages);
    showIMHouse();
}

void HouseMakerStateMachine::elaborateHouseStage1( const std::string& filename ) {
    hmbBSData = HMBBSData{ getFileNameOnly(filename), RawImage{ FM::readLocalFileC(filename) } };
    sg.addRawImageIM(hmbBSData.filename, hmbBSData.image);
    updateHMB();
    houseJson = HouseMakerBitmap::makeEmpty(hmbBSData);
    asg.showIMHouse(houseJson.get());
    asg.centerCameraMiddleOfHouse(houseJson.get());
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
}

void HouseMakerStateMachine::elaborateHouseCallback( std::vector<std::string>& _paths ) {
    if ( _paths.empty() ) return;
    elaborateHouseStage1(_paths[0]);
    _paths.clear();
}

void HouseMakerStateMachine::showIMHouse() {
    HouseService::guessFittings(houseJson.get(), furnitureMap);
    asg.showIMHouse(houseJson.get());
}

void HouseMakerStateMachine::activatePostLoad() {

//    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    Http::get(Url{ "/furnitureset/uk_default" }, [&, this]( HttpResponeParams& res ) {
        FurnitureSetContainer fset{ res.bufferString };
        for ( const auto& f : fset.set ) {
            sg.loadProfile(f.symbol);
            furnitureMap.addIndex(f);
        }
    });

    rsg.RR().createGrid(CommandBufferLimits::GridStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ),
                        ( Color4f::DARK_GRAY ), V2f{ 15.0f }, 0.015f);
    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
    rsg.changeTime("summer 14:00");

    rsg.useSkybox(true);
    rsg.RR().useVignette(true);
    rsg.RR().useFilmGrain(true);
    rsg.RR().useBloom(false);
    rsg.useSSAO(true);

    luaFunctionsSetup();

    rsg.setDragAndDropFunction(std::bind(&HouseMakerStateMachine::elaborateHouseCallback, this, std::placeholders::_1));

//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt1.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt2.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt3.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt4.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt5.png");

//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/asr2bedroomflat.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/canbury_park_road.jpg");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/halterA7-11.png");
    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/test_lightingpw.png");

//    rb->loadSegments(FM::readLocalFileC("/home/dado/Documents/GitHub/f9.com/builds/house_maker/debug/bespoke_segments529417476917197912") );
//    finaliseBespoke();

    backEnd->process_event(OnActivateEvent{});
}

void HouseMakerStateMachine::clear() {
    rb->clear();
    if ( houseJson ) {
        HouseService::clearHouse(houseJson.get());
        showIMHouse();
    }
    bespokeWalls.clear();
}

void HouseMakerStateMachine::finaliseBespoke() {
    HouseService::mergePoints( houseJson.get(), rb->bespokeriseWalls());
    HouseMakerBitmap::makeFromWalls( houseJson.get(), hmbBSData, sourceImages );
    showIMHouse();
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData& _aid ) {
    // Debug control panel using imgui
#ifdef _USE_IMGUI_

    ImGui::Begin("SceneGraph");
    ImGui::Text("Scene nodes: %lu", sg.Nodes().size());
    sg.visitNodes([]( const GeomSPConst elem ) {
        ImGui::Text("%s", elem->Name().c_str());
    });
    ImGui::End();

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
    ImGui::Text("Winning Strategy: %d", hmbBSData.winningStrategy);
    ImGui::Text("Winning Margin: %f", hmbBSData.winningMargin);
    static float oldScaleFactor = hmbBSData.rescaleFactor;
    static float currentScaleFactorMeters = centimetersToMeters(hmbBSData.rescaleFactor);
    if ( ImGui::InputFloat("Scale Factor", &currentScaleFactorMeters, 0.001f, 0.01f, 5) ) {
        backEnd->process_event( OnGlobalRescaleEvent{ oldScaleFactor, currentScaleFactorMeters} );
        oldScaleFactor = hmbBSData.rescaleFactor;
    }

    static float fptf = arc.getFloorPlanTransparencyFactor();
    if ( ImGui::SliderFloat("floorPlanTransparencyFactor", &fptf, 0.0f, 1.0f) ) {
        arc.setFloorPlanTransparencyFactor(fptf);
        showIMHouse();
    }

    if ( ImGui::Button("Elaborate") ) {
        elaborateHouseBitmap();
    }
    if ( ImGui::Button("Elaborate 3d") ) {
        backEnd->process_event(OnMakeHouse3dEvent{});
    }

    if ( ImGui::Button("Publish") ) {
        FM::writeLocalFile("./asr2bed.json", houseJson->serialize());
        Http::post(Url{ "/propertybim/5ea45ffeb06b0cfc7488ec45" }, houseJson->serialize(),
                   []( HttpResponeParams params ) {
                       LOGRS("Published")
                   });
    }
    ImGui::End();

    ImGui::Begin("SourceImages");
    ImGui::Text("Source");
    if ( !hmbBSData.filename.empty() ) {
        float tSize = 500.0f;
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

    if ( houseJson ) {
        ImGui::Begin("House Properties");
        ImGui::Text("Walkable Area: %s", sqmToString(houseJson->walkableArea).c_str());
        ImGui::Text("Num floors: %lu", houseJson->mFloors.size());
        ImGui::InputFloat3("Best viewing position", &houseJson->bestInternalViewingPosition[0]);
        ImGui::InputFloat3("Best viewing angle", &houseJson->bestInternalViewingAngle[0]);
        if ( ImGui::Button("Set Starting Position") ) {
            houseJson->bestInternalViewingPosition = rsg.DC()->getPosition();
            houseJson->bestInternalViewingAngle = rsg.DC()->getIncrementQuatAngles();
        }
        if ( ImGui::Button("Set Dolly Position") ) {
            houseJson->bestDollyViewingPosition = rsg.DC()->getPosition();
            houseJson->bestDollyViewingAngle = rsg.DC()->getIncrementQuatAngles();
        }
        ImGui::End();

        ImGui::Begin("House Structure");
        houseJson->visit<ImGUIJson>();
        ImGui::End();
    }

    auto selected = arc.selectionFront();
    if ( selected ) {
        ImGui::Begin("Selection");
        auto *room = HouseService::find<RoomBSData>(houseJson.get(), selected->hash);
        if ( room ) {
            if ( ImGui::ColorPicker3("Wall Color", &room->wallColor[0] ) ) {
                backEnd->process_event(OnMakeHouse3dEvent{});
            }
            static std::array<bool, ASType::LastRoom> hasRoomV{};
            auto startIndex = ASType::GenericRoom;
            for ( auto rn = startIndex; rn < ASType::LastRoom; rn++ ) {
                hasRoomV[rn - startIndex] = RoomService::hasRoomType(room, rn);
            }
            for ( auto rn = startIndex; rn < ASType::LastRoom; rn++ ) {
                if ( ImGui::Checkbox(RoomService::roomTypeToName1to1(rn).c_str(), &hasRoomV[rn - startIndex]) ) {
                    if ( hasRoomV[rn-startIndex] ) {
                        RoomService::addRoomType(room, rn);
                        RoomService::removeRoomType(room, ASType::GenericRoom);
                    } else {
                        RoomService::removeRoomType(room, rn);
                        if ( room->roomTypes.empty() ) {
                            RoomService::addRoomType(room, ASType::GenericRoom);
                        }
                    }
                    showIMHouse();
                }
            }
        } else {
            auto *wall = HouseService::find<WallBSData>(houseJson.get(), selected->hash);
            if ( wall ) {
                LOGRS("Wall selected: " << wall->epoints[selected->index] << " " << wall->epoints[selected->index+1] );
                auto aci = HouseService::findRoomArchSegmentWithWallHash( houseJson.get(), wall->hash, selected->index );
                if ( aci ) {
                    ImGui::Text("Wall index: %d", static_cast<int>(*aci));
                }

            }
        }

        ImGui::End();
    }

//    ImGui::ShowDemoWindow();

#endif

    bool isLeftAltPressed = _aid.TI().checkKeyPressed(GMK_LEFT_ALT);
    bool isShiftPressed = _aid.TI().checkKeyPressed(GMK_LEFT_SHIFT);

    if ( isLeftAltPressed ) {
        backEnd->process_event(OnAltPressedEvent{});
    }
    if ( isShiftPressed ) {
        if ( _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
            backEnd->process_event(OnClearEvent{});
        }
    }

    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_CONTROL) ) {
        if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            backEnd->process_event(OnUndoEvent{});
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_T) ) {
            backEnd->process_event(OnSpecialSpaceEvent{});
        }
    }

    if ( _aid.isMouseTouchedDownFirstTime(TOUCH_ZERO) ) {
        backEnd->process_event(OnFirstTimeTouchDownEvent{ _aid.mousePos(TOUCH_ZERO) });
        backEnd->process_event(OnFirstTimeTouchDownViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }
    if ( _aid.hasMouseMoved(TOUCH_ZERO) && _aid.isMouseTouchedDown(TOUCH_ZERO) ) {
        backEnd->process_event(OnTouchMoveEvent{ _aid.mousePos(TOUCH_ZERO) });
        backEnd->process_event(OnTouchMoveViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }
    if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
        backEnd->process_event(OnTouchUpEvent{ _aid.mousePos(TOUCH_ZERO) });
        backEnd->process_event(OnTouchUpViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_A) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_A });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_D) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_D, _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_1) ) {
        backEnd->process_event(OnHouseMakerToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_2) ) {
        backEnd->process_event(OnBrowserTopDown3dToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_3) ) {
        backEnd->process_event(OnBrowser3dToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_4) ) {
        backEnd->process_event(OnBrowserDollyHouseToggleEvent{});
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_Z });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_X) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_X });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_C) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_C });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_R) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_R });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_O) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_O });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_P) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_P });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ENTER) ) {
        backEnd->process_event(OnFinaliseEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_SPACE) ) {
        backEnd->process_event( OnSpaceEvent{} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ESCAPE) ) {
        backEnd->process_event(OnEscapeEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
        backEnd->process_event(OnDeleteEvent{});
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
ArchOrchestrator& HouseMakerStateMachine::ASG() {
    return asg;
}
ArchRenderController& HouseMakerStateMachine::ARC() {
    return arc;
}
