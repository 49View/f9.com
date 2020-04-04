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
  align-items:center;
  border-bottom: 1px solid var(--middle-grey-color);
  padding: 0 20px;
  border-bottom: 1px solid var(--middle-grey-color);
}`;

export const UserNameText = styled.div` {
  min-width: ${minWidthOuterNavBarElements};
}`;

export const NavbarLogoAndTitle = styled.div` {
  display: flex;
  align-items:center;
  min-width: ${minWidthOuterNavBarElements};
}`;

export const NavbarLogo = styled.div` {
  width:var(--navbar-logo-size);
  height:var(--navbar-logo-size);
}`;

export const Navbareh = styled.div` {
  font-family: "Pompiere", cursive;
  font-size: 2.0rem;
  padding-left: 1.5%;
}`;

export const NavbarTitle = styled.div`{
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
