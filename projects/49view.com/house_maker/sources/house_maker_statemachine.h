//
// Created by Dado on 2018-10-16.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include <core/camera.h>
#include <render_scene_graph/runloop_graphics.h>
#include <render_scene_graph/scene_loader.hpp>
#include <eh_arch/scene/arch_scene_graph.hpp>
#include <eh_arch/scene/arch_service.hpp>
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
class ArchVizBackEnd : public RunLoopBackEndBase, public LoginActivation<LoginFieldsPrecached>, public ScenePreLoader {
public:
    ArchVizBackEnd( SceneGraph& _sg, RenderOrchestrator& _rsg, ArchSceneGraph& _asg, ArchService& _as );
    ~ArchVizBackEnd() override = default;

    void updateImpl( const AggregatedInputData& _aid ) override;
    void activateImpl() override;

    void loadHouseCallback( std::vector<std::string>& _paths );

protected:
    void activatePostLoad() override;
    void luaFunctionsSetup() override;
    void loadHouse( const std::string& _filename );
    void loadHouseFromRemote( const std::string& _pid );
    void showHouse();
    void consumeCallbacks();

protected:
    ArchSceneGraph& asg;
    ArchService& as;
    FurnitureMapStorage furnitureMap;
    std::unique_ptr<FrontEnd> backEnd;
    HMBBSData hmbBSData{};
    std::pair<std::shared_ptr<HouseBSData>, bool> callbackStream;

    std::shared_ptr<HouseBSData> houseJson;
    std::string skyboxImage         = "skybox,equirectangular,park,generic,001";

    std::string brimnes_bed         = "Brimnes";
    std::string lauter_selije       = "lauter_selije";
    std::string hemnes_shelf        = "hemnes_shelf";
    std::string hemnes_drawer       = "hemnes_drawer";
    std::string soderhamn           = "soderhamn";
    std::string carpet_flottebo     = "carpet_flottebo";
    std::string Strandmon           = "strandmon";
    std::string pictures_set_3      = "pictures2";
    std::string coffeeTable         = "noguchi";

    std::string queenBedIcon        = "fia,queen,icon";
    std::string bedSideIcon         = "fia,bedside";
    std::string sofaIcon            = "fia,sofa,3seaters";
    std::string wardrobeIcon        = "fia,wardrobe";
    std::string shelfIcon           = "fia,shelf";
    std::string armchairIcon        = "fia,armchair";
    std::string coffeeTableIcon     = "fia,coffee,table";
};
