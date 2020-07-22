import React from "react";
import {
  Toolbar,
  AppBar,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@material-ui/core";

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
  const classes = useStyles();
  return (
    <Grid
      container
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
          <Card elevation={0} square={true}></Card>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default App_bar_ui;
