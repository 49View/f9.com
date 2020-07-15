//
// Created by dado on 04/06/2020.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <eh_arch/state_machine/arch_sm_events__fsm.hpp>
#include <eh_arch/state_machine/arch_sm_actions__fsm.hpp>
#include <eh_arch/state_machine/arch_transition_tables_viewing_modes.hpp>
#include <eh_arch/state_machine/arch_transition_tables_editing.hpp>

// State machine Front End
struct FrontEndStateMachineSML {
    auto operator()() const noexcept {
        return make_transition_table(
            *state<class Initial> + event<OnActivateEvent> / InitializeHouseMaker{} = state<TourStateMachine>

            ,state<EditStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<EditStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<EditStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<EditStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<TourStateMachine> + event<OnOrbitModeEvent> / ActivateOrbitMode{} = state<OrbitModeStateMachine>
            ,state<TourStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>
            ,state<TourStateMachine> + event<OnFlorPlanViewToggleEvent> / ActivateFloorplanView{} = state<FloorPlanViewStateMachine>
            ,state<TourStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<TourStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<TourStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<TourStateMachine> + event<OnFirstTimeTouchDownViewportSpaceEvent> / ActivateWalkView{} = state<ExploreStateMachine>

            ,state<FloorPlanViewStateMachine> + event<OnFlorPlanViewToggleEvent> / ActivateFloorplanView{} = state<FloorPlanViewStateMachine>
            ,state<FloorPlanViewStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<FloorPlanViewStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<FloorPlanViewStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<ExploreStateMachine> + event<OnFlorPlanViewToggleEvent> / ActivateFloorplanView{} = state<FloorPlanViewStateMachine>
            ,state<ExploreStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<ExploreStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<ExploreStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<TopDownStateMachine> + event<OnFlorPlanViewToggleEvent> / ActivateFloorplanView{} = state<FloorPlanViewStateMachine>
            ,state<TopDownStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<TopDownStateMachine> + event<OnDollyHouseToggleEvent> / ActivateDollyHouseView{} = state<DollyHouseStateMachine>
            ,state<TopDownStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>

            ,state<DollyHouseStateMachine> + event<OnFlorPlanViewToggleEvent> / ActivateFloorplanView{} = state<FloorPlanViewStateMachine>
            ,state<DollyHouseStateMachine> + event<OnTopDownToggleEvent> / ActivateTopDownView{} = state<TopDownStateMachine>
            ,state<DollyHouseStateMachine> + event<OnExploreToggleEvent> / ActivateWalkView{} = state<ExploreStateMachine>
            ,state<DollyHouseStateMachine> + event<OnTourToggleEvent> / ActivateTourView{} = state<TourStateMachine>
        );
    }
};
