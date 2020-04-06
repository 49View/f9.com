import React, {useGlobal} from "reactn";
import "./Property.css";
import {PropertyLayout} from "./PropertyLayout";
import styled, {keyframes} from "styled-components";
import {
  EstateAgentRep, EstateAgentRepAssistingText, EstateAgentRepIcon, EstateAgentRepMainNameTitle,
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
  LightColorTextSpanBold, LightTextSpan
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import WasmCanvas, {ReactWasm} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";

export const Property = () => {

  let canvasContainer = React.useRef(null);
  const wasmDispatcher = useGlobal(ReactWasm);
  const wwwPrefixToAvoidSSLMadness = process.env.REACT_APP_EH_CLOUD_HOST === 'localhost' ? "" : "www.";
  let wasmArgumentList = [`hostname=${wwwPrefixToAvoidSSLMadness}${process.env.REACT_APP_EH_CLOUD_HOST}`];

  const transformAnimFuncString = (x, y) => {
    return `transform: translate(${x * 100.0}%, ${y * 100.0}%)`;
  };

  const transformAnimFunc = (menuIndex, velocity, depthPect) => {
    return keyframes`
    from {
      ${transformAnimFuncString((menuIndex + -velocity) * depthPect, 0)}
    }
    to {
      ${transformAnimFuncString(menuIndex * depthPect, 0)}
    }`;
  };

  const menuDepth = 3;
  const menuDepthOver = 1.0 / menuDepth;
  const menuItemPadding = 15;
  const anim = transformAnimFunc(
    0,
    1,
    -menuDepthOver
  );

  const ResultContainer = styled.div`
    width: calc(${menuDepth * 100.0}% + ${menuItemPadding * menuDepth}px);
    overflow: hidden;
    float: left;
    animation: ${anim} 1.5s ease-in-out 0s 1 normal forwards;
  `;

  const ResultContainerItem = styled.div`
    width: calc( ${menuDepthOver * 100.0}% - ${menuItemPadding}px );
    overflow: hidden;
    float: left;
    margin-right: ${menuItemPadding}px;
  }`;

  const a49ResultContent = (
    <ResultContainer>
    </ResultContainer>
  );

  const sendCommandScripts = ev => {
    let command = "";
    const commandTime = "change time ";
    const commandFloor = "change floor ";
    const commandPaintWalls = "paint walls ";
    const commandTimeLUAStart = "rr.changeTime('";
    const commandFloorLUAStart = "rr.changeMaterialFor(8, '";
    const commandWallPaintLUAStart = "rr.changeColorFor(2, ";
    const commandLUAEnd = "')";
    const commandLUAEndNoQuote = ")";
    if (ev.includes(commandTime)) {
      command =
        commandTimeLUAStart +
        ev.substr(commandTime.length, ev.length) +
        commandLUAEnd;
    } else if (ev.includes(commandFloor)) {
      command =
        commandFloorLUAStart +
        ev.substr(commandFloor.length, ev.length) +
        commandLUAEnd;
    } else if (ev.includes(commandPaintWalls)) {
      command =
        commandWallPaintLUAStart +
        ev.substr(commandPaintWalls.length, ev.length) +
        commandLUAEndNoQuote;
    }
    if (command !== "") {
      console.log(command);
      // sendScript(command);
    }
  };

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
