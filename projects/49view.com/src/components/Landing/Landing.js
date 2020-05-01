import React, {Fragment, useState} from "react";
import {
  LandingInner,
  LandingSearchBar,
  LandingSection,
  SearchText,
  SearchTextAlt,
  SearchTitleText
} from "./Landing.styled";
import {Redirect} from "react-router-dom";
import {useRefWithFocusOnMount} from "../../futuremodules/reactComponentStyles/reactCommon";
import {useQLPartialPropertySearch} from "./LandingLogic";
import {PropertySmallBox} from "../PropertyPage/PropertySmallBox";

const SearchResults = ({partialString}) => {

  const {partialPropertySearch} = useQLPartialPropertySearch(partialString);
  const [finalized, setFinalized] = useState(null);

  return (
    <Fragment>
      {finalized && <Redirect to={`/property/${finalized}`}/>}
      {partialPropertySearch && partialPropertySearch.map(elem =>
        <PropertySmallBox key={elem._id} property={elem}
                          gotoProperty={() => setFinalized(elem._id)}/>)
      }
    </Fragment>
  )

};

const Landing = () => {
  const [partialString, setPartialString] = useState(null);
  const searchBox = useRefWithFocusOnMount();

  return (
    <LandingSection>
      <LandingInner>
        <SearchTitleText>
          <SearchText>Search </SearchText>
          <SearchTextAlt>Home</SearchTextAlt>
        </SearchTitleText>
        <LandingSearchBar
          ref={searchBox}
          type="text"
          id="search-bar"
          autoComplete={"off"}
          onChange={e => setPartialString(e.target.value)}>
        </LandingSearchBar>
        <SearchResults partialString={partialString}/>
      </LandingInner>
    </LandingSection>
  );
};

export default Landing;
