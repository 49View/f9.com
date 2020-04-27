import {PHeader, PropertyMapDiv} from "./Property.styled";
import React from "reactn";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {getPropertyLngLat} from "./PropertyLogic";

export const PropertyMaps = ({property}) => {
  return (
    <>
      <PHeader>
        Looking Around...
      </PHeader>
      <PropertyMapDiv>
        <MapContainer id={"bigMapID"} center={getPropertyLngLat(property)} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={getPropertyLngLat(property)}>
            <Popup>
              Property Location
            </Popup>
          </Marker>
        </MapContainer>
      </PropertyMapDiv>
    </>
  )
}
