import styled from 'styled-components'


export const LandingContainer = styled.section` {
  position: absolute;
  top: 0;
  left: 0;
  background: url("/grant-UhpYKnqZwE8-unsplash.jpg") no-repeat center center
    fixed;
  width: 100%;
  height: 100%;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
}`;

export const LandingInner = styled.div` {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 3.2rem;
  font-family: Aileron-Thin,serif;
  font-weight: lighter;
  margin: calc(var(--navbar-height)*0.5) auto;
}`;

export const LandingSearchBar = styled.input` {
  margin: 15px auto;
  margin-bottom: 0;
  height: 38px;
  width: 90%;
  padding-left: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  outline: none;
  color: var(--light-color);
  background-color: var(--dark-color);
    
  :hover {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
  
  :hover {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
  
  :active {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
}`;

export const SearchBarResultContainer = styled.div` {
  display: flex;
  width: 50%;
  height: 3rem;
  overflow: hidden;
  font-size: var(--font-size-big);
  background: var(--happy-color-trasparent);
  border-radius: 5px;
  border: 1px solid var(--logo-color-1);
  margin-top: 10px;  
  align-items: center;
  text-align: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0px 10px;
}`;

export const SearchResultsContainer = styled.div` {
  margin-top: 10px;
  font-size: var(--font-size-one);
}`;

export const SearchResultsPropertyRecap = styled.div` {
  width: 90%;
  margin: auto;
  padding:7px;
  border-radius: 5px;
  background-color: var(--dark-color-transparent);
}`;

export const LocationSearchResultsContainer = styled.div` {
  display: block;
  text-align: left;
  font-size: var(--font-size-one);
  width: 90%;
}`;

export const SearchText = styled.span` {
  color: var(--logo-color-1)
}`;

export const SearchTextAlt = styled.span` {
  color: var(--warning);
}`;

export const SearchTitleText = styled.span` {
  margin-top: 40px;
}`;

export const TaglineText = styled.span` {
  margin-top: 5px;
  color: var(--light);
  font-size: var(--font-size-onemedium);
  font-weight: bold;
  padding:7px;
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color-transparent), var(--dark-color-transparent-very) );
}`;

