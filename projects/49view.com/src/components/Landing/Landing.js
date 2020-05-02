import React, {Fragment, useState} from "react";
import {LandingInner, LandingSearchBar, SearchText, SearchTextAlt, SearchTitleText} from "./Landing.styled";
import {Redirect} from "react-router-dom";
import {useRefWithFocusOnMount} from "../../futuremodules/reactComponentStyles/reactCommon";
import {useQLPartialPropertySearch} from "./LandingLogic";
import {PropertySmallBox} from "../PropertyPage/PropertySmallBox";
import {AnimatePresence, motion} from "framer-motion"
import {AnimFadeSection} from "../../futuremodules/reactComponentStyles/reactCommon.animations";

const SearchResults = ({partialString}) => {

  const {partialPropertySearch} = useQLPartialPropertySearch(partialString);
  const [finalized, setFinalized] = useState(null);

  return (
    <Fragment>
      {finalized && <Redirect to={`/property/${finalized}`}/>}
      <AnimatePresence>
        {partialPropertySearch && partialPropertySearch.map(elem => (
            <motion.div
              initial={{opacity: 0, translateX: -1000}}
              animate={{opacity: 1, translateX: 0}}
              whileHover={{scale: 1.015}}
              exit={{opacity: 0, translateX: -1000}}
              transition={{type: 'spring', damping: 15, stiffness: 120}}>
              <PropertySmallBox key={elem._id} property={elem}
                                gotoProperty={() => setFinalized(elem._id)}/>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </Fragment>
  )

};

const Landing = () => {
  const [partialString, setPartialString] = useState(null);
  const searchBox = useRefWithFocusOnMount();

  return (
    // <AnimatePresence key={"landing"}>
      <AnimFadeSection>
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
      </AnimFadeSection>
    // </AnimatePresence>
  );
};

export default Landing;
