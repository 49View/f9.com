import React from "react";
import {ProgressBar} from "../../futuremodules/progressbar/ProgressBar";
import {NavbarComponent} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import NavbarUser from "../../futuremodules/navbar/components/NavbarUser";
import {NavbarLogoAndTitle} from "./NavbarLogoAndTitle";
import {NavbarLeftHandSizeComponent} from "../../futuremodules/navbar/components/navbar-styled";

const Navbar = () => {

  return (
    <NavbarComponent>
      <ProgressBar/>
      <NavbarLeftHandSizeComponent>
        <NavbarLogoAndTitle/>
      </NavbarLeftHandSizeComponent>
      <NavbarUser/>
    </NavbarComponent>
  );
};

export default Navbar;
