import React from "react";
import {ProgressBar} from "../../futuremodules/progressbar/ProgressBar";
import {NavbarComponent} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import {NavbarUser} from "../../futuremodules/navbar/components/NavbarUser";
import {NavbarLogoAndTitle} from "./NavbarLogoAndTitle";
import {NavbarLeftHandSizeComponent, NavbarTaglineText} from "../../futuremodules/navbar/components/navbar-styled";

const Navbar = () => {

  return (
    <NavbarComponent>
      <ProgressBar/>
      <NavbarLeftHandSizeComponent>
        <NavbarLogoAndTitle/>
      </NavbarLeftHandSizeComponent>
      <NavbarTaglineText>
        {/*Immersive Virtual Experiences*/}
      </NavbarTaglineText>
      <NavbarUser/>
    </NavbarComponent>
  );
};

export default Navbar;
