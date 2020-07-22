import React from "react";
import { Grid } from "@material-ui/core";

import Table_Test from "./Table.jsx";
import Data_Table from "./Graph.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  main_container: {
    marginTop: 25,
    position: "static",

    width: "100%",
    height: "100%",
  },
  second_container: {
    margin: 25,
    marginTop: 25,
    position: "static",
    marginBottom: 25,
    width: "100%",
    height: "100%",
  },
}));

const DataTable = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      xs={12}
      className={classes.main_container}
      justify="space-between"
    >
      <Grid container item xs={12} className={classes.second_container} item>
        <Table_Test />
      </Grid>
      <Grid container item xs={12} className={classes.second_container} item>
        <Data_Table />
      </Grid>
    </Grid>
  );
};

export default DataTable;
