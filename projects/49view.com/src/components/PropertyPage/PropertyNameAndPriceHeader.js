import React, {Fragment} from "react";
import "./CustomReactTabs.css";
import {
  PropertyAddress,
  PropertyTitleInfo,
  PropertyTitleInfoSecondLine,
  PropertyTitlePrice,
  PropertyTitleRentOrBuy,
  PropertyTitleType
} from "./Property.styled";
import {getLocalePropertyPrice} from "./PropertyLogic";

export const PropertyNameAndPriceHeader = ({property}) => {

  return (
    <Fragment>
      <PropertyTitleInfo>
        <PropertyTitleType>{property.name}</PropertyTitleType>
        <PropertyTitlePrice>{getLocalePropertyPrice(property)}</PropertyTitlePrice>
      </PropertyTitleInfo>
      <PropertyTitleInfoSecondLine>
        <PropertyAddress addrSplit={[property.addressLine1,property.addressLine2,property.addressLine3]}/>
        <PropertyTitleRentOrBuy>{property.buyOrLet}</PropertyTitleRentOrBuy>
      </PropertyTitleInfoSecondLine>
    </Fragment>
  );
};
