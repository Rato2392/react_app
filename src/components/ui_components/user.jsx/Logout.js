import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  text_field_container: {
    margin: 25,
    marginTop: 50,
    position: "static",
    marginBottom: 25,
    width: "100%",
    height: "100%",
  },
  text_field_spacing: { margin: 25 },
  title: {
    fontSize: 16,
    fontWeight: "fontWeightBold",
  },
  paper_center: {
    justifyContent: "center",
    direction: "row",
    justify: "center",
    alignItems: "center",
    width: 500,
    border: "12px solid rgb(0 172 193)",
  },
  button_style: {
    boxShadow:
      "0px 3px 1px -2px rgb(0 172 193), 0px 2px 2px 0px  rgb(0 172 193), 0px 1px 5px 0px  rgb(0 172 193)",
    backgroundColor: "#ffffff",
  },
}));

const Logout = ({ setAuth }) => {
  const classes = useStyles();
  const end_session = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <Grid xs={12} container item position="static" direction="row">
      <Grid xs={2} container item />
      <Grid
        xs={8}
        container
        item
        position="static"
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.text_field_container}
      >
        <Card elevation={3} className={classes.paper_center} variant="outlined">
          <CardContent
            type="text"
            style={{ width: "100%" }}
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "fontWeightBold",
            }}
          >
            {" "}
            Do you wish to log out?{" "}
          </CardContent>
          <CardContent>
            <Button
              variant="contained"
              type="link"
              style={{ width: "100%" }}
              className={classes.button_style}
              href="/login"
              onClick={end_session}
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={2} container item />
    </Grid>
  );
};

export default Logout;
