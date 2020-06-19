//
// Created by dado on 04/06/2020.
//

#pragma once

#include "house_maker_statemachine.h"

struct WhichRoomAmI {
    void operator()( ArchOrchestrator& asg, RenderOrchestrator& rsg, ArchRenderController& arc ) {
        RoomBSData* ret = nullptr;
        HouseService::whichRoomAmI( asg.H(), XZY::C2(rsg.DC()->getPosition()), ret);
    }
};
