import React from "react";
import "./Property.css";
import {PropertyLayout} from "./PropertyLayout";
import styled, {keyframes} from "styled-components";
import {
  PropertyCanvas,
  PropertyContainer,
  PropertyManagingEstateAgent,
  PropertyMarketedBy,
  PropertyRightMenu,
  PropertyStarOfTheShow,
  PropertyVirtualBooking, PropertyVirtualBookingCharCallVideo, PropertyVirtualBookingFooter,
  PropertyVirtualBookingTitle
} from "./Property.styled";
import {Button, ButtonGroup} from "react-bootstrap";
import {AvatarRound} from "../common.styled";

export const Property = () => {
  let canvasContainer = React.useRef(null);
  // const commandLine = useSelector(state => state.command);

  console.log("Property.js redraw");

  const topSideEntry = elem => {
    return (
      <div>
        <div className="a49view-magic-selector-mainIcon">
          <i className={elem.icon}/>
        </div>
        <div className="a49view-magic-selector-mainText"> {elem.text}</div>
        <div className="a49view-magic-selector-arrow">
          <i className="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
    );
  };

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
      {/*<div className="a49view-magic">*/}
      {/*  <div className="a49view-makeyourown-tag">*/}
      {/*    Your Home, <b>Your Way</b>, <i>Now</i>.*/}
      {/*  </div>*/}
      {/*  <div className="a49view-magic-inputbar">*/}
      {/*    <input*/}
      {/*      className="search-bar a49view-magic"*/}
      {/*      type="text"*/}
      {/*      id="search-bar"*/}
      {/*      placeholder="I would like to..."*/}
      {/*      onKeyUp={async e => {*/}
      {/*        if (e.keyCode === 13) {*/}
      {/*          e.preventDefault();*/}
      {/*          sendCommandScripts(e.target.value);*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    ></input>*/}
      {/*  </div>*/}
      {/*  <div className="a49view-magic-inputbaricon">*/}
      {/*    <img src="/49view_logo_round_floor.svg" alt="" />*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="a49view-magic-result">{a49ResultContent}</div>*/}
      <PropertyLayout/>
      <PropertyStarOfTheShow>
        <PropertyCanvas/>
        <PropertyRightMenu>
          <PropertyMarketedBy>
            Brought to you by:
          </PropertyMarketedBy>
          <PropertyManagingEstateAgent src={"/andrew-scott-robertson-logo.png"} width={"244"} height={"72"}/>
          <PropertyVirtualBooking>
            <PropertyVirtualBookingTitle>
              Real time virtual viewing
            </PropertyVirtualBookingTitle>
            <AvatarRound src={"/dado.png"}/>
            <PropertyVirtualBookingCharCallVideo>
              <ButtonGroup aria-label="">
                <Button variant="primary"><i className={"fas fa-comments"}/>{" "}chat</Button>
                <Button variant="info"><i className={"fas fa-phone-alt"}/>{" "}phone</Button>
                <Button variant="success"><i className={"fas fa-video"}/>{" "}video</Button>
              </ButtonGroup>
            </PropertyVirtualBookingCharCallVideo>
            <PropertyVirtualBookingFooter>
              Booking for a viewing is a thing of the past! Give real time virtual viewing a shot.
            </PropertyVirtualBookingFooter>
          </PropertyVirtualBooking>
        </PropertyRightMenu>
      </PropertyStarOfTheShow>
    </PropertyContainer>
  );
};
