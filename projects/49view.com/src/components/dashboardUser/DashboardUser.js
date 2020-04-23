import React, {withGlobal} from "reactn";
import {DashboardUserFragment} from "./DashboardUser.styled";
import {WelcomeToTheJungle} from "../../futuremodules/auth/components/WelcomeToTheJungle"
import {Logoff} from "../../futuremodules/auth/components/Logoff";
import UserAssets from "./subcomponents/UserAssets";
import {Redirect} from "react-router-dom";
import {Fragment} from "react";

const DashboardUser = (props) => {

  if ( props.auth === null ) {
    return (<Redirect to={"/"}/>);
  }
  if ( props.auth === undefined ) {
    return (<Fragment/>)
  }

  return (
    <DashboardUserFragment>
      <WelcomeToTheJungle/>
      <UserAssets/>
      <Logoff tagline={"Great Scott, get me out of here"}/>
    </DashboardUserFragment>
  );
};

export default withGlobal(
  global => ({
    auth: global.auth,
  }),
)(DashboardUser);
