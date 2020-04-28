//
//  window_render.hpp
//  sixthmaker
//
//  Created by Dado on 19/03/2017.
//
//

#pragma once

#include "../models/house_bsdata.hpp"
#include <core/resources/resource_types.hpp>

struct WindowBSData;
class SceneGraph;
class Renderer;
enum class Use2dDebugRendering;

namespace WindowRender {
    void make2dGeometry( Renderer& rr, SceneGraph& sg, const WindowBSData *data, Use2dDebugRendering bDrawDebug );
    GeomSPContainer make3dGeometry( SceneGraph& sg, WindowBSData* mData );
};
