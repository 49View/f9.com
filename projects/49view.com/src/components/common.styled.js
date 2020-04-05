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

export const Body = styled.div`{
  max-width: var(--body-width);
  margin: 20px auto;
}`;


export const TrendGrid = styled.div` {
  height: calc(100vh - var(--navbar-height));
  margin: 0 var(--mainMargin);
}`;

export const AvatarRound = styled.img` {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--logo-color-1);
}`;

export const InfoTextSpan = styled.span` {
  color: var(--info);  
  font-size: ${props => props.fontSize};  
}`;

export const InfoTextSpanBold = styled.span` {
  color: var(--info);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const Logo1TextSpan = styled.span` {
  color: var(--logo-color-1);  
  font-size: ${props => props.fontSize};  
}`;

export const Logo1TextSpanBold = styled.span` {
  color: var(--logo-color-1);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const Logo2TextSpan = styled.span` {
  color: var(--logo-color-2);  
  font-size: ${props => props.fontSize};  
}`;

export const Logo2TextSpanBold = styled.span` {
  color: var(--logo-color-2);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const SuccessTextSpan = styled.span` {
  color: var(--success);  
  font-size: ${props => props.fontSize};  
}`;

export const SuccessTextSpanBold = styled.span` {
  color: var(--success);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const LightTextSpan = styled.span` {
  color: var(--light);
  font-size: ${props => props.fontSize};  
}`;

export const LightTextSpanBold = styled.span` {
  color: var(--light);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;

export const LightColorTextSpan = styled.span` {
  color: var(--light-color);  
  font-size: ${props => props.fontSize};  
}`;

export const LightColorTextSpanBold = styled.span` {
  color: var(--light-color);  
  font-weight: bold;
  font-size: ${props => props.fontSize};  
}`;
