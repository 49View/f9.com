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

export const LandingSection = styled.section` {
}`;

export const LandingInner = styled.div` {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 3rem;
  font-family: Aileron-Thin,serif;
  font-weight: lighter;
  margin: calc(var(--navbar-height)) auto;
}`;

export const LandingSearchBar = styled.input` {
  margin: 15px auto;
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

export const SearchBarResultTrendId = styled.div` {
  color: var(--secondary-alt-color)
}`;

export const SearchBarResultUser = styled.div` {
  color: var(--logo-color-2);
  font-size: var(--font-size-one);
}`;

export const SearchText = styled.span` {
  color: var(--logo-color-1)
}`;

export const SearchTextAlt = styled.span` {
  color: var(--warning);
}`;

export const SearchTitleText = styled.span` {
}`;


