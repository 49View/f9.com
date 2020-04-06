import React, {Fragment} from "react";
import {useGlobal} from "reactn";
import {Link, useLocation} from "react-router-dom";
import {ProgressBar} from "../futuremodules/progressbar/ProgressBar";
import {LinkContainer} from "react-router-bootstrap";
import {
  Mx1,
  NavbarComponent,
  Navbareh,
  NavbarLogo,
  NavbarLogoAndTitle,
  NavbarTitle,
  TextFocusD1,
  TextFocusD2,
  TextFocusD3,
  TextShadow,
  UserNameText
} from "./Navbar.styled";
import {getUserName, logoffFromProject, useGetAuth} from "../futuremodules/auth/authAccessors";
import {isReservedWordSanitized} from "../futuremodules/utils/utils";
import Button from "react-bootstrap/Button";

const Navbar = () => {

  const location = useLocation();
  const [, setTrend] = useGlobal('trendId');
  const auth = useGetAuth();
  const userName = getUserName(auth);
  const isLocationReserved = isReservedWordSanitized(location.pathname);

  let linkContent = <Fragment/>;

  if (!isLocationReserved && userName) {
    linkContent = (
      <Link to="/dashboarduser" onClick={() => {
        logoffFromProject(auth);
        setTrend(null).then();
      }}>
        {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
      </Link>
    )
  }
  if (!isLocationReserved && !userName) {
    linkContent = (
      <UserNameText>
        <LinkContainer key={"register"} to={"/register"}>
          <Button variant={"info"}> <i className="fas fa-user"/>{" "}Register{" "}</Button>
        </LinkContainer>
        <Mx1/>
        <LinkContainer key={"login"} to={"/login"}>
          <Button variant={"primary"}> {" "}<i className="fas fa-rocket"/>{" "}Login</Button>
        </LinkContainer>
      </UserNameText>
    )
  }

  return (
    <NavbarComponent>
      <NavbarLogoAndTitle>
        <NavbarLogo><Link to={"/"}><img src="/ehlogo.svg" alt=""/></Link></NavbarLogo>
        <Navbareh><Link to={"/"}>49view</Link></Navbareh>
      </NavbarLogoAndTitle>
      <NavbarTitle>
        <TextShadow>
          <TextFocusD1>Your home.</TextFocusD1>{" "}
          <TextFocusD2>Your way.</TextFocusD2>{" "}
          <TextFocusD3>Now.</TextFocusD3>
        </TextShadow>
      </NavbarTitle>
      {linkContent}
      <ProgressBar/>
    </NavbarComponent>
  );
};

export default Navbar;
