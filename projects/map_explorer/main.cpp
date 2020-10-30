#include "sources/map_explorer.h"

#include <poly/osm/osm_orchestrator.hpp>
#include <render_scene_graph/event_horizon.h>

int main( int argc, char *argv[] ) {

    EventHorizon<MapExplorer> ev{ argc, argv };

    return 0;
}

