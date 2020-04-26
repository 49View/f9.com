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

export const PropertyLayout = ({property}) => {

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
      {/*<div className="property-details">*/}
      {/*  <Tabs*/}
      {/*    id="controlled-tab-example"*/}
      {/*    selectedIndex={tabKey}*/}
      {/*    onSelect={k => {*/}
      {/*      // dispatch(setLayoutTabIndex(k));*/}
      {/*      // if (k === 1) {*/}
      {/*      //   window.Module.addScriptLine(`av.floorPlanView()`)*/}
      {/*      // } else {*/}
      {/*      //   window.Module.addScriptLine(`av.walkingView()`)*/}
      {/*      // }*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <TabList>*/}
      {/*      <Tab>*/}
      {/*        <span className="text-secondary-alt">*/}
      {/*          <i className="fas fa-info-circle"></i>*/}
      {/*        </span>{" "}*/}
      {/*        Overview*/}
      {/*      </Tab>*/}
      {/*      <Tab>*/}
      {/*        <span className="text-secondary-alt">*/}
      {/*          <i className="fas fa-ruler-combined"></i>*/}
      {/*        </span>{" "}*/}
      {/*        Floorplan*/}
      {/*      </Tab>*/}
      {/*      <Tab>*/}
      {/*        <span className="text-secondary-alt">*/}
      {/*          <i className="fas fa-map-marked-alt"></i>*/}
      {/*        </span>{" "}*/}
      {/*        Map*/}
      {/*      </Tab>*/}
      {/*      <Tab>*/}
      {/*        <span className="text-secondary-alt">*/}
      {/*          <i className="fas fa-home"></i>*/}
      {/*        </span>{" "}*/}
      {/*        Your own*/}
      {/*      </Tab>*/}
      {/*    </TabList>*/}
      {/*    <TabPanel>*/}
      {/*      <div className="p-1">*/}
      {/*        <h3 className="text-logo-color-1 mb-1">Features</h3>*/}
      {/*        <ul className="doublelist normal-one">*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i> 2 bed*/}
      {/*            double-bedroom apartment*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i> 2*/}
      {/*            bathrooms*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i>{" "}*/}
      {/*            Pretty balcony views of roof garden*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i> High*/}
      {/*            spec kitchen and bathroom*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i> Lift*/}
      {/*            service and long lease*/}
      {/*          </li>*/}
      {/*          <li>*/}
      {/*            <i className="far fa-dot-circle text-primary-light"></i>{" "}*/}
      {/*            Within a few hundred meters of river*/}
      {/*          </li>*/}
      {/*        </ul>*/}
      {/*        <h3 className="text-logo-color-1 mtb-1">Description</h3>*/}
      {/*        <div className="normal">*/}
      {/*          In a fabulous location within a few hundred yards of beautiful*/}
      {/*          river walks and Kingston town-centre is this luxury 2 double*/}
      {/*          bedroom/2 bathroom apartment, which has pretty balcony views of*/}
      {/*          the roof top garden. The property is on the sixth floor with*/}
      {/*          lift service access and has over 800 sq ft of accommodation*/}
      {/*          which includes: a large entrance hall with excellent storage,*/}
      {/*          high spec bathroom fittings, stylish kitchen with fitted*/}
      {/*          appliances - open plan to dining and living room which leads*/}
      {/*          onto a private balcony. Other features include: fitted*/}
      {/*          wardrobes, underfloor heating, video entry system, secure bike*/}
      {/*          storage, long lease.*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <div className="p-1">*/}
      {/*        <img*/}
      {/*          src="https://media.rightmove.co.uk/dir/47k/46386/64497714/46386_100723003203_FLP_01_0000_max_600x600.jpg"*/}
      {/*          alt=""*/}
      {/*        ></img>*/}
      {/*      </div>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <div className="p-1">*/}
      {/*        <h3 className="text-logo-color-1 mb-1">Nearest Schools</h3>*/}
      {/*      </div>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <YourOwnQuotes></YourOwnQuotes>*/}
      {/*    </TabPanel>*/}
      {/*  </Tabs>*/}
      {/*</div>*/}
    </Fragment>
  );
};
