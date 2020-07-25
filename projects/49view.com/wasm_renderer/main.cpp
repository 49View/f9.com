#include "sources/wasm_renderer.h"

#include <eh_arch/controller/arch_render_controller.hpp>
#include <eh_arch/controller/arch_explorer.hpp>
#include <render_scene_graph/event_horizon.h>

int main( int argc, char *argv[] ) {

    EventHorizon<Showcaser> ev{ argc, argv };

    return 0;
}

