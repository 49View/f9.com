import React from "react";
import {Link} from "react-router-dom";
import {ProgressBar} from "../futuremodules/progressbar/ProgressBar";
import {LinkContainer} from "react-router-bootstrap";
import {
  Navbareh,
  NavbarLogo,
  NavbarLogoAndTitle,
  NavbarTitle,
  TextFocusD1,
  TextFocusD2,
  TextFocusD3
} from "./Navbar.styled";
import {getUserName, logoffFromProject, useGetAuth} from "../futuremodules/auth/authAccessors";
import Button from "react-bootstrap/Button";
import {Mx1, NavbarComponent} from "../futuremodules/reactComponentStyles/reactCommon.styled";

const Navbar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);

  const linkContent = userName ? (
      <Link to="/dashboarduser" onClick={() => {
        logoffFromProject(auth);
      }}>
        {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
      </Link>
    ) : (
      <div>
        <LinkContainer key={"register"} to={"/register"}>
          <Button variant={"info"}> <i className="fas fa-user"/>{" "}Register{" "}</Button>
        </LinkContainer>
        <Mx1/>
        <LinkContainer key={"login"} to={"/login"}>
          <Button variant={"primary"}> {" "}<i className="fas fa-rocket"/>{" "}Login</Button>
        </LinkContainer>
      </div>
    );

  return (
    <NavbarComponent>
      <NavbarLogoAndTitle>
        <NavbarLogo><Link to={"/"}><img src="/ehlogo.svg" alt=""/></Link></NavbarLogo>
        <Navbareh><Link to={"/"}>49view</Link></Navbareh>
        <NavbarTitle>
          <TextFocusD1>Your home.</TextFocusD1>{" "}
          <TextFocusD2>Your way.</TextFocusD2>{" "}
          <TextFocusD3>Now.</TextFocusD3>
        </NavbarTitle>
      </NavbarLogoAndTitle>
      {linkContent}
      <ProgressBar/>
    </NavbarComponent>
  );
};

export default Navbar;
