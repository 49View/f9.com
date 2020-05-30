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
#include <eh_arch/makers/room_builder.hpp>
#include <eh_arch/render/arch_render_controller.hpp>

enum class SMState {
    Browsing,
    InsertingWalls,
    EditingWalls,
};

class BaseState {

};

class StateMachineFrontEnd {
public:
    SMState getCurrentState() const {
        return currentState;
    }
    void setCurrentState( SMState _currentState ) {
        currentState = _currentState;
    }
private:
    SMState currentState = SMState::Browsing;
};

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
    void elaborateHouseStage1( const std::string& filename );
    void elaborateHouseBitmap();

    void set2dMode( const V3f& pos );
    void set3dMode();
    void showIMHouse();

    void updateHMB();

protected:
    ArchSceneGraph& asg;
    HMBBSData hmbBSData{};
    SourceImages sourceImages;
    std::unique_ptr<RoomBuilder> rb;
    RoomBuilderSegmentPoints segments;
    FurnitureMapStorage furnitureMap;
    std::shared_ptr<HouseBSData> houseJson;
    IMHouseRenderSettings ims{FloorPlanRenderMode::Debug3d};

    StateMachineFrontEnd smFrotnEnd;
};
