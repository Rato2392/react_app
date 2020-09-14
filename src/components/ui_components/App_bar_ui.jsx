import React, { useState } from "react";
import { Toolbar, AppBar, Grid, Card } from "@material-ui/core";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import InboxIcon from "@material-ui/icons/MoveToInbox";
const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  colour: {
    backgroundColor: "#00acc1",
    width: "100%",
    marginLeft: 0,
  },
  AppBar: {
    alignItems: "center",
    height: 90,
    width: "100%",
  },
  grid_container: {
    spacing: 0,
    backgroundColor: "#00acc1",
  },
}));

const App_bar_ui = (props) => {
  //horizontal list
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  };
  //passing props from APP
  const { history } = props;
  const classes = useStyles();
  //defining the routes used
  const itemsList = [
    {
      text: "Login",
      icon: <HomeIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/Login"),
    },
    {
      text: "Register",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/Register"),
    },
    {
      text: "Logout",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/Logout"),
    },
    {
      text: "Home",
      icon: <HomeIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/home"),
    },
    {
      text: "About",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/about"),
    },
    {
      text: "Contact",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/contact"),
    },
    {
      text: "Form",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/form"),
    },
  ];

  return (
    <Grid
      container
      item
      direction="column"
      justify="center"
      alignItems="center"
      xs={12}
      className={classes.grid_container}
    >
      <AppBar position="fixed" className={clsx(classes.colour)} elevation={0}>
        <Toolbar
          className={classes.AppBar}
          disableGutters={false}
          square="true"
        >
          <Card elevation={0} square={true}>
            <List style={flexContainer}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.click}
              >
                <MenuIcon style={{ color: "rgb(0 172 193)" }} />
                <ListItemText primary={"Show"} />
              </IconButton>
              {itemsList.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default withRouter(App_bar_ui);
