import React, { useState } from "react";
import Drawer from "./ui_components/Drawer_ui";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import {
  Route,
  Switch,
  Redirect,
  //BrowserRouter as Router,
} from "react-router-dom";
import TextBox from "./ui_components/Text_box";
import Form from "./ui_components/Form";

import Content from "./ui_components/Content.jsx";
import DataTable from "./ui_components/DataTable.jsx";
import App_bar_ui from "./ui_components/App_bar_ui.jsx";
import { Grid } from "@material-ui/core";

import Drawer_ui from "./ui_components/Drawer_ui.jsx";
//import user register & login

import Login from "./ui_components/user.jsx/Login";
import Register from "./ui_components/user.jsx/Register";
import Logout from "./ui_components/user.jsx/Logout";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%",
    minHeight: "100vh",
  },

  body: {
    margin: 0,
  },
  app_bar_width: { width: "inherit" },
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();
  //drawer
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const sidebarclosehandler = () => {
    setOpen(false);
  };
  let sidebar;
  if (open) {
    sidebar = (
      <div>
        <Drawer_ui close={sidebarclosehandler} />{" "}
        <App_bar_ui
          style={{ width: "100%" - 200 }}
          className={{ Grid: classes.app_bar_width }}
        />
      </div>
    );
  }

  //end of drawer
  // authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // end of authentication
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
      alignItems="baseline"
      justify="center"
    >
      {" "}
      <App_bar_ui click={openHandler} />
      {sidebar}
      <Grid
        item
        container
        xs={12}
        direction="column"
        display="static"
        alignItems="center"
        justify="center"
      >
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
          <Route
            exact
            path="/logout"
            render={(props) =>
              isAuthenticated ? (
                <Logout {...props} setAuth={setAuth} />
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
