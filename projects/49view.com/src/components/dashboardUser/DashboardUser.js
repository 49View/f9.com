import React, {useContext} from "react";
import {WelcomeToTheJungle} from "../../futuremodules/auth/components/WelcomeToTheJungle"
import {Logoff} from "../../futuremodules/auth/components/Logoff";
import {UserAssets} from "./subcomponents/UserAssets";
import {AuthContext} from "../../futuremodules/auth/authContext";
import {SpinnerTopMiddle} from "../../futuremodules/spinner/Spinner";
import {Redirect} from "react-router-dom";
import {AnimSlideIn} from "../../futuremodules/reactComponentStyles/reactCommon.animations";
import {ContainerSectionShadowed} from "../../futuremodules/reactComponentStyles/reactCommon.styled";

export const DashboardUser = () => {

  const auth = useContext(AuthContext);

  return (
    <AnimSlideIn>
      {auth.user === null && <Redirect to={"/"}/>}
      {auth.user === undefined && <SpinnerTopMiddle/>}
      {auth.user &&
      <ContainerSectionShadowed>
        <WelcomeToTheJungle username={auth.user.name}/>
        <UserAssets user={auth.user}/>
        <Logoff/>
      </ContainerSectionShadowed>}
    </AnimSlideIn>
  );
};
