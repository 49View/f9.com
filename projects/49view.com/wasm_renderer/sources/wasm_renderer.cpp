//
// Created by Dado on 2018-10-16.
//

#include "wasm_renderer.h"
#include <poly/scene_events.h>
#include <core/TTF.h>
#include <core/descriptors/osm_bsdata.hpp>
#include <render_scene_graph/render_orchestrator.h>
#include <core/resources/resource_builder.hpp>
#include <core/lightmap_exchange_format.h>
#include <graphics/render_light_manager.h>
#include <graphics/shader_manager.h>
//#include <graphics/imgui/imgui.h>
//#include <graphics/imgui/im_gui_console.h>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/models/house_service.hpp>
#include <poly/scene_graph.h>
#include <render_scene_graph/lightmap_manager.hpp>
#include "transition_table_fsm.hpp"

//scene_t scene{ 0 };
//const std::string skyboxName = "tropical,beach";

Showcaser::Showcaser( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg, ArchRenderController& _arc )
        : RunLoopBackEndBase(_sg, _rsg),
          ScenePreLoader(_sg, _rsg),
          asg(_asg), arc(_arc) {
    backEnd = std::make_shared<FrontEnd>(*this, this->cliParams, _asg, _sg, _rsg, _arc);
}

void Showcaser::postLoadHouseCallback() {
    asg.make3dHouse([&]() {
        Renderer::clearColor(C4fc::XTORGBA("e0e0e0"));
        if ( HouseService::hasTour(asg.H()) ) {
            backEnd->process_event(OnTourToggleEvent{});
        } else {
            backEnd->process_event(OnExploreToggleEvent{});
        }
    });
}

void Showcaser::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
//    rsg.RR().drawGrid(CommandBufferLimits::GridStart, 1.0f, ( C4fc::PASTEL_GRAYLIGHT ),
//                        ( C4fc::DARK_GRAY ), V2f{ 45.0f }, 0.015f);
    rsg.useSkybox(false);
    rsg.useSunLighting(true);
    rsg.RR().setShadowZFightCoefficient(0.002f * 0.15f * 0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);
    rsg.changeTime("14:00", 0.0f);

    backEnd->process_event(OnActivateEvent{ FloorPlanRenderMode::Debug3d });

    rsg.setRigCameraController(CameraControlType::Walk);
    rsg.DC()->setPosition(V3fc::UP_AXIS );

    // Load default property if passed trough command line
//    LOGRS("CLI params:" << cliParams.printAll());

//    rsg.setLuaScriptHotReload(R"(rr.addSceneObject("cactus", "geom", false))");

//    sg.loadAsset("fir,tree");
//    for ( int q = 0; q < 25; q++ ) {
//        sg.GB<GT::Shape>(ShapeType::Sphere, V3f{ 4.0f*signedUnitRand(), 0.5f, 4.0f*signedUnitRand()});
//    }
//    sg.GB<GT::Shape>(ShapeType::Cube, V3f{0.0f, 0.1f, 0.0f}, GT::Scale(10.0f, 0.1f, 10.0f));


    HOD::resolver<OSMData>(sg, nullptr, [&]() {
        rsg.useSkybox(true);
        OSMData map{FM::readLocalFileC("../../elements.json")};
        sg.GB<GT::OSMTile>(&map, V2f{-0.1344f, 51.4892f}, GT::Tag(SHADOW_MAGIC_TAG), GT::Bucket(GTBucket::NearUnsorted), GT::M("city,atlas"), GT::Program(S::SH_CITY_ATLAS));
        sg.GB<GT::OSMBuildings>(&map, V2f{-0.1344f, 51.4892f}, GT::Bucket(GTBucket::Near), GT::M("city,atlas"), GT::Program(S::SH_CITY_ATLAS));
    });

//    sg.loadMaterial("city,atlas", [this](HttpResourceCBSign res ) {
//        rsg.useSkybox(true);
//        HouseService::loadPanorama(nullptr, sg);
//    });
//
//    if ( auto pid = cliParams.getParam("pid"); pid ) {
//        asg.loadHouse(*pid, [this] { postLoadHouseCallback(); });
//    }
}

void Showcaser::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction(nsKey, "loadHouse", [&]( const std::string& _pid ) {
        asg.loadHouse(_pid, [this] { postLoadHouseCallback(); });
    });
    rsg.addLuaFunction(nsKey, "setViewingMode", [&]( int _vm ) {
        switch ( _vm ) {
            case AVM_Hidden:
                break;
            case AVM_Tour:
                backEnd->process_event(OnTourToggleEvent{});
                break;
            case AVM_Walk:
                backEnd->process_event(OnExploreToggleEvent{});
                break;
            case AVM_FloorPlan:
                backEnd->process_event(OnFlorPlanViewToggleEvent{});
                break;
            case AVM_TopDown:
                backEnd->process_event(OnTopDownToggleEvent{});
                break;
            case AVM_DollHouse:
                backEnd->process_event(OnDollyHouseToggleEvent{});
                break;
            default:
                break;
        }

        asg.setViewingMode(static_cast<ArchViewingMode>(_vm));
    });
}

void Showcaser::activateImpl() {
    loadSceneEntities();
}

void Showcaser::updateImpl( const AggregatedInputData& _aid ) {

    if ( _aid.TI().checkKeyToggleOn( GMK_L )) {
        LightmapManager::bakeLightmaps(rsg.SG(), rsg.RR(), {GLTF2Tag, ArchType::CurtainT});
    }

//    if ( _aid.TI().checkKeyToggleOn(GMK_5) ) {
//        backEnd->process_event(OnTourToggleEvent{});
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_6) ) {
//        backEnd->process_event(OnOrbitModeEvent{});
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_1) ) {
//        backEnd->process_event(OnFlorPlanViewToggleEvent{});
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_2) ) {
//        backEnd->process_event(OnTopDownToggleEvent{});
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_3) ) {
//        backEnd->process_event(OnExploreToggleEvent{});
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_4) ) {
//        backEnd->process_event(OnDollyHouseToggleEvent{});
//    }
    if ( _aid.TI().checkKeyToggleOn(GMK_G) ) {
        fader(0.33f, 1.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_H) ) {
//        fader(0.33f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
//    }

#ifndef __EMSCRIPTEN__
#ifdef _USE_IMGUI_
//    ImGui::Begin("SceneGraph");
//    sg.visitNodes([](const GeomSPConst elem ) {
//        ImGui::Text("%s", elem->Name().c_str());
//    });
//    ImGui::End();
//
//    ImGui::Begin("Camera");
//    std::ostringstream camDump;
//    camDump << *sg.DC().get();
//    auto lines = split(camDump.str(), '\n');
//    for (const auto& line: lines ) {
//        ImGui::Text("%s", line.c_str());
//    }
//    ImGui::End();
//
//    ImGuiLuaConsole(rsg);
#endif
#endif

}

void Showcaser::backEndIOServices( const AggregatedInputData& _aid ) {
    backEndIOEvents( backEnd.get(), _aid, rsg.DC().get() );
}
