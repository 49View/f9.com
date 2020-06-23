//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct WhichRoomAmI {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        if ( asg.H() ) {
            V2f pos2d = XZY::C2(rsg.DC()->getPosition());
            if ( auto ret = HouseService::whichRoomAmI(asg.H(), pos2d ); ret ) {
                arc.setSelectionList(*ret);
            }
        }
    }
};
