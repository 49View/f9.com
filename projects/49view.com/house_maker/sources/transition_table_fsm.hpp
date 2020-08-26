//
// Created by dado on 04/06/2020.
//

#pragma once

#define _49VIEW_EDITOR_MODE_

#include <core/state_machine_helper.hpp>

#include <eh_arch/state_machine/arch_sm_events__fsm.hpp>

#include <eh_arch/state_machine/arch_sm_actions__fsm.hpp>
#include <eh_arch/makers/arch_sm_actions_bespoke_builder.hpp>
#include <eh_arch/controller/outdoorArea/arch_sm_actions_outdoor_area_builder.hpp>
#include <eh_arch/makers/arch_sm_actions_maker_builder.hpp>

#include <eh_arch/state_machine/arch_transition_tables_viewing_modes.hpp>
#include <eh_arch/state_machine/arch_transition_tables_editing.hpp>
#include <eh_arch/makers/arch_transition_tables_making.hpp>

// State machine Front End
struct FrontEndStateMachineSML {
    auto operator()() const noexcept {
        return make_transition_table(
            *state<class Initial> + event<OnActivateEvent> / InitializeHouseMaker{} = state<MakerStateMachine>

            ,state<MakerStateMachine> + event<OnAltPressedEvent> / []{} = state<BespokeStateMachine>
            ,state<MakerStateMachine> + event<OnActivateOutdoorAreaBuilderEvent> / ActivateOutdoorAreaUI{} = state<OutdoorAreaStateMachine>
            ,state<MakerStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>
            ,state<MakerStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<MakerStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<MakerStateMachine> + event<OnFirstTimeTouchDownViewportSpaceEvent>[TouchedDownFirstTimeFeatureManipulationGuard{}] / EnterFeatureManipulation{} = state<EditStateMachine>
            ,state<MakerStateMachine> + event<OnSingleTapViewportSpaceEvent>[SingleTapViewportHouseMakerManipulationGuard{}] / EnterFeatureManipulation{} = state<EditStateMachine>

            ,state<TourStateMachine> + event<OnHouseMakerToggleEvent> / ActivateFloorplanView{FloorPlanRenderMode::Debug3d} = state<MakerStateMachine>
            ,state<ExploreStateMachine> + event<OnHouseMakerToggleEvent> / ActivateFloorplanView{FloorPlanRenderMode::Debug3d} = state<MakerStateMachine>
            ,state<TopDownStateMachine> + event<OnHouseMakerToggleEvent> / ActivateFloorplanView{FloorPlanRenderMode::Debug3d} = state<MakerStateMachine>
            ,state<DollyHouseStateMachine> + event<OnHouseMakerToggleEvent> / ActivateFloorplanView{FloorPlanRenderMode::Debug3d} = state<MakerStateMachine>

            ,state<EditStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<EditStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<EditStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<EditStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<BespokeStateMachine> + event<OnFinaliseEvent> / FinaliseBespoke{} = state<MakerStateMachine>
            ,state<BespokeStateMachine> + event<OnEscapeEvent> / ExitBespoke{} = state<MakerStateMachine>

            ,state<OutdoorAreaStateMachine> + event<OnEscapeEvent> / ExitOutdoorArea{} = state<MakerStateMachine>
            ,state<OutdoorAreaStateMachine> + event<OnActivateOutdoorAreaBuilderEvent> / ExitOutdoorArea{} = state<MakerStateMachine>

            ,state<TourStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<TourStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<TourStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<TourStateMachine> + event<OnFirstTimeTouchDownViewportSpaceEvent> / ActivateWalkView{} = state<ExploreStateMachine>

            ,state<ExploreStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<ExploreStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<ExploreStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<TopDownStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<TopDownStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<TopDownStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<DollyHouseStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<DollyHouseStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<DollyHouseStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>
        );
    }
};
