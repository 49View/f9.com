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
#include <eh_arch/makers/image/house_maker_bitmap.hpp>
#include <eh_arch/makers/room_builder.hpp>
#include <eh_arch/controller/arch_render_controller.hpp>

struct FrontEndStateMachineSML;
using FrontEnd = sm<FrontEndStateMachineSML>;

class HouseMakerStateMachine
        : public RunLoopBackEndBase, public LoginActivation<LoginFieldsPrecached>, public ScenePreLoader {
public:
    HouseMakerStateMachine( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchOrchestrator& _asg,
                            ArchRenderController& _ims );
    ~HouseMakerStateMachine() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;

    void elaborateHouseCallback( std::vector<std::string>& _paths );

    void clear();
    void quickZoomIn();
    void finaliseBespoke();
    void showIMHouse();

    HouseBSData *H();
    HMBBSData& HMB();
    SourceImages& SI();

protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
    void elaborateHouseStage1( const std::string& filename );
    void elaborateHouseBitmap();
    void elaborateHouseStageWalls( const V2fVectorOfVector& wallPoints );
    void appendBespokeWalls( const V2fVectorOfVector& bwalls );

    void set2dMode( const V3f& pos );
    void set3dMode();

    void updateHMB();

protected:
    std::unique_ptr<FrontEnd> backEnd;
    ArchOrchestrator& asg;
    HMBBSData hmbBSData{};
    SourceImages sourceImages;
    std::shared_ptr<RoomBuilder> rb;
    FurnitureMapStorage furnitureMap;
    std::shared_ptr<HouseBSData> houseJson;
    ArchRenderController& ims;

    // Bespoke state
    V2fVectorOfVector bespokeWalls;
};
