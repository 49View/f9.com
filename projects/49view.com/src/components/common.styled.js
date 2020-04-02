import styled from "styled-components";

export const Content = styled.section` {
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

export const Body = styled.div `{
  max-width: 1024px;
  margin: auto;
}`;


export const TrendGrid = styled.div` {
  height: calc(100vh - var(--navbar-height));
  margin: 0 var(--mainMargin);
}`;
