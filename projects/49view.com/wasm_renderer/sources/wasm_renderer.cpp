//
// Created by Dado on 2018-10-16.
//

#include "wasm_renderer.h"
#include <poly/scene_events.h>
#include <core/math/plane3f.h>
#include <core/raw_image.h>
#include <core/TTF.h>
#include <core/camera.h>
#include <core/resources/profile.hpp>
#include <core/resources/material.h>
#include <render_scene_graph/render_orchestrator.h>
#include <core/resources/resource_builder.hpp>
#include <core/math/vector_util.hpp>
#include <core/lightmap_exchange_format.h>
#include <graphics/lightmap_manager.hpp>
#include <graphics/render_light_manager.h>
#include <graphics/shader_manager.h>
#include <eh_arch/models/house_bsdata.hpp>
#include <eh_arch/render/house_render.hpp>

scene_t scene{ 0 };

const std::string skyboxName = "tropical,beach";

void EditorBackEnd::activatePostLoad() {

    rsg.setDragAndDropFunction( allConversionsDragAndDropCallback );

    backEnd->process_event( OnActivate{} );

    rsg.createSkybox( SkyBoxInitParams{ SkyBoxMode::CubeProcedural } );
//    rsg.RR().createGrid( CommandBufferLimits::UnsortedStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ).A( 0.35f ),
//                           ( Color4f::PASTEL_GRAYLIGHT ).A( 0.25f ), V2f{ 15.0f }, 0.015f );

    Renderer::clearColor( C4f::WHITE );
    rsg.useSkybox( true );
    rsg.RR().useVignette( true );
    rsg.RR().useFilmGrain( true );
//    rsg.useSunLighting( false );
    rsg.useSSAO( true );
//    rsg.RR().LM()->setShadowZFightCofficient( 0.02f );
//    rsg.RR().LM()->setIndoorSceneCoeff( -1.0f );
    rsg.changeTime( "14:00" );
    rsg.setRigCameraController<CameraControlWalk>();
    rsg.DC()->setFoV( 60.0f );

    sg.GB<GT::Shape>(ShapeType::Cube, GT::Tag(SHADOW_MAGIC_TAG), V3f::UP_AXIS_NEG * 0.15f,
                  GT::Scale(500.0f, 0.1f, 500.0f));

//    sg.addGeomScene("tv");

    // Load default property if passed trough command line
    LOGRS( "CLI params:" << cliParams.printAll());
    if ( auto pid = cliParams.getParam("pid"); pid ) {
        loadHouse(*pid);
    }
}

void EditorBackEnd::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction( nsKey, "floorPlanView", [&]() {
        uint64_t frameSkipper = 2;
        Timeline::play( rsg.DC()->PosAnim(), frameSkipper, KeyFramePair{ 2.0f, V3f{ 0.0f, 6.5f, 0.0f }} );
        Timeline::play( rsg.DC()->QAngleAnim(), frameSkipper,
                        KeyFramePair{ 2.0f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
        rsg.setRigCameraController<CameraControl2d>();
        rsg.useSkybox( false );
        rsg.RR().changeMaterialAlphaOnTags( ArchType::CeilingT, 0.0f );
    } );

    rsg.addLuaFunction( nsKey, "walkingView", [&]() {
        uint64_t frameSkipper = 2;
        Timeline::play( rsg.DC()->PosAnim(), frameSkipper, KeyFramePair{ 2.0f, V3f{ 0.0f, 1.5f, 0.0f }} );
        Timeline::play( rsg.DC()->QAngleAnim(), frameSkipper,
                        KeyFramePair{ 2.0f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
        rsg.setRigCameraController<CameraControlWalk>();
        rsg.useSkybox( true );
        rsg.RR().changeMaterialAlphaOnTags( ArchType::CeilingT, 1.0 );
    } );

    rsg.addLuaFunction( nsKey, "loadHouse", [&](const std::string _pid) {
        loadHouse(_pid);
    } );
}

void EditorBackEnd::loadHouse( const std::string& _pid ) {
    Http::get( Url{"/propertybim/" + _pid}, [this]( HttpResponeParams params ) {
        auto house = std::make_shared<HouseBSData>( params.bufferString );
        callbackStream = std::make_pair(house, true);
    } );
}

void EditorBackEnd::calcFloorplanNavigationTransform( std::shared_ptr<HouseBSData> houseJson ) {
    auto m = std::make_shared<Matrix4f>(Matrix4f::IDENTITY);
    float vmax = max(houseJson->bbox.bottomRight().x(), houseJson->bbox.bottomRight().y());
//    float padding = vmax*0.03f;
    float screenFloorplanRatio = (1.0f/4.0f);
    float screenPadding = 0.03f;
    float vmaxScale = vmax / screenFloorplanRatio;
    auto vr = 1.0f/ vmaxScale;
    m->scale( V3f{vr, -vr, -vr});
    m->translate( V3f{getScreenAspectRatio-screenFloorplanRatio-screenPadding, screenFloorplanRatio, screenFloorplanRatio});
    floorplanNavigationMatrix = m;
}

void EditorBackEnd::showHouse( std::shared_ptr<HouseBSData> houseJson ) {

//    houseJson->defaultSkybox = "barcelona";

//    calcFloorplanNavigationTransform(houseJson);
//    HouseRender::make2dGeometry( rsg.RR(), sg, houseJson.get(), RDSPreMult(*floorplanNavigationMatrix.get()), Use2dDebugRendering::False );

    as.loadHouse( *houseJson );
    rsg.setRigCameraController<CameraControlWalk>();
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.6f, houseJson->center.y() }} );

}

void EditorBackEnd::activateImpl() {
    loadSceneEntities();
}

void EditorBackEnd::consumeCallbacks() {
    if ( callbackStream.second ) {
        showHouse(callbackStream.first);
        callbackStream.second = false;
    }
}

void EditorBackEnd::updateImpl( const AggregatedInputData &_aid ) {

//    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
//        sg.chartMeshes2( scene );
//        LightmapManager::initScene( &scene, rsg.RR());
//        LightmapManager::bake( &scene, rsg.RR());
//        LightmapManager::apply( scene, rsg.RR());
//    }

    if ( floorplanNavigationMatrix ) {
        rsg.drawCameraLocator( *floorplanNavigationMatrix.get() );
    }

    consumeCallbacks();
}
