import {useEffect, useState} from "react";
import "./Property.css";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

const propertyQuery = (id) => {
  return gql`{
      property(_id:"${id}") {
          addressLine1
          description
          estateAgentAddress
          estateAgentBranch
          estateAgentName
          keyFeatures
          location {
              type
              coordinates
          }
          name
          origin
          price
          priceReadable
          priceUnity
          sourceHash
      }
  }`;
};

export const useQLProperty = (id) => {
  const [property, setProperty] = useState(null);
  const queryRes = useQuery(propertyQuery(id));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setProperty(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setProperty]);

  return {
    property,
    setProperty,
  }
};


export const propertyAddressSplit = (address) => {
  const splitBy = ",";
  return address.split(splitBy);
}

const forSale = "for sale";
const toRent = "to rent";

const searchForSaleInString = name => {
  return name.toLowerCase().indexOf(forSale);
}

const searchToRentInString = name => {
  return name.toLowerCase().indexOf(toRent);
}

export const propertyNameSanitize = (name) => {
  const sale = searchForSaleInString(name);
  if ( sale > 1 ) {
    return name.substring(0, sale);
  }
  const rent = searchForSaleInString(name);
  if ( rent > 1 ) {
    return name.substring(0, rent);
  }
}

export const propertyForSaleOrToRent = (name) => {
  const sale = searchForSaleInString(name);
  if ( sale >= 0 ) {
    return forSale;
  }
  const rent = searchToRentInString(name);
  if ( rent >= 0 ) {
    return toRent;
  }

  return forSale;
}
