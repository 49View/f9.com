import React from "reactn";
import {
  EstateAgentRepAssistingText,
  EstateAgentRepDiv,
  EstateAgentRepIcon,
  EstateAgentRepMainNameTitle,
  PropertyCanvas,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertySmallMapContainer,
  PropertyStarOfTheShowDiv,
  PropertyVirtualBooking
} from "./Property.styled";
import {useWasmContext} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import {
  AvatarRound,
  BadgeGroupVertical,
  Flex,
  HR,
  InfoTextSpanBold,
  LightColorTextSpan,
  LightColorTextSpanBold,
  Text
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import VideoPhoneChat from "../../futuremodules/webrtc/components/VideoPhoneChat";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {getPropertyLngLat} from "./PropertyLogic";

export const EstateAgentRep = ({property}) => {
  return (
    <EstateAgentRepDiv>
      <EstateAgentRepIcon>
        <AvatarRound src={"/dado3.png"}/>
      </EstateAgentRepIcon>
      <EstateAgentRepMainNameTitle>
        <LightColorTextSpanBold>
          Dado,
        </LightColorTextSpanBold>
        <InfoTextSpanBold fontSize={"smaller"}>
          {" "}the big cheese
        </InfoTextSpanBold>
      </EstateAgentRepMainNameTitle>
      <EstateAgentRepAssistingText fontSize={"0.75rem"}>
        is looking after this property
      </EstateAgentRepAssistingText>
    </EstateAgentRepDiv>
  )
}

export const PropertyStarOfTheShow = ({property}) => {
  let canvasContainer = useWasmContext(true);

  return (
    <PropertyStarOfTheShowDiv>
      <PropertyCanvas ref={canvasContainer}>
      </PropertyCanvas>
      <PropertyRightMenu>
        <PropertyMarketedBy>
          <Flex justifyContent={"center"}>
            <div>
              <PropertyManagingEstateAgent src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/${property.estateAgent.logo}`}/>
            </div>
          </Flex>
        </PropertyMarketedBy>
        <BadgeGroupVertical height={"70px"} alignItems={"center"} padding={"10px 0"} lineHeight={"1.2"} margin={"5px"}>
          <LightColorTextSpan fontSize={"var(--font-size-onemedium)"}>{property.estateAgent.name}</LightColorTextSpan>
          <Text bold color={"var(--logo-color-1)"}
                fontSize={"var(--font-size-normal)"}>{property.estateAgent.branch}</Text>
          <Text color={"var(--warning)"} fontSize={"var(--font-size-small)"}>{property.estateAgent.address}</Text>
        </BadgeGroupVertical>
        <PropertyVirtualBooking>
          {/*<EstateAgentRep/>*/}
          <VideoPhoneChat/>
        </PropertyVirtualBooking>
        <HR margin={"10px"}/>
        <PropertySmallMapContainer>
          <MapContainer id={"smallMapID"} center={getPropertyLngLat(property)} zoom={14} scrollWheelZoom={true}>
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
        </PropertySmallMapContainer>
      </PropertyRightMenu>
    </PropertyStarOfTheShowDiv>
  )
}
