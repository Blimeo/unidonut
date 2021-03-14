import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Header from "./Header";
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";


function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Work Sans"',
        '"Helvetica Neue"',
      ].join(","),
    },
  });
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/meet">
                {/* <Meet loggedIn={loggedIn} /> */}
              </Route>
            </Switch>
          </main>
          {/* <Footer /> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
