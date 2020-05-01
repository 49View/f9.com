import {useQuery} from "@apollo/react-hooks";
import {useEffect, useState} from "react";
import {checkQueryHasLoadedWithData, getQueryLoadedWithValue} from "../../futuremodules/graphqlclient/query";
import gql from "graphql-tag";
import {PropertyMinFragment} from "../PropertyPage/PropertyLogic";

const partialPropertySearchQuery = (partialName) => gql`
    ${PropertyMinFragment}
    {
        propertyPartial(partialName:"${partialName}") {
            ...PropertyMin
        }
    }`;

export const useQLPartialPropertySearch = (partialName) => {
  const [partialPropertySearch, setPartialPropertySearch] = useState(null);
  const queryRes = useQuery(partialPropertySearchQuery(partialName));

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
