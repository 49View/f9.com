import React, {Fragment} from "react";
import "./CustomReactTabs.css";
import {
  PropertyTitleAddress,
  PropertyTitleAddressPostcode,
  PropertyTitleAddressRoad,
  PropertyTitleAddressTown,
  PropertyTitleInfo,
  PropertyTitleInfoSecondLine,
  PropertyTitlePrice,
  PropertyTitleRentOrBuy,
  PropertyTitleType
} from "./Property.styled";
import {getLocalePropertyPrice} from "./PropertyLogic";

const PropertyAddress = ({addrSplit}) => {

  return (
    <PropertyTitleAddress>
      {addrSplit[0] && <PropertyTitleAddressRoad>{addrSplit[0]},{" "}</PropertyTitleAddressRoad>}
      {addrSplit[1] && <PropertyTitleAddressTown>{addrSplit[1]},{" "}</PropertyTitleAddressTown>}
      {addrSplit[2] && <PropertyTitleAddressPostcode>{addrSplit[2]}</PropertyTitleAddressPostcode>}
    </PropertyTitleAddress>
  );
};

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
