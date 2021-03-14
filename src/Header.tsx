import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
export default function Home() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Unidonut
        </Typography>
      </Toolbar>
    </AppBar>
  );
}