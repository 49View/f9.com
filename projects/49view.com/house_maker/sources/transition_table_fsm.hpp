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
                *state<class Initial> + event<OnActivateEvent> / []{} = state<class Browsing>
                ,state<class Browsing> + event<OnAltPressedEvent> / []{} = state<class Bespoke>
                ,state<class Bespoke> + event<OnClearEvent> / ClearEverthing{} = state<class Bespoke>
        );
    }
};
