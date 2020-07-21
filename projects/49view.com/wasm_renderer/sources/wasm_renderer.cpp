//
// Created by Dado on 2018-10-16.
//

#include "wasm_renderer.h"
#include <poly/scene_events.h>
#include <core/TTF.h>
#include <render_scene_graph/render_orchestrator.h>
#include <core/lightmap_exchange_format.h>
#include <graphics/render_light_manager.h>
#include <graphics/shader_manager.h>
#include <graphics/imgui/imgui.h>
#include <graphics/imgui/im_gui_console.h>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/models/house_service.hpp>
#include <poly/scene_graph.h>
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
        Renderer::clearColor(C4f::XTORGBA("e0e0e0"));
        if ( HouseService::hasTour(asg.H()) ) {
            backEnd->process_event(OnTourToggleEvent{});
        } else {
            backEnd->process_event(OnExploreToggleEvent{});
        }
    });
}

void Showcaser::activatePostLoad() {

    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
    rsg.useSkybox(false);
    rsg.useSunLighting(true);
    rsg.RR().setShadowZFightCofficient(0.002f * 0.15f * 0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);
    rsg.changeTime("14:00");

    backEnd->process_event(OnActivateEvent{ FloorPlanRenderMode::Debug3d });

    // Load default property if passed trough command line
//    LOGRS("CLI params:" << cliParams.printAll());

//    rsg.setLuaScriptHotReload(R"(rr.addSceneObject("cactus", "geom", false))");
//    sg.resetAndLoadEntity("cactus", "geom", false);
//    sg.GB<GT::Shape>(ShapeType::Sphere);

    if ( auto pid = cliParams.getParam("pid"); pid ) {
        asg.loadHouse(*pid, std::bind(&Showcaser::postLoadHouseCallback, this));
    }
}

void Showcaser::luaFunctionsSetup() {
    const std::string nsKey = "f9";
    rsg.addLuaFunction(nsKey, "loadHouse", [&]( const std::string _pid ) {
        asg.loadHouse(_pid, std::bind(&Showcaser::postLoadHouseCallback, this));
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

//    if ( _aid.TI().checkKeyToggleOn( GMK_Z )) {
//        sg.chartMeshes2( scene );
//        LightmapManager::initScene( &scene, rsg.RR());
//        LightmapManager::bake( &scene, rsg.RR());
//        LightmapManager::apply( scene, rsg.RR());
//    }


    // This acts like a classic update loop function in conventional render/update rendering, expect it's wired in the
    // state machine so we can unify the whole code path.
    if ( _aid.mods().isControlKeyDown ) {
        backEnd->process_event(OnTickControlKeyEvent{_aid});
    } else {
        backEnd->process_event(OnTickEvent{_aid});
    }
    
    if ( _aid.mods().isControlKeyDown ) {
        if ( _aid.mods().isShiftPressed && _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            backEnd->process_event(OnRedoEvent{});
        } else if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
            backEnd->process_event(OnUndoEvent{});
        }
        if ( _aid.TI().checkKeyToggleOn(GMK_T) ) {
            backEnd->process_event(OnSpecialSpaceEvent{});
        }
    }

    // Comprehensive mouse events taps with mod keys

    if ( _aid.isMouseTouchedDownFirstTime(TOUCH_ZERO) ) {
        if ( _aid.mods().isControlKeyDown ) {
            backEnd->process_event(OnFirstTimeTouchDownWithModKeyCtrlEvent{ _aid.mousePos(TOUCH_ZERO), _aid });
        } else {
            backEnd->process_event(OnFirstTimeTouchDownEvent{ _aid.mousePos(TOUCH_ZERO) });
        }
        backEnd->process_event(OnFirstTimeTouchDownViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }
    if ( _aid.isMouseTouchedDownAndMoving(TOUCH_ZERO) ) {
        if ( _aid.mods().isControlKeyDown ) {
            backEnd->process_event(OnTouchMoveWithModKeyCtrlEvent{ _aid.mousePos(TOUCH_ZERO) , _aid});
        } else {
            backEnd->process_event(OnTouchMoveEvent{ _aid.mousePos(TOUCH_ZERO) });
            backEnd->process_event(OnTouchMoveViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
        }
    }
    if ( _aid.isMouseSingleTap( TOUCH_ZERO) ) {
        if ( !_aid.mods().isControlKeyDown ) {
            backEnd->process_event(OnSingleTapEvent{ _aid.mousePos(TOUCH_ZERO) });
        }
        backEnd->process_event(OnSingleTapViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }
    if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
        if ( _aid.mods().isControlKeyDown ) {
            backEnd->process_event(OnTouchUpWithModKeyCtrlEvent{ _aid.mousePos(TOUCH_ZERO) });
        } else {
            backEnd->process_event(OnTouchUpEvent{ _aid.mousePos(TOUCH_ZERO) });
        }
        backEnd->process_event(OnTouchUpViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
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
//    if ( _aid.TI().checkKeyToggleOn(GMK_G) ) {
//        fader(0.33f, 1.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_H) ) {
//        fader(0.33f, 0.0f, rsg.RR().CLI(CommandBufferLimits::GridStart));
//    }

#ifdef _USE_IMGUI_
    ImGui::Begin("SceneGraph");
    sg.visitNodes([](
            const GeomSPConst elem
    ) {
        ImGui::Text("%s", elem->
                        Name()
                .
                        c_str()
        );
    });
    ImGui::End();

    ImGui::Begin("Camera");
    std::ostringstream camDump;
    camDump << *sg.
                    DC()
            .
                    get();
    auto lines = split(camDump.str(), '\n');
    for (
        const auto& line
            : lines ) {
        ImGui::Text("%s", line.
                c_str()
        );
    }
    ImGui::End();

    ImGuiLuaConsole(rsg);
#endif

}
