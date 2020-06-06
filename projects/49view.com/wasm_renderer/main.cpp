#include <render_scene_graph/event_horizon.h>
#include "sources/wasm_renderer.h"

#include <eh_arch/controller/arch_render_controller.hpp>

int main( int argc, char *argv[] ) {

//    float radius = 0.5f;
//    V2f p1 = V2fc::ZERO;
//    V2f p2 = V2fc::X_AXIS*2.0f;
//    V2f center =V2f{1.6f, 0.50f};
//    float i = lineSegmentCircleIntersection(p1, p2, center, radius);
//    V2f pointOfContact = lerp(i, p1, p2);
//    LOGRS("point of contact: " << pointOfContact );
//    LOGRS("min distance: " << distance(pointOfContact, center));
//    return 0;

    EventHorizon<Showcaser> ev{ argc, argv };

    return 0;
}

