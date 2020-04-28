#include <render_scene_graph/event_horizon.h>
#include "sources/wasm_renderer.h"

int main( int argc, char *argv[] ) {

    EventHorizon<EditorBackEnd> ev{ argc, argv };

    return 0;
}

