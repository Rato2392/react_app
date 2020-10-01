import React from "react";
import { Toolbar, AppBar, Grid, Card } from "@material-ui/core";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";

import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Menu from "@material-ui/core/Menu";
//styles
const useStyles = makeStyles((theme) => ({
  colour: {
    backgroundColor: "#00acc1",
  },
  AppBar: {
    alignItems: "center",
    height: 90,
  },
  grid_container: {
    backgroundColor: "#00acc1",
  },
  card_container: {
    flexGrow: 1,
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
  //get styles class
  const classes = useStyles();

  /**
   * get open state for the login/register/logout componnent
   * set where the menu will open
   *
   * handletoggle function, open the menu on press
   *
   * handleclose function, close when press outside menu
   */

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // list of items that show up on user menu
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
  ];

  //list of items on the app bar
  const menulist = [
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

    {
      text: "My studies",
      icon: <MailIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/user-study"),
    },
    {
      text: "My seq",
      icon: <HomeIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/users-seq"),
    },
    {
      text: "Stepper",
      icon: <HomeIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/stepper"),
    },
    {
      text: "My metadata",
      icon: <HomeIcon style={{ color: "rgb(0 172 193)" }} />,
      onClick: () => history.push("/users-meta"),
    },
  ];

  return (
    <Grid
      container
      item
      direction="row"
      justify="space-between"
      alignItems="center"
      xs={12}
      className={classes.grid_container}
    >
      <AppBar position="static" className={clsx(classes.colour)} elevation={0}>
        <Toolbar
          className={classes.AppBar}
          disableGutters={false}
          square="true"
        >
          <Grid item className={classes.card_container}>
            <List style={flexContainer}>
              {menulist.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <Card elevation={0} square={true}>
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorRef.current}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        {itemsList.map((item, index) => {
                          const { text, icon, onClick } = item;
                          return (
                            <Card elevation={0} square={true}>
                              <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                              </ListItem>
                            </Card>
                          );
                        })}
                      </Menu>
                    </ListItem>
                  </Card>
                );
              })}
            </List>
          </Grid>
          <Grid item>
            <IconButton ref={anchorRef} onClick={handleToggle} edge="end">
              <AccountCircleIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorRef.current}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {itemsList.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <Card elevation={0} square={true}>
                    <ListItem button key={text} onClick={onClick}>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText primary={text} />
                    </ListItem>
                  </Card>
                );
              })}
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default withRouter(App_bar_ui);
