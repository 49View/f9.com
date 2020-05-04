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
#include <wasm_renderer/sources/archviz/models/house_bsdata.hpp>
#include <wasm_renderer/sources/archviz/render/house_render.hpp>

scene_t scene{ 0 };

const std::string skyboxName = "tropical,beach";

void EditorBackEnd::activatePostLoad() {

    rsg.setDragAndDropFunction( allConversionsDragAndDropCallback );

    backEnd->process_event( OnActivate{} );

    rsg.createSkybox( SkyBoxInitParams{ SkyBoxMode::CubeProcedural } );

    Renderer::clearColor( C4f::WHITE );
    rsg.useSkybox( true );
    rsg.useSunLighting( false );
    rsg.useSSAO( true );
    rsg.RR().LM()->setShadowZFightCofficient( 0.02f );
    rsg.RR().LM()->setIndoorSceneCoeff( 1.0f );
    rsg.changeTime( "summer 13:50" );
    rsg.setRigCameraController<CameraControlOrbit3d>();
    rsg.DC()->setFoV( 60.0f );

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

void EditorBackEnd::showHouse( std::shared_ptr<HouseBSData> houseJson ) {

//    houseJson->defaultSkybox = "barcelona";
    HouseRender::make2dGeometry( rsg.RR(), sg, houseJson.get(), Use2dDebugRendering::False );

//    Matrix4f m{Matrix4f::IDENTITY};
//    m.scale(1.0f/11.0f);

//    Rect2f ssBBox = Rect2f::IDENTITY*0.1f;
//    rsg.RR().draw<DRect2d>( ssBBox, V4f::GREEN );
//    rsg.RR().draw<DCircleFilled2d>( V3f::ONE*0.5f, V4f::BLACK, 0.05f );
//    rsg.RR().draw<DCircle2d>( V3f::ONE*0.3f, V4f::RED, 0.06f );
//    rsg.RR().draw<DText2d>( FDS{"Ciao a tutti", rsg.SG().FM().get(S::DEFAULT_FONT).get(), V3f::Y_AXIS*0.5f, 0.1f}, V4f::BLACK );
//    auto floorPlanRect = Rect2f{ 0.0f, 0.0f, 0.5f,0.5f };
//    rsg.RR().draw<DPoly>( floorPlanRect.pointscw(), C4f::WHITE.A( 0.75f ));
//    rsg.RR().draw<DPoly2d>( floorPlanRect.pointscw(), C4f::WHITE.A( 0.75f ));

//    rsg.RR().draw<DLine2d>( V3fVector{V3f::ZERO, V3f::MASK_Y_OUT}, V4f::BLACK, 0.005f, RDSPreMult(m) );


//    rsg.setRigCameraController<CameraControl2d>();
//    Timeline::play( rsg.DC()->QAngleAnim(), 0,
//                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI, 0.0f, 0.0f } ) } );
//    Timeline::play( rsg.DC()->PosAnim(), 0,
//                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() }} );

    as.loadHouse( *houseJson );
//    rsg.RR().showBucket( CommandBufferLimits::UnsortedStart, false );
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

    consumeCallbacks();
}
