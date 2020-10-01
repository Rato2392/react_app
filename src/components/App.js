import React, { useState, useEffect } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

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
import Alert from "@material-ui/lab/Alert";
//import Drawer_ui from "./ui_outdated/Drawer_ui.jsx";//

//import user register & login

import Login from "./ui_components/user/Login";
import Register from "./ui_components/user/Register";
import Logout from "./ui_components/user/Logout";

//study
import NewStudy from "./ui_components/study/new_study_form";
import UserStudy from "./ui_components/study/user_study";

//seq
import NewSeq from "./ui_components/sequences/new_seq";
import UsersSeq from "./ui_components/sequences/get_seq";
//meta
import NewMeta from "./ui_components/metadata/new_meta";
import UsersMeta from "./ui_components/metadata/get_meta";

//design
import Stepper from "./design_components/stepper";

//configure app to accept toast notifications
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    height: "100%",
    minHeight: "100vh",
  },

  body: {
    margin: "0px",
  },
  app_bar_width: { width: "inherit" },
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();

  // authentication
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/isverify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(parseRes);
    } catch (error) {}
  }

  useEffect(() => {
    isAuth();
  });
  // end of authentication

  // CODE TO REMOVE WHITE BORDER AROUND THE BODY IMPORTANT//
  //<style jsx global>
  //      {`
  //      body {
  //          margin: 0px;
  //          padding: 0px;
  //        }
  //      `}
  //    </style>

  return (
    <div>
      <style jsx global>
        {`
          body {
            margin: 0px;
            padding: 0px;
          }
        `}
      </style>

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
        <App_bar_ui />
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
            <Route
              exact
              path="/new-study"
              render={(props) =>
                isAuthenticated ? (
                  <NewStudy {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/user-study"
              render={(props) =>
                isAuthenticated ? (
                  <UserStudy {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/new-seq"
              render={(props) =>
                isAuthenticated ? (
                  <NewSeq {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/users-seq"
              render={(props) =>
                isAuthenticated ? (
                  <UsersSeq {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/new-meta"
              render={(props) =>
                isAuthenticated ? (
                  <NewMeta {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/stepper"
              render={(props) =>
                isAuthenticated ? (
                  <Stepper {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/users-meta"
              render={(props) =>
                isAuthenticated ? (
                  <UsersMeta {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
