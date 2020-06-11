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

void Showcaser::postLoadHouseCallback(std::shared_ptr<HouseBSData> _houseJson) {

    houseJson = _houseJson;
    asg.show3dHouse(houseJson.get(), [&](HouseBSData* _houseJson) {
        floorplanNavigationMatrix = asg.calcFloorplanNavigationTransform(houseJson, 3.5f, 0.02f);
        arc.pm(RDSPreMult(floorplanNavigationMatrix));
        arc.renderMode(FloorPlanRenderMode::Normal2d);
        HouseRender::IMHouseRender(rsg.RR(), sg, houseJson.get(), arc);

        V2f cobr = HouseService::centerOfBiggestRoom(houseJson.get());
        V3f lngp = V3f{ cobr.x(), 1.48f, cobr.y() };
        sg.setLastKnownGoodPosition(lngp);
        rsg.setRigCameraController(CameraControlType::Walk);
        rsg.DC()->setQuatAngles(V3f{ 0.08f, -0.70f, 0.0f });
        rsg.DC()->setPosition(lngp);
    });
}

void Showcaser::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });

    Renderer::clearColor(C4f::XTORGBA("8ae9e9"));
    rsg.useSkybox(false);
    rsg.RR().useVignette(true);
    rsg.RR().useFilmGrain(true);
    rsg.useSSAO(true);
    rsg.changeTime("14:00");
    rsg.setRigCameraController(CameraControlType::Walk);
    rsg.DC()->setQuatAngles(V3f{ 0.08f, -0.00f, 0.0f });
    rsg.DC()->setFoV(60.0f);

    // Load default property if passed trough command line
    LOGRS("CLI params:" << cliParams.printAll());
    if ( auto pid = cliParams.getParam("pid"); pid ) {
        asg.loadHouse(*pid, std::bind( &Showcaser::postLoadHouseCallback, this, std::placeholders::_1));
    }
}

void Showcaser::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction(nsKey, "loadHouse", [&]( const std::string _pid ) {
        asg.loadHouse(_pid, std::bind( &Showcaser::postLoadHouseCallback, this, std::placeholders::_1));
    });
}

void Showcaser::activateImpl() {
    loadSceneEntities();
}

void Showcaser::updatePersonLocator() {
    if ( houseJson && rsg.getRigCameraController() == CameraControlType::Walk && floorplanNavigationMatrix != Matrix4f::IDENTITY ) {
        rsg.drawCameraLocator(floorplanNavigationMatrix);
    }
}

void Showcaser::updateImpl( const AggregatedInputData& _aid ) {

//    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
//        sg.chartMeshes2( scene );
//        LightmapManager::initScene( &scene, rsg.RR());
//        LightmapManager::bake( &scene, rsg.RR());
//        LightmapManager::apply( scene, rsg.RR());
//    }

    updatePersonLocator();

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
