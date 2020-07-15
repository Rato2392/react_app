import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    fontWeightBold: "true",
    noWrap: "true",
  },
}));

const Content = () => {
  const classes = useStyles();
  return (
    <Grid container item position="static" direction="column">
      <Typography
        className={classes.title}
        color="initial"
        component={("h2", "b")}
      >
        <h2>Contacts</h2>
        <b>E-mail: </b>
        info [at] biodata [dot] pt
      </Typography>
      <Typography className={classes.title} color="initial">
        <b>Telephone:</b>
        (351) 214407911
      </Typography>
      <Typography className={classes.title} color="initial">
        <b>Address (Headquarters):</b>
        Rua da Quinta Grande 6, 2780-156 Oeiras, Portugal
      </Typography>
    </Grid>
  );
};

export default Content;
