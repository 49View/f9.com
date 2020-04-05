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
  max-width: var(--body-width);
  margin: 20px auto;
}`;


export const TrendGrid = styled.div` {
  height: calc(100vh - var(--navbar-height));
  margin: 0 var(--mainMargin);
}`;

export const AvatarRound = styled.img` {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--warning);
    margin-bottom: 10px;
}`;
