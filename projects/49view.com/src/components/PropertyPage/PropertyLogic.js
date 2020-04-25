import {useEffect, useState} from "react";
import "./Property.css";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

// ------------------------------
// GraphQL Queries
// ------------------------------

const propertyQuery = (id) => {
  return gql`{
      property(_id:"${id}") {
          name
          origin
          addressLine1
          addressLine2
          addressLine3
          buyOrLet
          description
          keyFeatures
          estateAgent {
              name
              address
              branch
          }
          location {
              type
              coordinates
          }
          price
          priceReadable
          priceUnity
      }
  }`;
};

// ------------------------------
// Hooks
// ------------------------------

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

// ------------------------------
// Javascript functions
// ------------------------------

export const getLocalePropertyPrice = (property) => {
  let defSymbol = "";

  if ( property.priceUnity === "pound" ) {
    defSymbol = "£";
  }

  return `${defSymbol}${property.priceReadable}`;
}
