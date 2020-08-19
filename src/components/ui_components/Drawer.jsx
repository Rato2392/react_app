import React from "react";
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
import IconButton from "@material-ui/core/IconButton";
const drawerWidth = 240;
const useStyles = makeStyles({
  MuiPaper: {
    color: "white",
    backgroundColor: "black",
  },
});

const Drawer = (props) => {
  const [open, setOpen] = React.useState(false);

  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/home"),
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
    {
      text: "Form",
      icon: <MailIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/form"),
    },
  ];
  return (
    <MUIDrawer
      variant="permanent"
      classes={{ paper: classes.MuiPaper }}
      width={{ width: "100%" }}
    >
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
