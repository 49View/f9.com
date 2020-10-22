import React, {useState} from "react";
import {
  LandingInner,
  LandingSearchBar,
  LocationSearchResultsContainer,
  SearchResultsContainer,
  SearchResultsPropertyRecap,
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
  InfoTextSpan,
  LightColorTextSpan,
  LightColorTextSpanBold,
  Logo1TextSpanBold,
  SecondaryAltColorTextSpanBold
} from "../../futuremodules/reactComponentStyles/reactCommon.styled";

const SearchResults = ({partialString}) => {

  const {partialPropertySearch} = useQLPartialPropertySearch(partialString);

  return (
    <SearchResultsContainer>
      <SearchResultsPropertyRecap>
        {partialPropertySearch && partialPropertySearch.properties.length > 0 && partialPropertySearch.withinRequestedArea && (
          <>
            <LightColorTextSpan>
              We've found
            </LightColorTextSpan>
            {" "}
            <InfoTextSpan>
              {partialPropertySearch.properties.length}
            </InfoTextSpan>
            {" "}
            {partialPropertySearch.properties.length === 1 && <LightColorTextSpan>
              property
            </LightColorTextSpan>}
            {partialPropertySearch.properties.length > 1 && <LightColorTextSpan>
              properties
            </LightColorTextSpan>}
            {" "}
            <LightColorTextSpan>
              around the area
            </LightColorTextSpan>
          </>
        )}
        {partialPropertySearch && partialPropertySearch.properties.length > 0 && !partialPropertySearch.withinRequestedArea && (
          <>
            <LightColorTextSpanBold>
              We are sorry, we couldn't find any property around that location...<br/>
              But don't worry, we are adding new properties daily.<br/><br/>
            </LightColorTextSpanBold>
            <SecondaryAltColorTextSpanBold>
              In the meantime, why not taking a look at our portfolio to see how 49view works?
            </SecondaryAltColorTextSpanBold>
          </>
        )}
      </SearchResultsPropertyRecap>
      <AnimatePresence>
        {partialPropertySearch && partialPropertySearch.properties.map(elem => (
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
  const [partialLocationResultIndex, setPartialLocationResultIndex] = useState(-1);
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
        spellCheck={"false"}
        onChange={e => setPartialLocationString(e.target.value)}
        onKeyDown={(evt) => {
          if (evt.keyCode === 13 || evt.keyCode === 14) {
            if (partialLocation && partialLocation.length > 0) {
              if (partialLocationResultIndex >= 0 && partialLocation[partialLocationResultIndex]) {
                evt.target.value = partialLocation[partialLocationResultIndex].locationName;
              }
              setPropertySearch(evt.target.value);
              setPartialLocationResultIndex(-1);
            }
            setPartialLocationResultIndex(-1)
            setPartialLocation(null);
          }
          if (evt.keyCode === 38) { // ArrowUp
            setPartialLocationResultIndex(partialLocationResultIndex <= 0 ? 9 : partialLocationResultIndex - 1)
          }
          if (evt.keyCode === 40) { // ArrowDown
            setPartialLocationResultIndex(partialLocationResultIndex === 9 ? 0 : partialLocationResultIndex + 1)
            // evt.preventDefault();
          }
        }}
        placeholder={"Desired location: e.g. 'Wimbledon'"}
      >
      </LandingSearchBar>

      <LocationSearchResultsContainer>
        <ListGroup>
          {partialLocation && partialLocation.map(elem => (
              <ListGroup.Item key={elem.locationName + elem.locality + elem.gridReference}
                              active={partialLocationResultIndex >= 0 && elem === partialLocation[partialLocationResultIndex]}
                              action onClick={() => {
                setPropertySearch(elem.locationName);
                setPartialLocationResultIndex(-1);
                setPartialLocation(null);
              }}
              >
                <Logo1TextSpanBold>{elem.locationName.substring(0, partialLocationString.length)}</Logo1TextSpanBold>
                <LightColorTextSpanBold>{elem.locationName.substring(partialLocationString.length)}{", "}</LightColorTextSpanBold>
                {elem.locality}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </LocationSearchResultsContainer>

      {propertySearch && <SearchResults partialString={propertySearch}/>}
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
          Visit, explore and personalise properties in real-time
        </TaglineText>
        <LocationSearchResults/>
      </LandingInner>
    </AnimFadeSection>
    // </AnimatePresence>
  );
};

export default Landing;
