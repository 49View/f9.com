import {useEffect, useState} from "react";
import "./Property.css";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";

// ------------------------------
// GraphQL Fragments
// ------------------------------

export const PropertyMinFragment = gql`
    fragment PropertyMin on Property {
        _id
        name
        buyOrLet
        description
        addressLine1
        addressLine2
        addressLine3
        images
        estateAgent {
            name
            address
            branch
            logo
        }
        location {
            type
            coordinates
        }
        price
        priceReadable
        priceUnity
    }`;

// ------------------------------
// GraphQL Queries
// ------------------------------

const propertyQuery = (id) => gql`{
    property(_id:"${id}") {
        _id
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
            logo
        }
        location {
            type
            coordinates
        }
        price
        priceReadable
        priceUnity
        floorplanUrl
        images
        thumbs
    }
}`;


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

  if (property.priceUnity === "pound") {
    defSymbol = "£";
  }

  return `${defSymbol}${property.priceReadable}`;
}

export const getPropertyLngLat = (property) => {
  return [property.location.coordinates[1], property.location.coordinates[0]];
}
