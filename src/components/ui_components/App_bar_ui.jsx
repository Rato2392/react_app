import React from "react";
import { Toolbar, AppBar, Grid, Card } from "@material-ui/core";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

//import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  colour: {
    backgroundColor: "Orange",
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
    backgroundColor: "orange",
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
      icon: <HomeIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/Login"),
    },
    {
      text: "Register",
      icon: <MailIcon style={{ color: "orange" }} />,
      onClick: () => history.push("/Register"),
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
      <AppBar position="static" className={classes.colour} elevation={0}>
        <Toolbar
          className={classes.AppBar}
          disableGutters={false}
          square="true"
        >
          <Card elevation={0} square={true}>
            <List style={flexContainer}>
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
