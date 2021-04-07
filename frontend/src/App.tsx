import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./Home";

import HeaderComponent from "./components/Header/HeaderComponent";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

const { Footer } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Layout className="layout">
          <HeaderComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Switch>
            <Route path="/" exact >
              <Home loggedIn={loggedIn} />
              </Route>
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
