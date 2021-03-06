//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>

class ArchRenderController;

struct FrontEndStateMachineSML;
using FrontEnd = sm<FrontEndStateMachineSML>;

// Back End
class Showcaser :
        public RunLoopBackEndBase,
        public LoginActivation<LoginFieldsPrecached>,
        public ScenePreLoader,
        public BackEndService<FrontEnd> {
public:
    Showcaser( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg, ArchRenderController& _ims );
    ~Showcaser() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;
    void backEndIOServices( const AggregatedInputData& _aid ) override;
protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
    void postLoadHouseCallback();
protected:
    ArchOrchestrator& asg;
    ArchRenderController& arc;
};
