import "./App.css";
import React from "react";
import {Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Register from "./futuremodules/auth/components/Register";
import Login from "./futuremodules/auth/components/Login";
import {DashboardUser} from "./components/dashboardUser/DashboardUser";
import {EHAlert} from "./futuremodules/alerts/alerts";
import {Property} from "./components/PropertyPage/Property";
import {Body, FakeNavBar} from "./futuremodules/reactComponentStyles/reactCommon.styled";
import {Content} from "./App.styled";
// import {AnimatePresence} from "framer-motion";

const App = () => {

  return (
    <Content>
      <Navbar/>
      <FakeNavBar/>
      <Body>
        {/*<AnimatePresence key={"app.js"} exitBeforeEnter initial={false}>*/}
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/dashboarduser" component={DashboardUser}/>
            <Route path="/property/:pid" component={Property}/>
          </Switch>
        {/*</AnimatePresence>*/}
      </Body>
      <EHAlert/>
    </Content>
  );
};

export default App;
