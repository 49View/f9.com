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


ArchVizBackEnd::ArchVizBackEnd( SceneGraph &_sg, RenderOrchestrator &_rsg, ArchSceneGraph &_asg, ArchService &_as ) :
        RunLoopBackEndBase( _sg, _rsg ),
        ScenePreLoader( _sg, _rsg ),
        asg( _asg ), as( _as ) {
    backEnd = std::make_unique<FrontEnd>( *this, _sg, _rsg );
}

void ArchVizBackEnd::activateImpl() {
    loadSceneEntities();
}

void ArchVizBackEnd::luaFunctionsSetup() {
    const std::string avKey = "av";
    rsg.addLuaFunction( avKey, "floorPlanView", [&]() {
        uint64_t frameSkipper = 2;
        Timeline::play( rsg.DC()->PosAnim(), frameSkipper, KeyFramePair{ 2.0f, V3f{ 0.0f, 6.5f, 0.0f }} );
        Timeline::play( rsg.DC()->QAngleAnim(), frameSkipper,
                        KeyFramePair{ 2.0f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
        rsg.setRigCameraController<CameraControl2d>();
        rsg.useSkybox( false );
        rsg.RR().changeMaterialAlphaOnTags( ArchType::CeilingT, 0.0f );
    } );

    rsg.addLuaFunction( avKey, "walkingView", [&]() {
        uint64_t frameSkipper = 2;
        Timeline::play( rsg.DC()->PosAnim(), frameSkipper, KeyFramePair{ 2.0f, V3f{ 0.0f, 1.5f, 0.0f }} );
        Timeline::play( rsg.DC()->QAngleAnim(), frameSkipper,
                        KeyFramePair{ 2.0f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
        rsg.setRigCameraController<CameraControlWalk>();
        rsg.useSkybox( true );
        rsg.RR().changeMaterialAlphaOnTags( ArchType::CeilingT, 1.0 );
    } );
}

void ArchVizBackEnd::loadHouseFromRemote( const std::string &_pid ) {
    Http::get( Url{ "/propertybim/" + _pid }, [this]( HttpResponeParams params ) {
        auto house = std::make_shared<HouseBSData>( params.bufferString );
        callbackStream = std::make_pair( house, true );
    } );
}

void ArchVizBackEnd::loadHouse( const std::string &_filename ) {

    auto data = FM::readLocalFileC( _filename );
    RawImage houseImage{ data };
    auto resImageName = getFileNameOnly( _filename );
    sg.addRawImageIM( "urca", houseImage );

    hmbBSData = HMBBSData{};
    houseJson = HouseMakerBitmap::make( houseImage, hmbBSData, resImageName );

//    FM::writeLocalFile("ucarca", houseJson->serialize());
}

void ArchVizBackEnd::showHouse() {

//    houseJson->defaultSkybox = "barcelona";
    auto mat = Matrix4f::IDENTITY;
    mat.scale( 1.0f / 25.0f );
    HouseRender::make2dGeometry( rsg.RR(), sg, houseJson.get(), RDSPreMult( mat ), Use2dDebugRendering::False );
    rsg.setRigCameraController<CameraControl2d>();
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() }} );

    as.loadHouse( *houseJson );
    rsg.setRigCameraController<CameraControlWalk>();
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.6f, houseJson->center.y() }} );
}

void ArchVizBackEnd::loadHouseCallback( std::vector<std::string> &_paths ) {
    if ( _paths.empty()) return;
    rsg.RR().clearTargets();
    rsg.RR().clearBucket( CommandBufferLimits::UnsortedStart );
    loadHouse( _paths[0] );
    showHouse();
    _paths.clear();
}

void ArchVizBackEnd::activatePostLoad() {

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

    rsg.setRigCameraController<CameraControl2d>();
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0,
                    KeyFramePair{ 0.1f, V3f::UP_AXIS * 5.0f } );

//    loadHouseFromRemote("5ea45ffeb06b0cfc7488ec45");
//    loadHouse();
//    auto hj = FM::readLocalFileC("ucarca");
//    houseJson = std::make_shared<HouseBSData>(hj);
//    Http::post(Url{"/propertybim/5ea45ffeb06b0cfc7488ec45"}, hj);
//    showHouse();

//    Http::get(Url{"/propertybim/5ea45ffeb06b0cfc7488ec45"}, [this](HttpResponeParams params) {
//        houseJson = std::make_shared<HouseBSData>(params.bufferString);
//        showHouse();
//    });

    rsg.setDragAndDropFunction( std::bind( &ArchVizBackEnd::loadHouseCallback, this, std::placeholders::_1 ));
    backEnd->process_event( OnActivate{} );
}

void ArchVizBackEnd::consumeCallbacks() {
    if ( callbackStream.second ) {
        houseJson = callbackStream.first;
        showHouse();
        callbackStream.second = false;
    }
}

void ArchVizBackEnd::updateImpl( const AggregatedInputData &_aid ) {
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
            loadHouse( fn );
        }
    }
    ImGui::End();

    ImGui::Begin( "Tweaker" );
    if ( ImGui::Button( "2d" )) {
        rsg.setRigCameraController<CameraControl2d>();
        rsg.RR().showBucket( CommandBufferLimits::UnsortedStart, true );
        Timeline::play( rsg.DC()->QAngleAnim(), 0,
                        KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
        Timeline::play( rsg.DC()->PosAnim(), 0,
                        KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() }} );
    }
    if ( ImGui::Button( "3d" )) {
        as.loadHouse( *houseJson );
        rsg.RR().showBucket( CommandBufferLimits::UnsortedStart, false );
        rsg.setRigCameraController<CameraControlWalk>();
        Timeline::play( rsg.DC()->QAngleAnim(), 0,
                        KeyFramePair{ 0.1f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
        Timeline::play( rsg.DC()->PosAnim(), 0,
                        KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.6f, houseJson->center.y() }} );
    }
    if ( ImGui::Button( "Publish" )) {
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
    consumeCallbacks();
}
