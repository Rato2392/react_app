import React, { useState } from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import ReactCSSTransitionGroup from "react-transition-group";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    color: "white",
    backgroundColor: "black",
    transition: "850ms",
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
  },
}));

const Drawer_ui = (props) => {
  const theme = useTheme();

  const { history } = props;
  const classes = useStyles();
  const itemsList = [
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

  const clickhandler = (e) => {
    e.preventDefault();
    props.close();
  };
  return (
    <MUIDrawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={clickhandler}
            style={{ color: "rgb(0 172 193)" }}
          >
            close
          </IconButton>
        </div>
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
    </MUIDrawer>
  );
};

export default withRouter(Drawer_ui);
