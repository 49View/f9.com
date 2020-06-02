//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>
#include <eh_arch/controller/arch_orchestrator.hpp>

// Back End
class Showcaser : public RunLoopBackEndBase, public LoginActivation<LoginFieldsPrecached>, public ScenePreLoader {
public:
    Showcaser( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg ) : RunLoopBackEndBase(_sg, _rsg),
                                                                                   ScenePreLoader(_sg, _rsg),
                                                                                   asg(_asg) {}
    ~Showcaser() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;

protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
    void updatePersonLocator();
    void postLoadHouseCallback(std::shared_ptr<HouseBSData> houseJson);
protected:
    ArchOrchestrator& asg;
    Matrix4f floorplanNavigationMatrix;
};
