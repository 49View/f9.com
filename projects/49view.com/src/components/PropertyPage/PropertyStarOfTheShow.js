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
import WasmCanvas from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
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
  let canvasContainer = React.useRef(null);
  const wasmDispatcher = null;//useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  return (
    <PropertyStarOfTheShowDiv>
      <PropertyCanvas ref={canvasContainer}>
        <WasmCanvas
          wasmName='../editor'
          dispatcher={wasmDispatcher}
          canvasContainer={canvasContainer.current}
          initialRect={{top: 0, left: 0, width: 0, height: 0}}
          initialVisibility={false}
          borderRadius={"5px"}
          border={"1px solid var(--middle-grey-color)"}
          argumentList={wasmArgumentList}
          mandatoryWebGLVersionSupporNumber="webgl2"
        />
      </PropertyCanvas>
      <PropertyRightMenu>
        <PropertyMarketedBy>
          <Flex justifyContent={"center"}>
            <div>
              <PropertyManagingEstateAgent src={`https://localhost/media/${property.estateAgent.logo}`}/>
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
