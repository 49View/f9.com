import React, {Fragment, useState} from "reactn";
import {Redirect} from "react-router-dom";
import {useQLUserPropertiesQuery} from "../dashboardUserLogic";
import {SpinnerTopMiddle} from "../../../futuremodules/spinner/Spinner";
import {
  Div,
  Flex,
  FlexVertical,
  Img100C,
  Mx1,
  My05
} from "../../../futuremodules/reactComponentStyles/reactCommon.styled";
import {getLocalePropertyPrice} from "../../PropertyPage/PropertyLogic";
import {
  PropertyAddress,
  PropertyManagingEstateAgent,
  PropertyTitlePrice,
  PropertyTitleType,
  SmallPropertyBoxContainer
} from "../../PropertyPage/Property.styled";

const SmallPropertyBox = ({property, gotoProperty}) => {
  return (
    <SmallPropertyBoxContainer width={"700px"} height={"280px"} padding={"10px"}
                               onClick={() => gotoProperty(property._id)}
    >
      <Flex height={"100%"} alignItems={"flex-start"} justifyContent={"flex-start"}>
        <Div width={"360px"} height={"100%"}>
          <Img100C
            className="d-block h-100 rounded border border-dark"
            src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/${property.images[0]}`}
            alt={property.images[0]}
          />
        </Div>
        <FlexVertical>
          <Mx1/>
        </FlexVertical>
        <FlexVertical justifyContent={"flex-start"} overflowY={"ellipsis"} height={"100%"}>
          <PropertyTitlePrice small>
            {getLocalePropertyPrice(property)}
          </PropertyTitlePrice>
          <My05/>
          <PropertyTitleType small>
            {property.name}
          </PropertyTitleType>
          <PropertyAddress size={"small"}
                           addrSplit={[property.addressLine1, property.addressLine2, property.addressLine3]}/>
          <My05/>
          <Div alignItems={"flex-end"}>
            <PropertyManagingEstateAgent
              src={`https://${process.env.REACT_APP_EH_CLOUD_HOST}/media/${property.estateAgent.logo}`}/>
          </Div>
          <Div margin={"10px 0"} width={"300px"} overflowY={"scroll"}
               dangerouslySetInnerHTML={{__html: property.description}}>
          </Div>
        </FlexVertical>
      </Flex>
    </SmallPropertyBoxContainer>
    // <Button key={property._id} variant={"info"} onClick={ () => gotoProperty(property._id) }>{property.name}</Button>
  )
}

export const UserAssets = ({user}) => {

  const {userProperties} = useQLUserPropertiesQuery(user.name);

  const [propertyId, gotoProperty] = useState(null);

  if (propertyId) {
    return (
      <Redirect to={`/property/${propertyId}`}/>
    )
  }

  return (
    <Fragment>
      {userProperties === undefined && <SpinnerTopMiddle/>}
      {userProperties && userProperties.properties.map(elem => <SmallPropertyBox key={elem._id} property={elem}
                                                                                 gotoProperty={gotoProperty}/>)}
    </Fragment>
  )
};
