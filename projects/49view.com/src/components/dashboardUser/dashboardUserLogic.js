// ------------------------------
// GraphQL Queries
// ------------------------------

import gql from "graphql-tag";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";

// ------------------------------
// Hooks
// ------------------------------

const userPropertiesQuery = (name) => gql`{
    user(name:"${name}") {
        properties {
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
        }
    }
}`;

export const useQLUserPropertiesQuery = (id) => {
  const [userProperties, setUserProperties] = useState(undefined);
  const queryRes = useQuery(userPropertiesQuery(id));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setUserProperties(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setUserProperties]);

  return {
    userProperties,
    setUserProperties,
  }
};
