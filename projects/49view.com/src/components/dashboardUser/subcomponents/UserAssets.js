import React, {Fragment, useState} from "reactn";
import {Redirect} from "react-router-dom";
import {useQLUserPropertiesQuery} from "../dashboardUserLogic";
import {SpinnerTopMiddle} from "../../../futuremodules/spinner/Spinner";
import {Div, My2} from "../../../futuremodules/reactComponentStyles/reactCommon.styled";
import {CustomTitle2} from "../../../futuremodules/reactComponentStyles/reactCommon";
import {PropertySmallBox} from "../../PropertyPage/PropertySmallBox";

export const UserAssets = ({user}) => {

  const {userProperties} = useQLUserPropertiesQuery(user.name);
  const [propertyId, gotoProperty] = useState(null);

  return (
    <Fragment>
      <Div fontSize={"var(--font-size-medium)"}>
        <CustomTitle2 icon={"home"}>My saved properties:</CustomTitle2>
      </Div>
      <My2/>
      {propertyId && <Redirect to={`/property/${propertyId}`}/>}
      {userProperties === undefined && <SpinnerTopMiddle/>}
      {userProperties && userProperties.properties.map(elem => <PropertySmallBox key={elem._id} property={elem}
                                                                                 gotoProperty={gotoProperty}/>)}
    </Fragment>
  )
};
