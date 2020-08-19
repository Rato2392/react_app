import React, { useState } from "react";
import Drawer from "./ui_components/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import TextBox from "./ui_components/Text_box";
import Form from "./ui_components/Form";

import Content from "./ui_components/Content.jsx";
import DataTable from "./ui_components/DataTable.jsx";
import App_bar_ui from "./ui_components/App_bar_ui.jsx";
import { Grid } from "@material-ui/core";

//import user register & login

import Login from "./ui_components/user.jsx/Login";
import Register from "./ui_components/user.jsx/Register";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Grid
      display="static"
      direction="row"
      container
      item
      className={classes.container}
      style={{ body: classes.body }}
      xs={12}
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Grid item container xs={2}>
        <Drawer />
      </Grid>
      <Grid
        item
        container
        xs={9}
        direction="column"
        display="static"
        alignItems="center"
        justify="center"
      >
        <App_bar_ui />

        <Switch>
          <Redirect exact from="/react_app" to="home" />
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
          <Route exact path="/form" render={(props) => <Form {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/home" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Grid>
    </Grid>
  );
}
export default App;
