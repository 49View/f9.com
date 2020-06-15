//
// Created by dado on 04/06/2020.
//

#pragma once

#include <core/math/vector2f.h>

struct OnActivateEvent {
    std::function<void()> ccf = nullptr;
};
struct OnAltPressedEvent {};
struct OnClearEvent {};
struct OnDoubleTapEvent {};
struct OnUndoEvent {};
struct OnMakeHouse3dEvent {};

struct OnHouseMakerToggleEvent{};
struct OnBrowser3dToggleEvent{};
struct OnBrowserTopDown3dToggleEvent{};
struct OnBrowserDollyHouseToggleEvent{};

struct OnFirstTimeTouchDownEvent {
    V2f mousePos{V2fc::HUGE_VALUE_NEG};
};
struct OnFirstTimeTouchDownViewportSpaceEvent {
    V2f viewportPos{V2fc::HUGE_VALUE_NEG};
};

struct OnTouchMoveEvent{
    V2f mousePos{V2fc::HUGE_VALUE_NEG};
};
struct OnTouchMoveViewportSpaceEvent {
    V2f viewportPos{V2fc::HUGE_VALUE_NEG};
};

struct OnTouchUpEvent {
    V2f mousePos{V2fc::HUGE_VALUE_NEG};
};
struct OnTouchUpViewportSpaceEvent {
    V2f viewportPos{V2fc::HUGE_VALUE_NEG};
};

struct OnKeyToggleEvent{
    int keyCode = 0;
    V2f viewportPos{V2fc::HUGE_VALUE_NEG};
};

struct OnFinaliseEvent {};
struct OnEscapeEvent {};
struct OnSpaceEvent {};
struct OnSpecialSpaceEvent {};
struct OnDeleteEvent {};
struct OnGlobalRescaleEvent {
    float oldScaleFactor = 1.0f;
    float currentScaleFactorMeters = 1.0f;
};