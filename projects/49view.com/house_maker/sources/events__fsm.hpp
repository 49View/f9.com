//
// Created by dado on 04/06/2020.
//

#pragma once

struct OnActivateEvent {};
struct OnAltPressedEvent {};
struct OnClearEvent {};
struct OnDoubleTapEvent {};
struct OnUndoEvent {};

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
};

struct OnFinaliseEvent {};
struct OnEscapeEvent {};
struct OnDeleteEvent {};
