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
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_console.h>
#include <eh_arch/models/house_bsdata.hpp>
#include <eh_arch/render/house_render.hpp>

//scene_t scene{ 0 };
//const std::string skyboxName = "tropical,beach";

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
//    rsg.useMotionBlur( true );
//    rsg.RR().LM()->setShadowZFightCofficient( 0.02f );
//    rsg.RR().LM()->setIndoorSceneCoeff( -1.0f );
    rsg.changeTime( "14:00" );
    rsg.setRigCameraController(CameraControlType::Walk);
    rsg.DC()->setFoV( 60.0f );

    sg.GB<GT::Shape>(ShapeType::Cube, GT::Tag(SHADOW_MAGIC_TAG), V3f::UP_AXIS_NEG * 0.15f, GT::Scale(500.0f, 0.1f, 500.0f));

    // Load default property if passed trough command line
    LOGRS( "CLI params:" << cliParams.printAll());
    if ( auto pid = cliParams.getParam("pid"); pid ) {
        asg.loadHouse(*pid, ShowHouseMatrixFlags::Show3dHouse|ShowHouseMatrixFlags::Show2dFloorPlan);
    }
}

void EditorBackEnd::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction( nsKey, "loadHouse", [&](const std::string _pid) {
        asg.loadHouse(_pid, ShowHouseMatrixFlags::Show3dHouse|ShowHouseMatrixFlags::Show2dFloorPlan);
    } );
}

void EditorBackEnd::activateImpl() {
    loadSceneEntities();
}

void EditorBackEnd::updateImpl( const AggregatedInputData &_aid ) {

//    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
//        sg.chartMeshes2( scene );
//        LightmapManager::initScene( &scene, rsg.RR());
//        LightmapManager::bake( &scene, rsg.RR());
//        LightmapManager::apply( scene, rsg.RR());
//    }

    asg.update();
//    usleep(100000);

#ifdef _USE_IMGUI_
    ImGui::Begin( "SceneGraph" );
    sg.visitNodes( []( const GeomSPConst elem) {
        ImGui::Text( "%s", elem->Name().c_str());
    });
    ImGui::End();

    ImGui::Begin( "Camera" );
    std::ostringstream camDump;
    camDump << *sg.DC().get();
    auto lines = split( camDump.str(), '\n' );
    for ( const auto& line : lines ) {
        ImGui::Text( "%s", line.c_str());
    }
    ImGui::End();

    ImGuiLuaConsole( rsg );
#endif

}
