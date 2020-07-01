import styled, {keyframes} from 'styled-components'
import {HR, My1, My2} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import React from "reactn";

export const carouselHeight = "480px";
const mainPadding = "15px";
const sectionHeader = "48px";
const sectionFooter = "1em";
const wasmCanvasSize = {x: "720px", y: "480px"};

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
  font-size: ${props => props.small ? "var(--font-size-onemedium)" : "var(--font-size-lead)"};
}`;

export const PropertyTitlePrice = styled.div`{
  font-weight: bold;
  font-size: ${props => props.small ? "var(--font-size-big)" : "var(--font-size-lead)"};
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

export const PropertyTitleRentOrBuyTag = styled.div`{
  position: absolute;
  top: 15px;
  right: -50px;
  text-align: center;
  transform: rotate(45deg);
  font-weight: bold;
  font-size: var(--font-size-medium);
  color: var(--primary-color-light);
  border-radius: 4px;
  border: solid 1px var(--info);
  background-image: linear-gradient(
    rgba(23, 22, 24, 0.4),
    rgba(23, 22, 24, 0.2)
  );
  padding: 5px 50px;
  margin: 0;
}`;

export const PropertyTitleInfoSecondLine = styled.div`{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--middle-grey-color);
}`;

export const PropertyTitleAddress = styled.div`{
  font-size: ${props => props.small ? "var(--font-size-normal)" : "var(--font-size-one)"} ;
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
  margin-top: 10px;
  grid-gap: 0 10px;
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: ${sectionHeader} ${wasmCanvasSize.y} ${sectionFooter};
  grid-template-areas: "propertyToolbar propertyToolbar"
                       "propertyWasm propertyRightMenu"
                       "propertyFooter propertyFooter";
}`;

export const PropertyCarouselDiv = styled.div`{
  display: grid;
  height: ${carouselHeight};
  grid-gap: 10px;
  grid-template-columns: ${wasmCanvasSize.x} calc( var(--body-width) - ${mainPadding}*2 - ${wasmCanvasSize.x} - 10px );
  grid-template-rows: 100%;
}`;

export const PropertyToolbar = styled.div`{
  grid-area: propertyToolbar;
  //display: flex;
}`;

export const PropertyCanvas = styled.div`{
  grid-area: propertyWasm;
  min-width: 720px;
  height: 480px;
  //border-radius: 5px;
  //border: 1px solid var(--middle-grey-color);
}`;

export const PropertyRightMenu = styled.div`{
  grid-area: propertyRightMenu;
  display: flex;
  flex-direction: column;
  border-radius:4px;
  border: solid 1px var(--info);
  background-image: linear-gradient(var(--dark-color-transparent), var(--dark-color-transparent-very) );
}`;

export const PropertyFooter = styled.div`{
  grid-area: propertyFooter;
  display: flex;
  margin: 10px 0;
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

export const SmallPropertyBoxContainer = styled.div`{
  position:relative;
  width: ${props => props.width || "auto"} ;
  height: ${props => props.height || "auto"} ;
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--dark);
  background-image: linear-gradient(var(--logo-color-2), var(--dark-color-transparent-text-readable) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  cursor: pointer;
    :hover {
    border: 1px solid var(--warning);
    box-shadow: 0 0 1px 1px var(--dark);
  }
  
  :active {
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    box-shadow: 0 0 2px 2px var(--info);
    background-color: var(--dark-color);
  }
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

export const PropertyAddress = ({addrSplit, size}) => {
  return (
    <PropertyTitleAddress small={size === "small"}>
      {addrSplit[0] && <PropertyTitleAddressRoad>{addrSplit[0]},{" "}</PropertyTitleAddressRoad>}
      {addrSplit[1] && <PropertyTitleAddressTown>{addrSplit[1]},{" "}</PropertyTitleAddressTown>}
      {addrSplit[2] && <PropertyTitleAddressPostcode>{addrSplit[2]}</PropertyTitleAddressPostcode>}
    </PropertyTitleAddress>
  );
};
