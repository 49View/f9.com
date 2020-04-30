import React, {useContext} from "react";
import {DashboardUserFragment} from "./DashboardUser.styled";
import {WelcomeToTheJungle} from "../../futuremodules/auth/components/WelcomeToTheJungle"
import {Logoff} from "../../futuremodules/auth/components/Logoff";
import {UserAssets} from "./subcomponents/UserAssets";
import {AuthContext} from "../../futuremodules/auth/authContext";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Redirect} from "react-router-dom";

export const DashboardUser = () => {

  const auth = useContext(AuthContext);

  if ( auth.user === null ) {
    return (<Redirect to={"/"}/>)
  }

  if ( auth.user === undefined ) {
    return (<SpinnerTopMiddle/>)
  }

  return (
    <DashboardUserFragment>
      <WelcomeToTheJungle username={auth.user.name}/>
      <UserAssets user={auth.user}/>
      <Logoff tagline={"Great Scott, get me out of here"}/>
    </DashboardUserFragment>
  );
};
