import {
  Navbareh,
  NavbarLogo,
  NavbarLogoAndTitleContainer,
  NavbarTitle,
  TextFocusD1,
  TextFocusD2,
  TextFocusD3
} from "./Navbar.styled";
import {Link} from "react-router-dom";
import React from "react";

export const NavbarLogoAndTitle = () => {
  return (
    <NavbarLogoAndTitleContainer>
      <NavbarLogo><Link to={"/"}><img src="/ehlogo.svg" alt=""/></Link></NavbarLogo>
      <Navbareh><Link to={"/"}>49view</Link></Navbareh>
      <NavbarTitle>
        <TextFocusD1>Your home.</TextFocusD1>{" "}
        <TextFocusD2>Your way.</TextFocusD2>{" "}
        <TextFocusD3>Now.</TextFocusD3>
      </NavbarTitle>
    </NavbarLogoAndTitleContainer>
  )
};
