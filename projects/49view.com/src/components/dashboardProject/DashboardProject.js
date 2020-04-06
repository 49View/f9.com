import React from "reactn";
import {getUserName, isUserAuthenticated} from "../../futuremodules/auth/authAccessors";
import {getFileNameOnlyNoExt, sanitizeURLParams} from "../../futuremodules/utils/utils";
import {useLocation} from "react-router-dom";
import {ProjectTabs} from "./DashboardProject.styled";
import {Fragment, useState} from "react";

export const DashboardProject = ({auth}) => {

  const trendId = sanitizeURLParams(getFileNameOnlyNoExt(useLocation().pathname));
  const [activeTab, setActiveTab] = useState("DataSources");

  if (!isUserAuthenticated(auth) || trendId === null) {
    return (<Fragment/>)
    // return (<Redirect to={"/"}/>)
  }

  const username = getUserName(auth);

  return (
      <ProjectTabs>
      </ProjectTabs>
  );
};
