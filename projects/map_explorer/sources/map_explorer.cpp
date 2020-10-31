//
// Created by Dado on 2018-10-16.
//

#include "map_explorer.h"

#include <core/TTF.h>
#include <core/descriptors/osm_bsdata.hpp>
#include <core/resources/resource_builder.hpp>
#include <core/lightmap_exchange_format.h>

#include <poly/scene_graph.h>
#include <poly/osm/osm_orchestrator.hpp>
#include <poly/scene_events.h>

#include <graphics/render_light_manager.h>
#include <graphics/shader_manager.h>

#include <render_scene_graph/render_orchestrator.h>
#include <render_scene_graph/backend_io_services.hpp>

#include "transition_table_fsm.hpp"

MapExplorer::MapExplorer( SceneGraph& _sg, RenderOrchestrator& _rsg, OsmOrchestrator& _osg )
        : RunLoopBackEndBase(_sg, _rsg),
          ScenePreLoader(_sg, _rsg),
          osg(_osg) {
    backEnd = std::make_shared<FrontEnd>(*this, this->cliParams, _osg, _sg, _rsg);
}

void MapExplorer::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
//    rsg.RR().drawGrid(CommandBufferLimits::GridStart, 1.0f, ( C4fc::PASTEL_GRAYLIGHT ),
//                        ( C4fc::DARK_GRAY ), V2f{ 45.0f }, 0.015f);
    rsg.useSkybox(true);
    rsg.useSunLighting(true);
    rsg.RR().setShadowZFightCoefficient(0.002f * 0.15f * 0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);
    rsg.changeTime("14:00", 0.0f);

    backEnd->process_event(OnActivateEvent{});

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

//    HOD::resolver<OSMData>(sg, nullptr, [&]() {
//        rsg.useSkybox(true);
//        OSMData map{FM::readLocalFileC("../../elements.json")};
//        sg.loadCollisionMesh(OSMService::createCollisionMesh(&map));
//        sg.setCollisionEnabled(true);
//        sg.GB<GT::OSMTile>(&map, V2f{-0.1344f, 51.4892f}, GT::Tag(SHADOW_MAGIC_TAG), GT::Bucket(GTBucket::NearUnsorted), GT::M("city,atlas"), GT::Program(S::SH_CITY_ATLAS));
//        sg.GB<GT::OSMBuildings>(&map, V2f{-0.1344f, 51.4892f}, GT::Bucket(GTBucket::Near), GT::M("city,atlas"), GT::Program(S::SH_CITY_ATLAS));
//    });

    osg.loadOSM(50.8208,-0.1326,0.5);

}

void MapExplorer::luaFunctionsSetup() {
//    const std::string nsKey = "f9";
//    rsg.addLuaFunction(nsKey, "loadHouse", [&]( const std::string& _pid ) {
//        asg.loadHouse(_pid, [this] { postLoadHouseCallback(); });
//    });
}

void MapExplorer::activateImpl() {
    loadSceneEntities();
}

void MapExplorer::updateImpl( const AggregatedInputData& _aid ) {


    if ( _aid.TI().checkKeyToggleOn(GMK_G) ) {
        sg.enableCollisionGravity(!sg.isCollisionGravityEnabled());
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

void MapExplorer::backEndIOServices( const AggregatedInputData& _aid ) {
    backEndIOEvents( backEnd.get(), _aid, rsg.DC().get() );
}
