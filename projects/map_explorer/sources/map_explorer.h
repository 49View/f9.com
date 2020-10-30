//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>

struct FrontEndStateMachineSML;
using FrontEnd = sm<FrontEndStateMachineSML>;
class OsmOrchestrator;

// Back End
class MapExplorer :
        public RunLoopBackEndBase,
        public LoginActivation<LoginFieldsPrecached>,
        public ScenePreLoader,
        public BackEndService<FrontEnd> {
public:
    MapExplorer( SceneGraph& _sg, RenderOrchestrator& _rsg, OsmOrchestrator& _osg );
    ~MapExplorer() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;
    void backEndIOServices( const AggregatedInputData& _aid ) override;
protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
protected:
    OsmOrchestrator& osg;
};
