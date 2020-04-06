import React from "reactn";
import {isUserAuthenticated} from "../../futuremodules/auth/authAccessors";
import {ProjectTabs} from "./DashboardProject.styled";
import {Fragment} from "react";

export const DashboardProject = ({auth}) => {

  if (!isUserAuthenticated(auth)) {
    return (<Fragment/>)
  }

  // const username = getUserName(auth);

  return (
      <ProjectTabs>
      </ProjectTabs>
  );
};
