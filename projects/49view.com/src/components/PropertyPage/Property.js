import React, {useGlobal} from "reactn";
import "./Property.css";
import {PropertyLayout} from "./PropertyLayout";
import {
  EstateAgentRep,
  EstateAgentRepAssistingText,
  EstateAgentRepIcon,
  EstateAgentRepMainNameTitle,
  PropertyCanvas,
  PropertyContainer,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertyStarOfTheShow,
  PropertyVirtualBooking,
  PropertyVirtualBookingCharCallVideo
} from "./Property.styled";
import {Button, ButtonGroup} from "react-bootstrap";
import {
  AvatarRound,
  InfoTextSpan,
  LightColorTextSpanBold,
  LightTextSpan
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import WasmCanvas, {ReactWasm} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";

export const Property = () => {

  let canvasContainer = React.useRef(null);
  const wasmDispatcher = useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  return (
    <PropertyContainer>
      <PropertyLayout/>
      <PropertyStarOfTheShow>
        <PropertyCanvas ref={canvasContainer}>
          <WasmCanvas
            wasmName='../editor'
            dispatcher={wasmDispatcher}
            canvasContainer={canvasContainer.current}
            initialRect={{top: 0, left: 0, width: 0, height: 0}}
            initialVisibility={false}
            argumentList={wasmArgumentList}
            mandatoryWebGLVersionSupporNumber="webgl2"
          />
        </PropertyCanvas>
        <PropertyRightMenu>
          <PropertyMarketedBy>
            <PropertyManagingEstateAgent src={"/andrew-scott-robertson-logo.png"} width={"244"} height={"72"}/>
            <PropertyVirtualBooking>
              <EstateAgentRep>
                <EstateAgentRepIcon>
                  <AvatarRound src={"/dado3.png"}/>
                </EstateAgentRepIcon>
                <EstateAgentRepMainNameTitle>
                  <LightColorTextSpanBold>
                    Dado,
                  </LightColorTextSpanBold>
                  <InfoTextSpan fontSize={"smaller"}>
                    {" "}the big cheese
                  </InfoTextSpan>
                </EstateAgentRepMainNameTitle>
                <EstateAgentRepAssistingText>
                  <LightTextSpan fontSize={"0.6rem"}>
                  is looking after this property
                  </LightTextSpan>
                </EstateAgentRepAssistingText>
              </EstateAgentRep>
              <PropertyVirtualBookingCharCallVideo>
                <ButtonGroup aria-label="">
                  <Button variant="primary"><i className={"fas fa-comments"}/>{" "}chat</Button>
                  <Button variant="info"><i className={"fas fa-phone-alt"}/>{" "}phone</Button>
                  <Button variant="success"><i className={"fas fa-video"}/>{" "}video</Button>
                </ButtonGroup>
              </PropertyVirtualBookingCharCallVideo>
            </PropertyVirtualBooking>
          </PropertyMarketedBy>
        </PropertyRightMenu>
      </PropertyStarOfTheShow>
    </PropertyContainer>
  );
};
