import "./App.css";
import React from "react";
import {Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import {initEH} from "./init";
import Register from "./futuremodules/auth/components/Register";
import Login from "./futuremodules/auth/components/Login";
import DashboardUser from "./components/dashboardUser/DashboardUser";
import {EHAlert} from "./futuremodules/alerts/alerts";
import {Property} from "./components/PropertyPage/Property";
import {Body, FakeNavBar} from "./futuremodules/reactComponentStyles/reactCommon.styled";
import styled from "styled-components";
import {useAuth} from "./AppLogic";

initEH();

const Content = styled.section` {
    background: url("/grant-UhpYKnqZwE8-unsplash.jpg") no-repeat center center
      fixed;
    height: auto;
    min-height: 100vh;  
    background-size: cover;
    overflow: hidden;
  }`;

const App = () => {

  useAuth();

  return (
    <Content>
      <Navbar/>
      <FakeNavBar/>
      <Body>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/dashboarduser" component={DashboardUser}/>
          <Route path="/property/:pid" component={Property}/>
        </Switch>
      </Body>
      <EHAlert/>
    </Content>
  );
};

export default App;
