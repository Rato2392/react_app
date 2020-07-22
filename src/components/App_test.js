import React from "react";
import Drawer from "./Drawer";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch, Redirect } from "react-router-dom";
import TextBox from "./Text_box";
import Content from "./Content.jsx";
import DataTable from "./DataTable.jsx";
import App_bar_ui from "./App_bar_ui.jsx";
import { Grid, AppBar, Toolbar, Card, Button } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    height: "100%",
    margin: 0,
  },

  body: {
    margin: 0,
  },
  AppBar: {
    alignItems: "center",
    height: 90,
  },
});

const App_test = () => {
  const classes = useStyles();
  return (
    <Grid
      display="static"
      direction="row"
      container
      className={classes.container}
      style={{ body: classes.body }}
      xs={12}
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Grid item container xs={1}>
        <Drawer />
      </Grid>
      <Grid
        item
        container
        xs={11}
        direction="column"
        display="static"
        alignItems="center"
        justify="center"
      >
        <App_bar_ui />

        <Switch>
          <Redirect exact from="/" to="home" />
          <Route
            exact
            path="/home"
            render={(props) => <TextBox {...props} />}
          />
          <Route
            exact
            path="/contact"
            render={(props) => <Content {...props} />}
          />
          <Route
            exact
            path="/about"
            render={(props) => <DataTable {...props} />}
          />
        </Switch>
      </Grid>
    </Grid>
  );
};
export default App_test;
