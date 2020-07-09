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
#include "transition_table_fsm.hpp"

//scene_t scene{ 0 };
//const std::string skyboxName = "tropical,beach";

Showcaser::Showcaser( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg, ArchRenderController& _arc ) : RunLoopBackEndBase(_sg, _rsg),
                                                                                                                        ScenePreLoader(_sg, _rsg),
                                                                                                                        asg(_asg), arc(_arc) {
    backEnd = std::make_shared<FrontEnd>(*this, this->cliParams, _asg, _sg, _rsg, _arc);
}

void Showcaser::postLoadHouseCallback() {
    asg.make3dHouse( [&]() {
        Renderer::clearColor(C4f::XTORGBA("e0e0e0"));
        if ( HouseService::hasTour(asg.H()) ) {
            backEnd->process_event(OnTourToggleEvent{});
        } else{
            backEnd->process_event(OnExploreToggleEvent{});
        }
    });
}

void Showcaser::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
    rsg.useSkybox(false);
    rsg.RR().setShadowZFightCofficient(0.002f*0.15f*0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);
    rsg.changeTime("14:00");

    backEnd->process_event(OnActivateEvent{FloorPlanRenderMode::Debug3d});

    // Load default property if passed trough command line
//    LOGRS("CLI params:" << cliParams.printAll());

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
        }

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

    bool isShiftPressed = _aid.TI().checkKeyPressed(GMK_LEFT_SHIFT);

    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_CONTROL) ) {
        if ( isShiftPressed && _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            backEnd->process_event(OnRedoEvent{});
        } else if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
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
    if ( _aid.isMouseSingleTap( TOUCH_ZERO) ) {
        backEnd->process_event(OnSingleTapEvent{ _aid.mousePos(TOUCH_ZERO) });
        backEnd->process_event(OnSingleTapViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    } else {
        if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
            backEnd->process_event(OnTouchUpEvent{ _aid.mousePos(TOUCH_ZERO) });
            backEnd->process_event(OnTouchUpViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
        }
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_5) ) {
        backEnd->process_event(OnTourToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_1) ) {
        backEnd->process_event(OnFlorPlanViewToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_2) ) {
        backEnd->process_event(OnTopDownToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_3) ) {
        backEnd->process_event(OnExploreToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_4) ) {
        backEnd->process_event(OnDollyHouseToggleEvent{});
    }

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
