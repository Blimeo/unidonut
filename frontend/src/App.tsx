import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./Home";
import Admin from "./Admin";

import HeaderComponent from "./components/Header/HeaderComponent";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

const { Footer } = Layout;

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        const response = await fetch(`/auth/verify_access_token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoggedIn(response.ok);
        const json = await response.json();
        console.log(json);
      } else {
        setLoggedIn(false);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        const response = await fetch(`/auth/verify_admin`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(response.ok);
      }
    };
    fetchData();
  }, [loggedIn]);

  return (
    <div>
      <BrowserRouter>
        <Layout className="layout">
          <HeaderComponent
            isAdmin={isAdmin}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Switch>
            <Route path="/" exact>
              <Home loggedIn={loggedIn} />
            </Route>
            <Route path="/about">{/* <About loggedIn={loggedIn} /> */}</Route>
            <Route path="/connect" component={Home} exact />
            <Route path="/admin" component={Admin} exact />
          </Switch>
          <Footer style={{ textAlign: "center" }}>Unidonut ©2021</Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
