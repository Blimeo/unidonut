import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./Home";

import HeaderComponent from "./HeaderComponent";
// import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

const { Footer } = Layout;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout className="layout">
          <HeaderComponent />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about">{/* <About loggedIn={loggedIn} /> */}</Route>
            <Route path="/connect" component={Home} exact />
          </Switch>
          <Footer style={{ textAlign: "center" }}>Unidonut ©2021</Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
