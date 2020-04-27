import styled, {keyframes} from 'styled-components'
import {HR, My1, My2} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import React from "reactn";

const mainPadding = "15px";
const wasmCanvasSize = {x: "720px", y: "540px"};

export const PropertyContainer = styled.div`{
  border: 1px solid #d1d1d110;
  height: auto;
  padding: 10px ${mainPadding};
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow: hidden;
  margin-top: 20px;
}`;

export const PropertyTitleInfo = styled.div`{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}`;

export const PropertyHCaption = styled.div`{
  display: flex;
  padding: 5px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: baseline;
  background-image: linear-gradient(var(--dark), var(--dark-color-transparent) );
}`;


export const PropertyTitleType = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-lead);
}`;

export const PropertyTitlePrice = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-lead);
  color: var(--logo-color-1);
  text-shadow: 0 0 3px #000000, 0 0 5px #202020;
}`;

export const PropertyTitleRentOrBuy = styled.div`{
  font-weight: bold;
  font-size: var(--font-size-medium);
  color: var(--primary-color-light);
  padding: 5px 5px;
  border-radius: 4px;
  border: solid 1px var(--primary-color-light);
  background-image: linear-gradient(
    rgba(23, 22, 24, 0.4),
    rgba(23, 22, 24, 0.2)
  );
}`;

export const PropertyTitleInfoSecondLine = styled.div`{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--middle-grey-color);
}`;

export const PropertyTitleAddress = styled.div`{
  font-size: var(--font-size-one);
  color: var(--light);
}`;

export const PropertyTitleAddressRoad = styled.span`{
}`;

export const PropertyTitleAddressTown = styled.span`{
  font-weight: bold;
  color: var(--logo-color-1);
}`;

export const PropertyTitleAddressPostcode = styled.span`{
  font-weight: bold;
}`;

export const PropertyStarOfTheShowDiv = styled.div`{
  display: grid;
  margin-top: 20px;
  grid-gap: 10px;
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: 100%;
}`;

export const PropertyCarouselDiv = styled.div`{
  display: grid;
  height: 480px;
  grid-gap: 10px;
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: 100%;
}`;

export const PropertyCanvas = styled.div`{
  min-width: 640px;
  height: 480px;
  //border-radius: 5px;
  //border: 1px solid var(--middle-grey-color);
}`;

export const PropertyRightMenu = styled.div`{
  display: flex;
  flex-direction: column;
  border-radius:4px;
  border: solid 1px var(--info);
  background-image: linear-gradient(var(--dark-color-transparent), var(--dark-color-transparent-very) );
}`;

const chatAnimIn = keyframes`
from {
  height: 30%;
}
to {
  height: 100%;
}`;

export const PropertyMarketedBy = styled.div`{
  font-weight: bold;
  color: var(--light-color);
  background-color: white;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-left: 0.5px solid var(--info);
  border-top: 0.5px solid var(--info);
  border-right: 0.5px solid var(--info);
  animation: ${chatAnimIn} 0s ease-out;
}`;

export const PropertyManagingEstateAgent = styled.img`{
  background-color: white;
  object-fit: scale-down;
  height: 60px;
  padding: 5px;
}`;

export const PropertyVirtualBooking = styled.div`{
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}`;

export const PropertySmallMapContainer = styled.div`{
  margin: 0px 8px 8px 8px;
  border-radius: 5px;
  border: 3px solid var(--warning);
}`;


export const PropertyVirtualBookingTitle = styled.div`{
  font-size: var(--font-size-medium);
  text-align: center;
  color: var(--light-color);
  font-weight: bold;
  margin-bottom: 10px;
}`;

export const PropertyVirtualBookingFooter = styled.div`{
  font-size: var(--font-size-normal);
  font-weight: bold;
  color: var(--light);
  margin-bottom: 10px;
  margin-top: 10px;
}`;

export const PropertyVirtualBookingCharCallVideo = styled.div`{
  display: flex;
  flex-direction: column;
}`;

export const EstateAgentRepDiv = styled.div`{
  display: grid;
  grid-template-columns: 50px calc(100% - 50px - 5px);
  grid-template-rows: 50% 50%;
  grid-template-areas: "EstateAgentRepIcon EstateAgentRepMainNameTitle"
                       "EstateAgentRepIcon EstateAgentRepAssistingText";
}`;

export const EstateAgentRepIcon = styled.div`{
  grid-area: EstateAgentRepIcon;
}`;

export const EstateAgentRepMainNameTitle = styled.div`{
  grid-area: EstateAgentRepMainNameTitle;
}`;

export const EstateAgentRepAssistingText = styled.div`{
  color: var(--light);
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const PropertyDescriptionDiv = styled.div`{
  display: grid;
  height:auto;
  grid-gap: 10px;
  grid-template-columns: 30% calc(70% - 10px);
  grid-template-rows: 100%;
  border-radius: 5px;
  background-image: linear-gradient(var(--logo-color-2), var(--dark-color-transparent-text-readable) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow-y: hidden;
  overflow-x: hidden;
}`;

export const PropertyMapDiv = styled.div`{
  display: block;
  height:auto;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow-y: hidden;
  overflow-x: hidden;
}`;

export const PHeader = (props) => {
  return (
    <>
      <My2/>
      <HR/>
      <My1/>
      <PropertyHCaption>
        <PropertyTitleType>{props.children}</PropertyTitleType>
      </PropertyHCaption>
      <My1/>
    </>
  )
}
