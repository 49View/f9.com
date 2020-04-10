import React from "react";
import {ProgressBar} from "../../futuremodules/progressbar/ProgressBar";
import {NavbarComponent} from "../../futuremodules/reactComponentStyles/reactCommon.styled";
import NavbarUser from "../../futuremodules/navbar/components/NavbarUser";
import {NavbarLogoAndTitle} from "./NavbarLogoAndTitle";

const Navbar = () => {

  return (
    <NavbarComponent>
      <ProgressBar/>
      <NavbarLogoAndTitle/>
      <NavbarUser/>
    </NavbarComponent>
  );
};

export default Navbar;
