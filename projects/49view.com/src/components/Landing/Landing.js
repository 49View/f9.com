import React, {Fragment, useState} from "react";
import {
  LandingInner,
  LandingSearchBar,
  LocationSearchResultsContainer, SearchResultsContainer,
  SearchText,
  SearchTextAlt,
  SearchTitleText,
  TaglineText
} from "./Landing.styled";
import {Link} from "react-router-dom";
import {useRefWithFocusOnMount} from "../../futuremodules/reactComponentStyles/reactCommon";
import {useQLPartialLocation, useQLPartialPropertySearch} from "./LandingLogic";
import {PropertySmallBox} from "../PropertyPage/PropertySmallBox";
import {AnimatePresence, motion} from "framer-motion"
import {AnimFadeSection} from "../../futuremodules/reactComponentStyles/reactCommon.animations";
import {useWasmContext} from "../../futuremodules/reactwasmcanvas/localreacwasmcanvas";
import {ListGroup} from "react-bootstrap";
import {
  LightColorTextSpan,
  LightColorTextSpanBold,
  Logo1TextSpanBold
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";

const SearchResults = ({partialString}) => {

  const {partialPropertySearch} = useQLPartialPropertySearch(partialString);

  return (
    <SearchResultsContainer>
      {partialPropertySearch && partialPropertySearch.length > 0 && (
        <LightColorTextSpan>
          We've found 3 properties in JHG
        </LightColorTextSpan>
      )}
      <AnimatePresence>
        {partialPropertySearch && partialPropertySearch.map(elem => (
            <motion.div
              key={elem._id}
              initial={{opacity: 0, translateX: -1000}}
              animate={{opacity: 1, translateX: 0}}
              whileHover={{scale: 1.015}}
              exit={{opacity: 0, translateX: -1000}}
              transition={{type: 'spring', damping: 15, stiffness: 120}}>
              <Link to={`/property/${elem._id}`}>
                <PropertySmallBox key={elem._id} property={elem}
                                  gotoProperty={() => {
                                  }}/>
              </Link>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </SearchResultsContainer>
  )

};

const LocationSearchResults = () => {

  const [partialLocationString, setPartialLocationString] = useState(null);
  const [partialLocationResultIndex, setPartialLocationResultIndex] = useState(0);
  const [propertySearch, setPropertySearch] = useState(null);
  const searchBox = useRefWithFocusOnMount();
  const {partialLocation, setPartialLocation} = useQLPartialLocation(partialLocationString);

  return (
    <>
      <LandingSearchBar
        ref={searchBox}
        type="text"
        id="search-bar"
        autoComplete={"off"}
        onChange={e => setPartialLocationString(e.target.value)}
        onKeyDown={(evt) => {
          if (evt.keyCode === 13 || evt.keyCode === 14) {
            if (partialLocation && partialLocation.length > 0) {
              evt.target.value = partialLocation[partialLocationResultIndex].locationName;
              setPropertySearch(partialLocation[partialLocationResultIndex].locationName);
            }
            setPartialLocationResultIndex(-1)
            setPartialLocation(null);
          }
          if (evt.keyCode === 38) { // ArrowUp
            setPartialLocationResultIndex(partialLocationResultIndex === 0 ? 9 : partialLocationResultIndex - 1)
          }
          if (evt.keyCode === 40) { // ArrowDown
            setPartialLocationResultIndex(partialLocationResultIndex === 9 ? 0 : partialLocationResultIndex + 1)
            // evt.preventDefault();
          }
        }}
        placeholder={"Desired location: e.g. 'Wimbledon', 'Surrey'"}
      >
      </LandingSearchBar>

      <LocationSearchResultsContainer>
        <ListGroup>
          {partialLocation && partialLocation.map(elem => (
              <ListGroup.Item key={elem.locationName + elem.locality + elem.gridReference}
                              active={partialLocationResultIndex >= 0 && elem === partialLocation[partialLocationResultIndex]}>
                <Logo1TextSpanBold>{partialLocationString}</Logo1TextSpanBold>
                <LightColorTextSpanBold>{elem.locationName.substring(partialLocationString.length)}{", "}</LightColorTextSpanBold>
                {elem.locality}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </LocationSearchResultsContainer>

      <SearchResults partialString={propertySearch}/>
    </>
  )

};

const Landing = () => {
  useWasmContext(false);

  return (
    // <AnimatePresence key={"landing"}>
    <AnimFadeSection>
      <LandingInner>
        <SearchTitleText>
          <SearchText>Find </SearchText>
          <SearchTextAlt>Home</SearchTextAlt>
        </SearchTitleText>
        <TaglineText>
          Explore, visit and personalise any property in real-time
        </TaglineText>
        <LocationSearchResults/>
      </LandingInner>
    </AnimFadeSection>
    // </AnimatePresence>
  );
};

export default Landing;
