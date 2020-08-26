//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <core/raw_image.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/controller/outdoorArea/outdoor_area_ui.hpp>
#include <eh_arch/controller/outdoorArea/outdoor_area_builder.hpp>
#include <eh_arch/models/property_list.hpp>
#include <eh_arch/makers/image/house_maker_bitmap.hpp>
#include <eh_arch/makers/room_builder.hpp>
#include "house_maker_gui.hpp"

struct FrontEndStateMachineSML;
using FrontEnd = sm<FrontEndStateMachineSML>;

class HouseMakerStateMachine
        : public RunLoopBackEndBase,
          public LoginActivation<LoginFieldsPrecached>,
          public ScenePreLoader,
          public BackEndService<FrontEnd> {
public:
    HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg,
                            ArchRenderController& _arc, HouseMakerSelectionEditor&, PropertyListingOrchestrator&,
                            OutdoorAreaUI&);
    ~HouseMakerStateMachine() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;
    void backEndIOServices( const AggregatedInputData& _aid ) override;
protected:
    void activatePostLoad() override;

protected:
    std::shared_ptr<RoomBuilder> rb;
    ArchOrchestrator& asg;
    ArchRenderController& arc;
    std::shared_ptr<HouseMakerGUI<FrontEnd>> gui;
    HouseMakerSelectionEditor& selectionEditor;
    PropertyListingOrchestrator& plo;
    OutdoorAreaUI& outdoorAreaUI;
};
