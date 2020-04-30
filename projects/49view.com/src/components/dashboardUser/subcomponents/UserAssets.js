import React, {Fragment, useState} from "reactn";
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {useQLUserPropertiesQuery} from "../dashboardUserLogic";
import {SpinnerTopMiddle} from "../../../futuremodules/spinner/Spinner";

export const UserAssets = ({user}) => {

  const {userProperties} = useQLUserPropertiesQuery(user.name);

  const [propertyId, gotoProperty] = useState(null);

  if ( propertyId ) {
    return (
      <Redirect to={`/property/${propertyId}`}/>
    )
  }

  return (
    <Fragment>
      {!userProperties && <SpinnerTopMiddle/>}
      {userProperties && userProperties.properties.map( elem => (
        <Button key={elem._id} variant={"info"} onClick={ () => gotoProperty(elem._id) }>{elem.name}</Button>
      ))}
    </Fragment>
  )
};
