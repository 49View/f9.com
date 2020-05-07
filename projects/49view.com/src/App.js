import "./App.css";
import React from "react";
import {Route, Switch, useLocation} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import Register from "./futuremodules/auth/components/Register";
import Login from "./futuremodules/auth/components/Login";
import {DashboardUser} from "./components/dashboardUser/DashboardUser";
import {EHAlert} from "./futuremodules/alerts/alerts";
import {Property} from "./components/PropertyPage/Property";
import {Body, FakeNavBar} from "./futuremodules/reactComponentStyles/reactCommon.styled";
import {Content} from "./App.styled";
import {AnimatePresence} from "framer-motion";
import {Buy} from "./components/dashboardUser/subcomponents/UserSubscriptions";
import {Excalibur} from "./components/excalibur/Excalibur";

const App = () => {

  let location = useLocation();

  return (
      <Content>
        <Navbar/>
        <FakeNavBar/>
        <Body>
          <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/buy" component={Buy}/>
            <Route exact path="/excalibur" component={Excalibur}/>
            <Route exact path="/dashboarduser" component={DashboardUser}/>
            <Route exact path="/property/:pid" component={Property}/>
          </Switch>
          </AnimatePresence>
        </Body>
        <EHAlert/>
      </Content>
  );
};

export default App;
