//
// Created by Dado on 2018-10-16.
//

#include "house_maker_statemachine.h"
#include <core/resources/resource_builder.hpp>
#include <core/file_manager.h>
#include <core/raw_image.h>
#include <graphics/render_light_manager.h>
#include <graphics/imgui/imgui.h>
#include <poly/scene_dependency_resolver.hpp>

#include <eh_arch/render/wall_render.hpp>
#include <eh_arch/render/window_render.hpp>
#include <eh_arch/render/room_render.hpp>
#include <eh_arch/render/house_render.hpp>
#include <poly/follower.hpp>


HouseMakerStateMachine::HouseMakerStateMachine( SceneGraph &_sg, RenderOrchestrator &_rsg, ArchSceneGraph &_asg ) :
        RunLoopBackEndBase( _sg, _rsg ),
        ScenePreLoader( _sg, _rsg ),
        asg( _asg ) {
    backEnd = std::make_unique<FrontEnd>( *this, _sg, _rsg );
}

void HouseMakerStateMachine::activateImpl() {
    loadSceneEntities();
}

void HouseMakerStateMachine::luaFunctionsSetup() {
}

void HouseMakerStateMachine::elaborateHouse( const std::string &_filename ) {
    auto data = FM::readLocalFileC( _filename );
    RawImage houseImage{ data };
    auto resImageName = getFileNameOnly( _filename );
    sg.addRawImageIM(resImageName, houseImage);

    hmbBSData = HMBBSData{};
    houseJson = HouseMakerBitmap::make( houseImage, hmbBSData, resImageName );
    HouseService::guessFittings( houseJson.get(), furnitureMap );
    asg.showHouse( houseJson );
}

void HouseMakerStateMachine::elaborateHouseCallback( std::vector<std::string> &_paths ) {
    if ( _paths.empty()) return;
    rsg.RR().clearTargets();
    rsg.RR().clearBucket( CommandBufferLimits::UnsortedStart );
    elaborateHouse( _paths[0] );
    _paths.clear();
}

void HouseMakerStateMachine::set2dMode() {
    rsg.setRigCameraController(CameraControlType::Edit2d);
//    rsg.RR().showBucket( CommandBufferLimits::UnsortedStart, true );
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() }} );
    rsg.useSkybox( false );
}

void HouseMakerStateMachine::set3dMode() {
//    rsg.RR().showBucket( CommandBufferLimits::UnsortedStart, false );
    rsg.setRigCameraController(CameraControlType::Walk);
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.45f, houseJson->center.y() }} );
    rsg.useSkybox( true );
}

void HouseMakerStateMachine::activatePostLoad() {

//    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    Http::get( Url{ "/furnitureset/uk_default" }, [&, this]( HttpResponeParams &res ) {
        FurnitureSetContainer fset{ res.bufferString };
        for ( const auto &f : fset.set ) {
            furnitureMap.addIndex(f);
        }
    } );

    rsg.RR().createGridV2( CommandBufferLimits::UnsortedStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ).A( 0.35f ),
                           ( Color4f::PASTEL_GRAYLIGHT ).A( 0.25f ), V2f{ 15.0f }, 0.015f );
    rsg.createSkybox( SkyBoxInitParams{ SkyBoxMode::CubeProcedural } );
    rsg.changeTime( "summer 14:00" );

    rsg.useSkybox( true );
    rsg.RR().useVignette( true );
    rsg.RR().useFilmGrain( true );
    rsg.RR().useBloom( false );
    rsg.useSSAO( true );
//    rsg.useMotionBlur(true);

    luaFunctionsSetup();

//    elaborateHouse( "/home/dado/Downloads/halterA7-11.png" );
//    elaborateHouse( "/home/dado/Pictures/halterA7-11.png" );
    elaborateHouse( "/home/dado/Pictures/vision_house_apt1_big.png" );

    set2dMode();

    rsg.setDragAndDropFunction( std::bind(&HouseMakerStateMachine::elaborateHouseCallback, this, std::placeholders::_1 ));
    backEnd->process_event( OnActivate{} );
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData &_aid ) {
    // Debug control panel using imgui
#ifdef _USE_IMGUI_
    ImGui::Begin( "Favourites" );
    std::vector<std::string> filenames = {
            "/Users/Dado/Documents/sixthview-code/data/floorplans/kingston_palace.jpg",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt1.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt1min.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt2.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt3.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt4.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt4-full.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse-apt5.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/visionhouse2-section.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/test_lightingpw.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/springfield_court.png",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/canbury_park_road.jpg",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/riverstone_court.jpg",
            "/Users/Dado/Documents/sixthview-code/data/floorplans/royalqyarter.png",
    };
    for ( const auto &fn : filenames ) {
        if ( ImGui::Button( getFileNameOnly( fn ).c_str())) {
            rsg.RR().clearTargets();
            rsg.RR().clearBucket( CommandBufferLimits::UnsortedStart );
            elaborateHouse( fn );
        }
    }
    ImGui::End();

    ImGui::Begin( "Tweaker" );
    if ( ImGui::Button( "2d" )) {
        set2dMode();
    }
    if ( ImGui::Button( "3d" )) {
        set3dMode();
    }
    if ( ImGui::Button( "Publish" )) {
        FM::writeLocalFile("./asr2bed.json", houseJson->serialize());
        Http::post( Url{ "/propertybim/5ea45ffeb06b0cfc7488ec45" }, houseJson->serialize(),
                    [this]( HttpResponeParams params ) {
                        LOGRS( "Published" );
                    } );
    }

////    ImGui::InputScalar("minWallPixelWidth", ImGuiDataType_U64, &hmbBSData.minWallPixelWidth);
////    ImGui::InputScalar("maxWallPixelWidth", ImGuiDataType_U64, &hmbBSData.maxWallPixelWidth);
//    ImGui::InputScalar("mainWallStrategyIndex", ImGuiDataType_S32, &hmbBSData.mainWallStrategyIndex);
//    ImGui::InputScalar("RooomScore", ImGuiDataType_Float, &hmbBSData.roomScore);
    ImGui::End();

#endif

    rsg.UI().updateAnim();
    asg.update();
}
