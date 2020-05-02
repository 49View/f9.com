import React from "reactn";
import "./Property.css";
import {PropertyNameAndPriceHeader} from "./PropertyNameAndPriceHeader";
import {PropertyContainer} from "./Property.styled";
import {My2} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {useQLProperty} from "./PropertyLogic";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {PropertyStarOfTheShow} from "./PropertyStarOfTheShow";
import {PropertyGeneralInformation} from "./PropertyGeneralInformation";
import {PropertyPhotographs} from "./PropertyPhotographs";
import {PropertyMaps} from "./PropertyMaps";
import {AnimFadeSection} from "../../futuremodules/reactComponentStyles/reactCommon.animations";

export const Property = (props) => {
  const {match: {params}} = props;
  const {property} = useQLProperty(params.pid);

  if (!property) {
    return <SpinnerTopMiddle/>
  }

  return (
    <AnimFadeSection>
    <PropertyContainer>
        <PropertyNameAndPriceHeader property={property}/>
        <PropertyStarOfTheShow property={property}/>
        <PropertyGeneralInformation property={property}/>
        <PropertyPhotographs property={property}/>
        <PropertyMaps property={property}/>
      </PropertyContainer>
      <My2/>
    </AnimFadeSection>
  );
};
