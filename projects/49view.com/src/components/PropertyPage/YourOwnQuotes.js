import React, { memo } from "react";
import { useSelector } from "react-redux";
import "./Property.css";
import styled, { keyframes } from "styled-components";

const TradersQuote = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 10px;
  background-image: linear-gradient(
    rgba(63, 162, 184, 0.05),
    rgba(63, 162, 184, 0)
  );
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

//   const animFade = keyframes`
//     from {
//       color: var(--transparent);
//     }
//     to {
//       color: var(--logo-color-1);
//     }`;

const animTranslate = keyframes`
from {
  transform: translate(-120%, 0px);
}
to {
  transform: translate(0px, 0px);
}`;

const TradersQuoteTitle = styled.h3`
  margin-bottom: 1rem;
  animation: ${animTranslate} 0.5s ease-in-out 0s 1 normal forwards;
`;

const animRotate = keyframes`
0% {
transform: rotate(0deg);
color: var(--transparent);
}
50% {
transform: rotate(180deg);
color: white;
}
100% {
transform: rotate(360deg);
color: var(--transparent);
}`;

const TradersQuoteLoading = styled.div`
  display: inline;
  float: right;
  width: 18px;
  height: 18px;
  color: white;
  transform-origin: 50% 80%;
  animation: ${animRotate} 1s ease-in-out 0.5s 3 normal forwards;
`;

const animTranslateUp = keyframes`
from {
transform: translate(0%, 500%);
}
to {
transform: translate(0%, 0%);
}`;

const TradersQuoteJobCard = styled.div`
  display: grid;
  margin: 20px 0px;
  padding: 0px 15px;
  box-sizing: border-box;
  width: 100%;
  height: 82px;
  grid-template-columns: 62px calc(60% - 62px) 40%;
  grid-template-rows: 38% 12% 50%;
  grid-template-areas:
    "a49trader-profile-picture a49view-trader-name a49view-trader-quote-price"
    "a49trader-profile-picture a49view-trader-title a49view-trader-quote-date"
    "a49trader-profile-picture a49view-trader-stars a49view-trader-quote-bookit";
  /* grid-gap: 0px 20px; */
  border-radius: 6px;
  align-items: center;
  border: solid 1px var(--nice-grey);
  background-image: linear-gradient(
    rgba(63, 162, 184, 0.15),
    rgba(63, 162, 184, 0)
  );
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  overflow: hidden;
  transform: translate(0%, 500%);
  animation: ${animTranslateUp} 1s ease-in-out 2.3s 1 normal forwards;
`;

// const jobQuotesCS = createSelector(
//   state => state.quotes.jobQuotes,
//   jobQuotes => jobQuotes
// );

const JobQuotesC = () => {
  const jobQuotes = useSelector(state => state.quotes.jobQuotes);

  return jobQuotes.map(quote => (
    <div key={quote.job.title} className="a49view-trader-quote-job">
      <TradersQuoteTitle>
        <span className="text-logo-color-1">{quote.job.title}</span>
        <span className="text-light-color"> {quote.job.what} </span>
        <span className="text-logo-color-1">quotes</span>
        <TradersQuoteLoading>
          <i className="fas fa-spinner"></i>
        </TradersQuoteLoading>
      </TradersQuoteTitle>

      {quote.job.candidates.map(candidate => (
        <TradersQuoteJobCard key={candidate.name}>
          <div className="a49trader-profile-picture">
            <img
              src={candidate.img}
              alt={candidate.name}
              width="62"
              height="62"
            />
          </div>
          <div className="a49view-trader-name">{candidate.name}</div>
          <div className="a49view-trader-title">{candidate.trade}</div>
          <div className="a49view-trader-stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half"></i>
          </div>
          <div className="a49view-trader-quote-price">{candidate.price}</div>
          <div className="a49view-trader-quote-date">{candidate.date}</div>
          <div className="a49view-trader-quote-bookit">Book it</div>
        </TradersQuoteJobCard>
      ))}
    </div>
  ));
};

export const YourOwnQuotes = memo(() => {
  //   const dispatch = useDispatch();

  console.log("YourOwnQuotes redraw");

  return (
    <div className="p-1">
      <TradersQuote>
        <JobQuotesC></JobQuotesC>
      </TradersQuote>
    </div>
  );
});
