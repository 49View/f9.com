//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <core/raw_image.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>
#include <eh_arch/scene/arch_scene_graph.hpp>
#include <eh_arch/makers/image/house_maker_bitmap.hpp>

// Events
struct OnActivate {};

// Actions

struct Activate {
    void operator()( SceneGraph& _sg, RenderOrchestrator& rsg ) noexcept {
    }
};

// State machine Front End
struct CarilloStateMachineSML { auto operator()() const noexcept { return make_transition_table(
   *state<class Initial>      + event<OnActivate>                                / Activate{}             = state<class RoomExplorer>
); } };

using FrontEnd = sm<CarilloStateMachineSML>;

// Back End
class HouseMakerStateMachine : public RunLoopBackEndBase, public LoginActivation<LoginFieldsPrecached>, public ScenePreLoader {
public:
    HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchSceneGraph& _asg );
    ~HouseMakerStateMachine() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;

    void elaborateHouseCallback( std::vector<std::string>& _paths );

protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
    void elaborateHouseBitmap();

    void set2dMode( const V3f& pos );
    void set3dMode();

protected:
    ArchSceneGraph& asg;
    std::unique_ptr<FrontEnd> backEnd;
    HMBBSData hmbBSData{};

    FurnitureMapStorage furnitureMap;
    std::shared_ptr<HouseBSData> houseJson;
    std::string skyboxImage         = "skybox,equirectangular,park,generic,001";
};
