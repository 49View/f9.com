//
// Created by Dado on 2018-10-16.
//

#include "house_maker_statemachine.h"
#include <core/math/vector_util.hpp>
#include <core/file_manager.h>
#include <graphics/render_light_manager.h>
#include <poly/scene_dependency_resolver.hpp>

#include <eh_arch/render/wall_render.hpp>
#include <eh_arch/render/room_render.hpp>

#include "transition_table_fsm.hpp"
#include "house_maker_gui.hpp"

HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg,
                                                ArchRenderController& _arc, HouseMakerSelectionEditor& _se ) :
        RunLoopBackEndBase(_sg, _rsg),
        ScenePreLoader(_sg, _rsg),
        asg(_asg), arc(_arc), selectionEditor(_se) {
    arc.renderMode(FloorPlanRenderMode::Debug3d);
    rb = std::make_shared<RoomBuilder>(_sg, _rsg);
    backEnd = std::make_shared<FrontEnd>(*this, rb.get(), _asg, _sg, _rsg, _arc);
    gui = std::make_shared<HouseMakerGUI<FrontEnd>>(_sg, _rsg, _asg, _arc, _se);
    gui->setBackEnd(backEnd);
}

void HouseMakerStateMachine::activateImpl() {
    loadSceneEntities();
}

void HouseMakerStateMachine::activatePostLoad() {

//    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    Http::get(Url{ "/furnitureset/uk_default" }, [&, this]( HttpResponeParams& res ) {
        FurnitureSetContainer fset{ res.bufferString };
        for ( const auto& f : fset.set ) {
            sg.loadProfile(f.symbol);
            furnitureMap.addIndex(f);
        }
    });

    rsg.RR().createGrid(CommandBufferLimits::GridStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ),
                        ( Color4f::DARK_GRAY ), V2f{ 15.0f }, 0.015f);
    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });
    rsg.changeTime("summer 14:00");

    rsg.useSkybox(true);

    rsg.RR().setShadowZFightCofficient(0.002f*0.15f*0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);

    backEnd->process_event(OnActivateEvent{ [&]() {
        //    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt1.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt2.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt3.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt4.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/visionhouse-apt5.png");

//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/asr2bedroomflat.png");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/canbury_park_road.jpg");
//    elaborateHouseStage1("/home/dado/Downloads/data/floorplans/halterA7-11.png");

      gui->elaborateHouseStage1("/home/dado/Downloads/data/floorplans/test_lightingpw.png");

//    rb->loadSegments(FM::readLocalFileC("/home/dado/Documents/GitHub/f9.com/builds/house_maker/debug/bespoke_segments529417476917197912") );
//    finaliseBespoke();

    }});
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData& _aid ) {

    gui->update();

    bool isLeftAltPressed = _aid.TI().checkKeyPressed(GMK_LEFT_ALT);
    bool isShiftPressed = _aid.TI().checkKeyPressed(GMK_LEFT_SHIFT);

    if ( isLeftAltPressed ) {
        backEnd->process_event(OnAltPressedEvent{});
    }
    if ( isShiftPressed ) {
        if ( _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
            backEnd->process_event(OnClearEvent{});
        }
    }

    if ( _aid.TI().checkModKeyPressed(GMK_LEFT_CONTROL) ) {
        if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
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
    if ( _aid.isMouseTouchedUp(TOUCH_ZERO) ) {
        backEnd->process_event(OnTouchUpEvent{ _aid.mousePos(TOUCH_ZERO) });
        backEnd->process_event(OnTouchUpViewportSpaceEvent{ _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_A) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_A });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_D) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_D, _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC()) });
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_1) ) {
        backEnd->process_event(OnHouseMakerToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_2) ) {
        backEnd->process_event(OnBrowserTopDown3dToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_3) ) {
        backEnd->process_event(OnBrowser3dToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_4) ) {
        backEnd->process_event(OnBrowserDollyHouseToggleEvent{});
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_Z) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_Z });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_X) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_X });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_C) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_C });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_R) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_R });
    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_O) ) {
//        backEnd->process_event(OnKeyToggleEvent{ GMK_O });
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_P) ) {
//        backEnd->process_event(OnKeyToggleEvent{ GMK_P });
//    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ENTER) ) {
        backEnd->process_event(OnFinaliseEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_SPACE) ) {
        backEnd->process_event( OnSpaceEvent{} );
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_ESCAPE) ) {
        backEnd->process_event(OnEscapeEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_DELETE) ) {
        backEnd->process_event(OnDeleteEvent{});
    }

}

ArchOrchestrator& HouseMakerStateMachine::ASG() {
    return asg;
}
ArchRenderController& HouseMakerStateMachine::ARC() {
    return arc;
}
