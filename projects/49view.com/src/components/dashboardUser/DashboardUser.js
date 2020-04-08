import React, {withGlobal} from "reactn";
import {DashboardUserFragment} from "./DashboardUser.styled";
import WelcomeToTheJungle from "./subcomponents/WelcomeToTheJungle"
import {Logoff} from "./subcomponents/Logoff";
import UserAssets from "./subcomponents/UserAssets";

const DashboardUser = (props) => {

  const auth = props.auth;

  // useEffect( () => {
  //   if ( !auth ) {
  //     // if (!isUserAuthenticated(auth)) {
  //       return (<Redirect to={"/"}/>)
  //     // }
  //   }
  // }, [auth]);

  return (
    <DashboardUserFragment>
      <WelcomeToTheJungle auth={auth}/>
      <UserAssets/>
      {/*<AssetCreator auth={auth}/>*/}
      {/*/!*<AssetInvitations auth={auth}/>*!/*/}
      <Logoff auth={auth}/>
    </DashboardUserFragment>
  );
};

export default withGlobal(
  global => ({
    auth: global.auth,
  }),
)(DashboardUser);
