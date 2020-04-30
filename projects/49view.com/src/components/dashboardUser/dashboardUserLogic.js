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
        }
    }
}`;

export const useQLUserPropertiesQuery = (id) => {
  const [userProperties, setUserProperties] = useState(null);
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
