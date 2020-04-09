import styled, {keyframes} from 'styled-components'

const minWidthOuterNavBarElements = `182px`;

export const NavbarComponent = styled.div` {
  position: fixed;
  top: 0;
  left: 0;
  color: var(--light-color);
  width: 100%;
  z-index: 50000;
  height: var(--navbar-height);
  background: var(--navbar-color-transparent);
  display: flex;
  justify-content: space-between;
  align-items:center;
  border-bottom: 1px solid var(--middle-grey-color);
  padding: 0 20px;
}`;

export const UserNameText = styled.div` {
  min-width: ${minWidthOuterNavBarElements};
}`;

export const NavbarLogoAndTitle = styled.div` {
  display: grid;
  grid-template-columns: 50px 100px;
  grid-template-rows: calc(var(--navbar-height) * 0.50) calc(var(--navbar-height) * 0.3);
  grid-template-areas: "logo    logotext"
                       "tagline tagline";
  justify-items: start;
  align-items: center;
}`;

export const NavbarLogo = styled.div` {
  grid-area: logo;
  width:var(--navbar-logo-size);
  height:var(--navbar-logo-size);
  justify-self: end;
}`;

export const Navbareh = styled.div` {
  grid-area: logotext;
  font-family: "Pompiere", cursive;
  font-size: 2.0rem;
  padding-left: 8px;
}`;

export const NavbarTitle = styled.div`{
  grid-area: tagline;
  justify-self: center;
  font-size: 1.0rem;
  text-shadow: #000 1px 0 10px;
  color: var(--light-color);
  font-family: "Pompiere", cursive;
}`;

export const Mx1 = styled.span` {
  padding-left: 6px;
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
  color: var(--info);
  animation: ${textFocusInKeyFrame} 1s 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;

export const TextFocusD2 = styled.span`{
  color: var(--logo-color-1);
  animation: ${textFocusInKeyFrame} 1s 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;

export const TextFocusD3 = styled.span`{
  color: var(--warning);
  animation: ${textFocusInKeyFrame} 1s 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}`;
