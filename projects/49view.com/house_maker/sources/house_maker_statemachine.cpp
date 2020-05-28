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

void HouseMakerStateMachine::elaborateHouseBitmap() {
    houseJson = HouseMakerBitmap::make( hmbBSData, sourceImages );
    HouseService::guessFittings( houseJson.get(), furnitureMap );
    ShowHouseMatrix houseMode = ShowHouseMatrixFlags::Show3dFloorPlan|ShowHouseMatrixFlags::UseDebugMode;
    asg.showHouse( houseJson, houseMode );
}

void HouseMakerStateMachine::updateHMB() {
    sourceImages = HouseMakerBitmap::prepareImages(hmbBSData);

    auto sourceBim = sg.get<RawImage>(hmbBSData.filename+"_bin");
    if ( sourceBim ) {
        memcpy(sourceBim->data(), sourceImages.sourceFileImageBin.data, sourceBim->size());
        sg.updateRawImage(hmbBSData.filename+"_bin");

    } else {
        auto sourceBinParams = getImageParamsFromMat(sourceImages.sourceFileImageBin);
        auto sourceBinImage = RawImage{sourceBinParams.width, sourceBinParams.height, sourceBinParams.channels, sourceImages.sourceFileImageBin.data};
        sg.addRawImageIM(hmbBSData.filename+"_bin", sourceBinImage);
    }
};

void HouseMakerStateMachine::elaborateHouseCallback( std::vector<std::string> &_paths ) {
    if ( _paths.empty()) return;
    rsg.RR().clearTargets();
    rsg.RR().clearBucket( CommandBufferLimits::UnsortedStart );
    rsg.RR().clearBucket( CommandBufferLimits::UI2dStart );
    rsg.RR().clearBucket( CommandBufferLimits::PBRStart );

    hmbBSData = HMBBSData{ getFileNameOnly( _paths[0] ), RawImage{ FM::readLocalFileC( _paths[0] ) }};
    sg.addRawImageIM(hmbBSData.filename, hmbBSData.image);

    updateHMB();

    _paths.clear();
}

void HouseMakerStateMachine::set2dMode( const V3f& pos ) {
    rsg.setRigCameraController(CameraControlType::Edit2d);
    Timeline::play( rsg.DC()->QAngleAnim(), 0,
                    KeyFramePair{ 0.1f, quatCompose( V3f{ M_PI_2, 0.0f, 0.0f } ) } );
    Timeline::play( rsg.DC()->PosAnim(), 0, KeyFramePair{ 0.1f, pos} );
    rsg.useSkybox( false );
}

void HouseMakerStateMachine::set3dMode() {
    rsg.setRigCameraController(CameraControlType::Walk);
    if ( houseJson ) {
        Timeline::play( rsg.DC()->QAngleAnim(), 0,
                        KeyFramePair{ 0.1f, quatCompose( V3f{ 0.0f, 0.0f, 0.0f } ) } );
        Timeline::play( rsg.DC()->PosAnim(), 0,
                        KeyFramePair{ 0.1f, V3f{ houseJson->center.x(), 1.45f, houseJson->center.y() }} );
    }
    rsg.useSkybox( true );
}

void HouseMakerStateMachine::activatePostLoad() {

    RoomServiceFurniture::addDefaultFurnitureSet("uk_default");
    Http::get( Url{ "/furnitureset/uk_default" }, [&, this]( HttpResponeParams &res ) {
        FurnitureSetContainer fset{ res.bufferString };
        for ( const auto &f : fset.set ) {
            furnitureMap.addIndex(f);
        }
    } );

    rsg.RR().createGrid( CommandBufferLimits::UnsortedStart, 1.0f, ( Color4f::PASTEL_GRAYLIGHT ).A( 0.35f ),
                           ( Color4f::PASTEL_GRAYLIGHT ).A( 0.25f ), V2f{ 15.0f }, 0.015f );
    rsg.createSkybox( SkyBoxInitParams{ SkyBoxMode::CubeProcedural } );
    rsg.changeTime( "summer 14:00" );

    rsg.useSkybox( true );
    rsg.RR().useVignette( true );
    rsg.RR().useFilmGrain( true );
    rsg.RR().useBloom( false );
    rsg.useSSAO( true );

    luaFunctionsSetup();

//    elaborateHouse( "/home/dado/Downloads/halterA7-11.png" );
//    elaborateHouse( "/home/dado/Pictures/halterA7-11.png" );
//    elaborateHouse( "/home/dado/Pictures/vision_house_apt1_big.png" );

    set2dMode(V3f::UP_AXIS*5.0f);

    rsg.setDragAndDropFunction( std::bind(&HouseMakerStateMachine::elaborateHouseCallback, this, std::placeholders::_1 ));
    backEnd->process_event( OnActivate{} );
}

void HouseMakerStateMachine::updateImpl( const AggregatedInputData &_aid ) {
    // Debug control panel using imgui
#ifdef _USE_IMGUI_

    ImGui::Begin( "Control" );
    if ( ImGui::SliderFloat("Contrast", &hmbBSData.sourceContrast, 0.0f, 20.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("Brightness", &hmbBSData.sourceBrightness, 0.0f, 255.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("Gaussian", &hmbBSData.sourceGuassian, 1.0f, 5.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderInt("Gaussian Sigma", &hmbBSData.sourceGuassianSigma, 1, 21) ) {
        if ( !isOdd(hmbBSData.sourceGuassianSigma) ) hmbBSData.sourceGuassianSigma++;
        updateHMB();
    }
    if ( ImGui::SliderFloat("Gaussian Beta", &hmbBSData.sourceGuassianBeta, -5.0f, 5.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("minBinThreshold", &hmbBSData.minBinThreshold, 0.0f, 255.0f) ) {
        updateHMB();
    }
    if ( ImGui::SliderFloat("maxBinThreshold", &hmbBSData.maxBinThreshold, 0.0f, 255.0f) ) {
        updateHMB();
    }
    if ( ImGui::Button( "Elaborate" )) {
        elaborateHouseBitmap();
    }
    if ( ImGui::Button( "2d" )) {
        auto pos = houseJson ? V3f{ houseJson->center.x(), 5.0f, houseJson->center.y() } : V3f::UP_AXIS*5.0f;
        set2dMode(pos);
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
    ImGui::End();

    ImGui::Begin( "SourceImages" );
    ImGui::Text("Source");
    if ( !hmbBSData.filename.empty() ) {
        float tSize = 1000.0f;
        auto tex = rsg.RR().TM()->get(hmbBSData.filename);
        auto ar = tex->getAspectRatioVector();
        ImGui::Image(reinterpret_cast<ImTextureID*>(tex->getHandle()), ImVec2{tSize, tSize/ar.y()});

        auto texBin = rsg.RR().TM()->get(hmbBSData.filename+"_bin");
        ImGui::Image(reinterpret_cast<ImTextureID*>(texBin->getHandle()), ImVec2{tSize, tSize/ar.y()});
    }
    ImGui::End();


////    ImGui::InputScalar("minWallPixelWidth", ImGuiDataType_U64, &hmbBSData.minWallPixelWidth);
////    ImGui::InputScalar("maxWallPixelWidth", ImGuiDataType_U64, &hmbBSData.maxWallPixelWidth);
//    ImGui::InputScalar("mainWallStrategyIndex", ImGuiDataType_S32, &hmbBSData.mainWallStrategyIndex);
//    ImGui::InputScalar("RooomScore", ImGuiDataType_Float, &hmbBSData.roomScore);

#endif

    rsg.UI().updateAnim();
    asg.update();
}
