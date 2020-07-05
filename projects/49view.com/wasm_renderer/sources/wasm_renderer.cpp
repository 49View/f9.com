//
// Created by Dado on 2018-10-16.
//

#include "wasm_renderer.h"
#include <poly/scene_events.h>
#include <core/raw_image.h>
#include <core/TTF.h>
#include <core/camera.h>
#include <core/resources/profile.hpp>
#include <render_scene_graph/render_orchestrator.h>
#include <core/math/vector_util.hpp>
#include <core/lightmap_exchange_format.h>
#include <graphics/render_light_manager.h>
#include <graphics/shader_manager.h>
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_console.h>
#include <eh_arch/render/house_render.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/models/house_service.hpp>

//scene_t scene{ 0 };
//const std::string skyboxName = "tropical,beach";

Showcaser::Showcaser( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg, ArchRenderController& _ims ) : RunLoopBackEndBase(_sg, _rsg),
                                                                                                                        ScenePreLoader(_sg, _rsg),
                                                                                                                        asg(_asg), arc(_ims) {}

void Showcaser::postLoadHouseCallback() {
    asg.make3dHouse( [&]() {
        Renderer::clearColor(C4f::XTORGBA("e0e0e0"));
        if ( HouseService::hasTour(asg.H()) ) {
            asg.setTourView();
        } else{
            asg.setWalkView(0.0f);
        }
    });
}

void Showcaser::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
//    rsg.RR().createGridV2(CommandBufferLimits::GridStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ),
//                        ( Color4f::DARK_GRAY ), V2f{ 15.0f }, 0.015f);

    rsg.useSkybox(false);
//    rsgl.RR().setShadowOverBurnCofficient( appData.getRenderSettings().shadowOverBurnCofficient );
//    rsgl.RR().setIndoorSceneCoeff(appData.getRenderSettings().indoorSceneCoeff);
//    rsgl.RR().setShadowZFightCofficient(appData.getRenderSettings().shadowZFightCofficient);
    rsg.RR().setShadowZFightCofficient(0.002f*0.15f*0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);

//    rsg.RR().useMotionBlur(true);
//    rsg.RR().useDOF(true);

    rsg.changeTime("14:00");
    rsg.setRigCameraController(CameraControlType::Walk);
    rsg.DC()->setQuatAngles(V3f{ 0.08f, -0.00f, 0.0f });

    // Load default property if passed trough command line
    LOGRS("CLI params:" << cliParams.printAll());
    if ( auto pid = cliParams.getParam("pid"); pid ) {
        asg.loadHouse(*pid, std::bind( &Showcaser::postLoadHouseCallback, this));
    }
}

void Showcaser::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction(nsKey, "loadHouse", [&]( const std::string _pid ) {
        asg.loadHouse(_pid, std::bind( &Showcaser::postLoadHouseCallback, this));
    });
    rsg.addLuaFunction(nsKey, "setViewingMode", [&]( int _vm ) {
        asg.setViewingMode( static_cast<ArchViewingMode>(_vm));
    });
}

void Showcaser::activateImpl() {
    loadSceneEntities();
}

void Showcaser::updateImpl( const AggregatedInputData& _aid ) {

//    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
//        sg.chartMeshes2( scene );
//        LightmapManager::initScene( &scene, rsg.RR());
//        LightmapManager::bake( &scene, rsg.RR());
//        LightmapManager::apply( scene, rsg.RR());
//    }

    asg.updateViewingModes(_aid);

//    if ( _aid.isMouseSingleTap( TOUCH_ZERO) ) {
//        auto fd = HouseService::rayFeatureIntersect( asg.H(), RayPair3{rsg.DC()->getPosition(), dir} );
//        if ( fd.hasHit() ) {
//            float safeDist = fd.nearV > 0.25f ? fd.nearV - 0.25f : 0.0f;
//            ic = rsg.DC()->getPosition() + (dir * safeDist);
//            Timeline::play(rsg.DC()->PosAnim(), 0, KeyFramePair{0.5f, ic });
//        }
//    }

//    LOGRS("Mouse floor pick: " << _aid.mouseViewportPos(TouchIndex::TOUCH_ZERO, rsg.DC()));

#ifdef _USE_IMGUI_
    ImGui::Begin("SceneGraph");
    sg.visitNodes([]( const GeomSPConst elem ) {
        ImGui::Text("%s", elem->Name().c_str());
    });
    ImGui::End();

    ImGui::Begin("Camera");
    std::ostringstream camDump;
    camDump << *sg.DC().get();
    auto lines = split(camDump.str(), '\n');
    for ( const auto& line : lines ) {
        ImGui::Text("%s", line.c_str());
    }
    ImGui::End();

    ImGuiLuaConsole(rsg);
#endif

}
