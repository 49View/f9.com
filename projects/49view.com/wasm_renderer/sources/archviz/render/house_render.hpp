//
// Created by Dado on 22/10/2019.
//

#pragma once

#include <core/resources/resource_types.hpp>
#include <graphics/ghtypes.hpp>

class SceneGraph;
class HouseRenderContainer;
class Renderer;
struct HouseBSData;

class HouseRenderContainer {
public:
    std::vector<GeomSP> wallsGB;
    std::vector<GeomSP> covingGB;
    std::vector<GeomSP> skirtingGB;
    std::vector<GeomSP> windowsGB;
    std::vector<GeomSP> doorsGB;
    std::vector<GeomSP> furnituresGB;
    GeomSP floor;
    GeomSP ceiling;
};

namespace HouseRender {
    void make2dGeometry( Renderer& rr, SceneGraph& sg, const HouseBSData *mData, Use2dDebugRendering bDrawDebug = Use2dDebugRendering::False );
    HouseRenderContainer make3dGeometry( SceneGraph& sg, const HouseBSData* mData );
}


