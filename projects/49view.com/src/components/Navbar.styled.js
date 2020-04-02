import styled, {keyframes} from 'styled-components'

const minWidthOuterNavBarElements = `182px`;

export const NavbarComponent = styled.div` {
  color: var(--light-color);
  width: 100%;
  z-index: 50000;
  height: var(--navbar-height);
  background: var(--dark-color-transparent);
  background-color: var(--dark-color-transparent);
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid var(--middle-grey-color);
  padding: 0px 20px;
  border-bottom: 1px solid var(--middle-grey-color);
}`;

export const UserNameText = styled.div` {
  align-self: center;
  min-width: ${minWidthOuterNavBarElements};
}`;

export const NavbarLogoAndTitle = styled.div` {
  display: flex;
  align-self: center;
  min-width: ${minWidthOuterNavBarElements};
}`;

export const NavbarLogo = styled.div` {
  align-self: center;
  width:var(--navbar-logo-size);
  height:var(--navbar-logo-size);
}`;

export const Navbareh = styled.div` {
  align-self: center;
  font-family: "Pompiere", cursive;
  font-size: 2.0rem;
  padding-left: 1.5%;
  line-height: 1.0;
}`;

export const NavbarTitle = styled.div`{
  grid-area: navbartitle;
  align-self: center;
  justify-self: center;
  font-size: 1.3rem;
  color: var(--secondary-alt-color);
}`;

export const Mx1 = styled.span` {
  padding-left: 6px;
}`;

export const TextShadow = styled.h3`{
  text-shadow: #000 1px 0 10px;
  color: var(--light-color);
  font-family: "Oregano", cursive;
}`;

const textFocusInKeyFrame = keyframes`
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
`;

export const TextFocusD1 = styled.span`{
  animation: ${textFocusInKeyFrame} 1s 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;

export const TextFocusD2 = styled.span`{
  animation: ${textFocusInKeyFrame} 1s 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;

export const TextFocusD3 = styled.span`{
  animation: ${textFocusInKeyFrame} 1s 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;
