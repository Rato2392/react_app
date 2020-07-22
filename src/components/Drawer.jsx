import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Button,
  Grid,
  Tabs,
  Tab,
  Card,
  CardMedia,
  Paper,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  MuiPaper: {
    color: "white",
    backgroundColor: "black",
  },
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/"),
    },
    {
      text: "About",
      icon: <MailIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/about"),
    },
    {
      text: "Contact",
      icon: <MailIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/contact"),
    },
  ];
  return (
    <MUIDrawer variant="permanent" classes={{ paper: classes.MuiPaper }}>
      <List>
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

export default withRouter(Drawer);
