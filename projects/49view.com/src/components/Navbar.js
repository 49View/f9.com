import React, {Fragment} from "react";
import {useGlobal} from "reactn";
import {Link, useLocation} from "react-router-dom";
import {ProgressBar} from "../futuremodules/progressbar/ProgressBar";
import {NavbarComponent, Navbareh, NavbarGrid, NavbarLogo, NavbarTitle, UserNameText} from "./Navbar.styled";
import {getUserName, logoffFromProject, useGetAuth} from "../futuremodules/auth/authAccessors";
import {
  getFileNameOnlyNoExt,
  isReservedWord,
  isReservedWordSanitized,
  sanitizeAvoidReservedWords
} from "../futuremodules/utils/utils";

const Navbar = (props) => {

  const location = useLocation();
  const [, setTrend] = useGlobal('trendId');
  const auth = useGetAuth();
  const userName = getUserName(auth);
  const isLocationReserved = isReservedWordSanitized(location.pathname);
  const propTrendId = !isLocationReserved && getFileNameOnlyNoExt(sanitizeAvoidReservedWords(props.trendId));

  let linkContent = <Fragment/>;

  if (!isReservedWord(props.trendId) && !isLocationReserved && userName) {
    linkContent = (
      <Link to="/dashboarduser" onClick={() => {
        logoffFromProject(auth);
        setTrend(null).then();
      }}>
        {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
      </Link>
    )
  }
  if (!isReservedWord(props.trendId) && !isLocationReserved && !userName) {
    linkContent = (
      <Fragment>
        <Link key={"login"} to={"/register"}>
          <i className="fas fa-user-plus"/>{" "}Register{" "}
        </Link>
        <Link key={"login"} to={"/login"}>
          {" "}<i className="fas fa-rocket"/>{" "}Login
        </Link>
      </Fragment>
    )
  }

  return (
    <NavbarComponent>
      <ProgressBar/>
      <NavbarGrid>
        <NavbarLogo onClick={() => {
          setTrend(null).then();
        }}>
          <Link to={"/"}>
            <img src="/ehlogo.svg" alt=""/>
          </Link>
        </NavbarLogo>
        <Navbareh onClick={() => {
          setTrend(null).then();
        }}>
          <Link to={"/"}>
            <span className="colorLogo2">49view</span>
          </Link>
        </Navbareh>
        <NavbarTitle/>
        <UserNameText>{linkContent}</UserNameText>
      </NavbarGrid>
    </NavbarComponent>
  );
};

export default Navbar;
