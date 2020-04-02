import React, {Fragment, useEffect, useRef, useState} from "react";
import {
  LandingInner,
  LandingSearchBar,
  LandingSection,
  SearchBarResultContainer,
  SearchBarResultTrendId,
  SearchBarResultUser,
  SearchText,
  SearchTextAlt,
  SearchTitleText
} from "./Landing.styled";
import {Redirect} from "react-router-dom";

const SearchResults = ({trendIdPartial}) => {
  const {data, loading} = {data: null, loading: null};   // useQuery(getSimilarTrends(trendIdPartial));
  const [results, setResults] = useState([]);
  const [finalized, setfinalized] = useState({
    clicked: false,
    username: "",
    trendId: ""
  });

  if (data && data.trend_similar && loading === false) {
    if (results !== data.trend_similar) {
      setResults(data.trend_similar);
    }
  }

  if (finalized.clicked) {
    return <Redirect push={true} to={`/${finalized.username}/${finalized.trendId}`}/>
  }

  return (
    <Fragment>
      {results.map(e => {
        const key = e.trendId + e.user.name;
        return (
          <SearchBarResultContainer
            key={key}
            onClick={() => setfinalized({
              clicked: true,
              username: e.user.name,
              trendId: e.trendId
            })}
          >
            <SearchBarResultTrendId>
              {e.trendId}
            </SearchBarResultTrendId>
            <SearchBarResultUser>
              <i className="fas fa-user"/>{" "}{e.user.name}
            </SearchBarResultUser>
          </SearchBarResultContainer>
        )
      })
      }
    </Fragment>
  )

};

const Landing = () => {
  const [trendIdPartial, setTrendIdPartial] = useState(null);
  const searchBox = useRef(null);

  useEffect(() => {
    if (searchBox.current) {
      searchBox.current.focus();
      searchBox.current.select();
    }
  }, []);

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
          onChange={e => setTrendIdPartial(e.target.value)}>
        </LandingSearchBar>
        <SearchResults trendIdPartial={trendIdPartial}/>
      </LandingInner>
    </LandingSection>
  );
};

export default Landing;
