import "./App.css";
import React, {useEffect} from "react";
import {Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar";
import {initEH} from "./init";
import Register from "./futuremodules/auth/components/Register";
import Login from "./futuremodules/auth/components/Login";
import DashboardUser from "./components/dashboardUser/DashboardUser";
import {EHAlert} from "./futuremodules/alerts/alerts";
import {apiSilent, useApi} from "./futuremodules/api/apiEntryPoint";
import {loadUser} from "./futuremodules/auth/authApiCalls";
import {Auth} from "./futuremodules/auth/authAccessors";
import {DashboardProject} from "./components/dashboardProject/DashboardProject";
import {Property} from "./components/PropertyPage/Property";
import {Body, FakeNavBar} from "./futuremodules/reactComponentStyles/reactCommon.styled";
import styled from "styled-components";

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

  const authApi = useApi(Auth);
  useEffect(() => {
    apiSilent(authApi, loadUser).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Route path="/dashboardproject" render={() => <DashboardProject auth={authApi}/>}/>
          <Route path="/property/:pid" render={() => <Property auth={authApi}/>}/>
        </Switch>
        <EHAlert/>
      </Body>
    </Content>
  );
};

export default App;
