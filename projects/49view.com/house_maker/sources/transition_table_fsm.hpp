//
// Created by dado on 04/06/2020.
//

#pragma once

#include <core/state_machine_helper.hpp>
#include "events__fsm.hpp"
#include "actions__fsm.hpp"

// State machine Front End
struct FrontEndStateMachineSML {
    auto operator()() const noexcept {
        return make_transition_table(
            *state<class Initial> + event<OnActivateEvent> / InitializeHouseMaker{} = state<class HouseMaker>

            ,state<class HouseMaker> + event<OnAltPressedEvent> / []{} = state<class Bespoke>
            ,state<class HouseMaker> + event<OnGlobalRescaleEvent> / GlobalRescale{}
            ,state<class HouseMaker> + event<OnClearEvent> / ClearEverthing{}
            ,state<class HouseMaker> + event<OnHouseMakerToggleEvent> / ActivateHouseMaker{}
            ,state<class HouseMaker> + event<OnLoadFloorPlanEvent> / LoadFloorPlan{}
            ,state<class HouseMaker> + event<OnCreateNewPropertyFromFloorplanImageEvent> / CreateNewPropertyFromFloorplanImage{}
            ,state<class HouseMaker> + event<OnUpdateHMBEvent> / UpdateHMB{}
            ,state<class HouseMaker> + event<OnMakeHouse3dEvent> / MakeHouse3d{}
            ,state<class HouseMaker> + event<OnImportExcaliburLinkEvent> / ImportExcaliburLink{}
            ,state<class HouseMaker> + event<OnCreateHouseTexturesEvent> / CreateHouseTextures{}
            ,state<class HouseMaker> + event<OnElaborateHouseBitmapEvent> / ElaborateHouseBitmap{}
            ,state<class HouseMaker> + event<OnRecalculateFurnitureEvent> / FurnishHouse{}
            ,state<class HouseMaker> + event<OnBrowserTopDown3dToggleEvent> / ActivateHouseMakerWithTopDown3d{}
            ,state<class HouseMaker> + event<OnBrowser3dToggleEvent> / ActivateBrowsing3d{} = state<class Browsing3d>
            ,state<class HouseMaker> + event<OnBrowserDollyHouseToggleEvent> / ActivateBrowsingDollyHouse{} = state<class BrowsingDollyHouse>
            ,state<class HouseMaker> + event<OnKeyToggleEvent> / KeyToggleHouseMaker{}
            ,state<class HouseMaker> + event<OnFirstTimeTouchDownViewportSpaceEvent>[TouchedDownFirstTimeFeatureManipulationGuard{}] / EnterFeatureManipulation{} = state<class FeatureManipulation>

            ,state<class Browsing3d> + event<OnBrowserTopDown3dToggleEvent> / ActivateHouseMakerWithTopDown3d{} = state<class HouseMaker>
            ,state<class Browsing3d> + event<OnHouseMakerToggleEvent> / ActivateHouseMaker{} = state<class HouseMaker>
            ,state<class Browsing3d> + event<OnBrowserDollyHouseToggleEvent> / ActivateBrowsingDollyHouse{} = state<class BrowsingDollyHouse>
            ,state<class Browsing3d> + event<OnWhichRoomAmIEvent> / WhichRoomAmI{}
            ,state<class Browsing3d> + event<OnLoadFloorPlanEvent> / LoadFloorPlan{}
            ,state<class Browsing3d> + event<OnMakeHouse3dEvent> / MakeHouse3d{}
            ,state<class Browsing3d> + event<OnElaborateHouseBitmapEvent> / ElaborateHouseBitmap{}
            ,state<class Browsing3d> + event<OnRecalculateFurnitureEvent> / FurnishHouse{}

            ,state<class BrowsingDollyHouse> + event<OnBrowserTopDown3dToggleEvent> / ActivateHouseMakerWithTopDown3d{} = state<class HouseMaker>
            ,state<class BrowsingDollyHouse> + event<OnHouseMakerToggleEvent> / ActivateHouseMaker{} = state<class HouseMaker>
            ,state<class BrowsingDollyHouse> + event<OnBrowser3dToggleEvent> / ActivateBrowsing3d{} = state<class Browsing3d>
            ,state<class BrowsingDollyHouse> + event<OnLoadFloorPlanEvent> / LoadFloorPlan{}
            ,state<class BrowsingDollyHouse> + event<OnMakeHouse3dEvent> / MakeHouse3d{}
            ,state<class BrowsingDollyHouse> + event<OnElaborateHouseBitmapEvent> / ElaborateHouseBitmap{}
            ,state<class BrowsingDollyHouse> + event<OnRecalculateFurnitureEvent> / FurnishHouse{}

            ,state<class Bespoke> + event<OnUndoEvent> / UndoBespoke{}
            ,state<class Bespoke> + event<OnClearEvent> / ClearBespoke{}
            ,state<class Bespoke> + event<OnTouchMoveEvent> / TouchMoveBespoke{}
            ,state<class Bespoke> + event<OnTouchUpEvent> / TouchUpEventBespoke{}
            ,state<class Bespoke> + event<OnKeyToggleEvent> / KeyToggleBespoke{}
            ,state<class Bespoke> + event<OnFinaliseEvent> / FinaliseBespoke{} = state<class HouseMaker>
            ,state<class Bespoke> + event<OnEscapeEvent> / ExitBespoke{} = state<class HouseMaker>
            ,state<class Bespoke> + event<OnLoadFloorPlanEvent> / LoadFloorPlan{}
            ,state<class Bespoke> + event<OnMakeHouse3dEvent> / MakeHouse3d{}
            ,state<class Bespoke> + event<OnElaborateHouseBitmapEvent> / ElaborateHouseBitmap{}
            ,state<class Bespoke> + event<OnRecalculateFurnitureEvent> / FurnishHouse{}

            ,state<class FeatureManipulation> + event<OnTouchMoveViewportSpaceEvent>[TouchMoveFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnKeyToggleEvent>[KeyToggleFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnSpaceEvent>[SpaceToggleFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnSpecialSpaceEvent>[SpecialSpaceToggleFeatureManipulation{}] / UpdateFeatureManipulation{}
            ,state<class FeatureManipulation> + event<OnDeleteEvent>[DeleteFeatureManipulation{}] / ExitFeatureManipulation{} = state<class HouseMaker>
            ,state<class FeatureManipulation> + event<OnTouchUpViewportSpaceEvent>[TouchUpEventFeatureManipulation{}] / ExitFeatureManipulation{} = state<class HouseMaker>
            ,state<class FeatureManipulation> + event<OnLoadFloorPlanEvent> / LoadFloorPlan{}
            ,state<class FeatureManipulation> + event<OnMakeHouse3dEvent> / MakeHouse3d{}
            ,state<class FeatureManipulation> + event<OnElaborateHouseBitmapEvent> / ElaborateHouseBitmap{}
            ,state<class FeatureManipulation> + event<OnRecalculateFurnitureEvent> / FurnishHouse{}
        );
    }
};
