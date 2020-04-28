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

    Renderer::clearColor(C4f::WHITE);
    rsg.useSkybox( true );
    rsg.useSunLighting( false );
    rsg.useSSAO(true);
    rsg.RR().LM()->setShadowZFightCofficient(0.02f);
    rsg.RR().LM()->setIndoorSceneCoeff(1.0f);
    rsg.changeTime( "summer 13:50" );
    rsg.setRigCameraController<CameraControlOrbit3d>();
    rsg.DC()->setFoV(60.0f);
}

void EditorBackEnd::showHouse() {

    auto houseJson = std::make_shared<HouseBSData>(FM::readLocalFileC("ucarca"));
    houseJson->defaultSkybox = "barcelona";
    HouseRender::make2dGeometry( rsg.RR(), sg, houseJson.get(), Use2dDebugRendering::True );
    rsg.setRigCameraController<CameraControl2d>();
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() }} );
}

void EditorBackEnd::activateImpl() {
    loadSceneEntities();
    showHouse();
}

void EditorBackEnd::updateImpl( const AggregatedInputData& _aid ) {

    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
        sg.chartMeshes2( scene );
        LightmapManager::initScene( &scene, rsg.RR());
        LightmapManager::bake( &scene, rsg.RR());
        LightmapManager::apply( scene, rsg.RR());
    }
}
