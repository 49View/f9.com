import {useQuery} from "@apollo/react-hooks";
import {useEffect, useState} from "react";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import gql from "graphql-tag";
import {PropertyMinFragment} from "../PropertyPage/PropertyLogic";
import {sanitizeGraphQLQuery} from "../../futuremodules/utils/utils";

const partialPropertySearchQuery = (partialName) => gql`
    ${PropertyMinFragment}
    {
        propertyPartial(partialName:"${partialName}") {
            properties {
                ...PropertyMin
            }
            withinRequestedArea
        }
    }`;

export const useQLPartialPropertySearch = (partialName) => {
  const [partialPropertySearch, setPartialPropertySearch] = useState(null);
  const queryRes = useQuery(partialPropertySearchQuery(sanitizeGraphQLQuery(partialName)));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setPartialPropertySearch(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setPartialPropertySearch]);

  return {
    partialPropertySearch,
    setPartialPropertySearch,
  }
};

const partialLocationQuery = (partialName) => {
  return gql`{
      partialLocation(partialName:"${partialName}") {
          locationName
          locality
          gridReference
      }
  }`;
};

export const useQLPartialLocation = (partialName) => {
  const [partialLocation, setPartialLocation] = useState(null);
  const queryRes = useQuery(partialLocationQuery(sanitizeGraphQLQuery(partialName)));

  useEffect(() => {
    if (checkQueryHasLoadedWithData(queryRes)) {
      setPartialLocation(getQueryLoadedWithValue(queryRes));
    }
  }, [queryRes, setPartialLocation]);

  return {
    partialLocation,
    setPartialLocation,
  }
};
