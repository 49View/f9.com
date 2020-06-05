//
// Created by dado on 04/06/2020.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include "events__fsm.hpp"
#include "actions__fsm.hpp"

// State machine Front End
struct FrontEndStateMachineSML {
    auto operator()() const noexcept {
        return make_transition_table(
            *state<class Initial> + event<OnActivateEvent> / []{} = state<class HouseMaker>

            ,state<class HouseMaker> + event<OnAltPressedEvent> / []{} = state<class Bespoke>
            ,state<class HouseMaker> + event<OnDoubleTapEvent> / QuickZoomIn{}
            ,state<class HouseMaker> + event<OnClearEvent> / ClearEverthing{}
            ,state<class HouseMaker> + event<OnFirstTimeTouchDownViewportSpaceEvent>[TouchedDownFirstTimeFeatureManipulationGuard{}] / EnterFeatureManipulation{} = state<class FeatureManipulation>

            ,state<class Bespoke> + event<OnUndoEvent> / UndoBespoke{}
            ,state<class Bespoke> + event<OnTouchMoveEvent> / TouchMoveBespoke{}
            ,state<class Bespoke> + event<OnTouchUpEvent> / TouchUpEventBespoke{}
            ,state<class Bespoke> + event<OnKeyToggleEvent> / KeyToggleBespoke{}
            ,state<class Bespoke> + event<OnFinaliseEvent> / FinaliseBespoke{} = state<class HouseMaker>
            ,state<class Bespoke> + event<OnEscapeEvent> / ExitBespoke{} = state<class HouseMaker>

            ,state<class FeatureManipulation> + event<OnTouchMoveViewportSpaceEvent>[TouchMoveFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnKeyToggleEvent>[KeyToggleFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnDeleteEvent>[DeleteFeatureManipulation{}] / ExitFeatureManipulation{} = state<class HouseMaker>
            ,state<class FeatureManipulation> + event<OnTouchUpViewportSpaceEvent>[TouchUpEventFeatureManipulation{}] / ExitFeatureManipulation{} = state<class HouseMaker>

        );
    }
};
