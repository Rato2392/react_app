import React from "react";
import {
  Toolbar,
  AppBar,
  Button,
  Grid,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Biodata_elixir from "C:\\Users\\João\\react-app\\src\\components\\images\\biodata_elixi.png";
import TextBox from "./Text_box";
import Content from "./Content.jsx.js";
import DataTable from "./DataTable.jsx.js";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
  colour: {
    backgroundColor: "white",
  },
  button_size: {
    height: 90,
    width: 940,
  },
  button_style: {
    backgroundColor: "white",
    height: 90,
    padding: 0,
  },
  AppBar: {
    alignItems: "center",
    height: 90,
  },
  avatar_size: {
    height: 90,
    width: 940,
  },
  colour2: {
    backgroundColor: "black",
  },
  size: {
    width: 250,
    height: 64,
  },
}));

const Home = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "about",
    1: "contact",
    2: "table",
  };

  const indexToTabName = {
    about: 0,
    contact: 1,
    table: 2,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        justify="center"
        alignItems="center"
      >
        <Grid item container direction="row" position="static">
          <Grid item xs={3} sm={3} />
          <Grid container item xs={3} sm={6} position="static">
            <AppBar position="static" className={classes.colour} elevation={0}>
              <Toolbar
                className={classes.AppBar}
                disableGutters={false}
                square="true"
              >
                <Card elevation={0} square={true}>
                  <Button
                    className={classes.button_style}
                    fullWidth={true}
                    disableRipple={true}
                    disableElevation={true}
                    disableFocusRipple={true}
                    href="http://localhost:3000/home/about"
                    block="true"
                  >
                    <CardMedia
                      img="true"
                      src={Biodata_elixir}
                      className={classes.avatar_size}
                      component="img"
                    />
                  </Button>
                </Card>
              </Toolbar>
            </AppBar>
            <AppBar position="static" className={classes.colour2} elevation={0}>
              <Toolbar>
                <Tabs value={selectedTab} onChange={handleChange}>
                  <Tab label="about" />
                  <Tab label="contact" />
                  <Tab label="table" />
                </Tabs>
              </Toolbar>
            </AppBar>
            {selectedTab === 0 && <TextBox />}
            {selectedTab === 1 && <Content />}
            {selectedTab === 2 && <DataTable />}
            <Grid item xs={3} sm={3} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
