//
// Created by Dado on 2018-10-16.
//

#include "house_maker_statemachine.h"
#include <core/math/vector_util.hpp>
#include <graphics/render_light_manager.h>
#include <render_scene_graph/backend_io_services.hpp>

#include <eh_arch/render/wall_render.hpp>
#include <eh_arch/render/room_render.hpp>

#include "transition_table_fsm.hpp"
#include "house_maker_gui.hpp"

HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg,
                                                ArchRenderController& _arc, HouseMakerSelectionEditor& _se, PropertyListingOrchestrator& _plo ) :
        RunLoopBackEndBase(_sg, _rsg),
        ScenePreLoader(_sg, _rsg),
        asg(_asg), arc(_arc), selectionEditor(_se), plo(_plo) {
    arc.renderMode(FloorPlanRenderMode::Debug3d);
    rb = std::make_shared<RoomBuilder>(_sg, _rsg);
    backEnd = std::make_shared<FrontEnd>(*this, this->cliParams, rb.get(), _asg, _sg, _rsg, _arc);
    gui = std::make_shared<HouseMakerGUI<FrontEnd>>(this->cliParams, _sg, _rsg, _asg, _arc, _se, _plo);
    gui->setBackEnd(backEnd);
}

void HouseMakerStateMachine::activateImpl() {
    loadSceneEntities();
}

void HouseMakerStateMachine::activatePostLoad() {

    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    asg.loadFurnitureMapStorage("uk_default");

    rsg.RR().createGridV2(CommandBufferLimits::GridStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ),
                        ( Color4f::DARK_GRAY ), V2f{ 45.0f }, 0.015f);
    rsg.createSkybox(SkyBoxInitParams{ SkyBoxMode::CubeProcedural });

    rsg.useSkybox(true);

    rsg.RR().setShadowZFightCofficient(0.002f*0.15f*0.5f);
    rsg.RR().useVignette(true);
    rsg.useSSAO(true);
    rsg.RR().useFilmGrain(false);
    rsg.useSunLighting(true);


    backEnd->process_event(OnActivateEvent{FloorPlanRenderMode::Debug3d});
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData& _aid ) {

    gui->update();

    if ( _aid.TI().checkKeyToggleOn(GMK_A) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_A });
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_D) ) {
        backEnd->process_event(OnKeyToggleEvent{ GMK_D, _aid.mouseViewportPos(TOUCH_ZERO, rsg.DC().get()) });
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_5) ) {
        backEnd->process_event(OnTourToggleEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_1) ) {
        backEnd->process_event(OnHouseMakerToggleEvent{});
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
//    if ( _aid.TI().checkKeyToggleOn(GMK_L) ) {
//        backEnd->process_event(OnLoadFloorPlanEvent{ plo.PropertyList().back() });
//    }
//    if ( _aid.TI().checkKeyToggleOn(GMK_SEMICOLON) ) {
//        arc.setFloorPlanTransparencyFactor(1.0f);
//        fader(0.9f, 1.0f, rsg.RR().CLI(CommandBufferLimits::UI2dStart));
//        asg.showIMHouse();
//    }


    if ( _aid.TI().checkKeyToggleOn(GMK_J) ) {
        backEnd->process_event(OnPushTourPathEvent{});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_K) ) {
        backEnd->process_event(OnPushKeyFrameTourPathEvent{});
    }

    if ( _aid.TI().checkKeyToggleOn(GMK_MINUS) ) {
        backEnd->process_event(OnIncrementalScaleEvent{-0.05f});
    }
    if ( _aid.TI().checkKeyToggleOn(GMK_EQUAL) ) {
        backEnd->process_event(OnIncrementalScaleEvent{0.05f});
    }

}

void HouseMakerStateMachine::backEndIOServices( const AggregatedInputData& _aid ) {
    backEndIOEvents( backEnd.get(), _aid, rsg.DC().get() );
}

