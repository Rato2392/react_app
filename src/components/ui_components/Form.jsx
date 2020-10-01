import React from "react";
import { Grid } from "@material-ui/core";

import ListTodos from "./List_Users";
import ListStudy from "./study/study_list";

const Form = () => {
  return (
    <Grid
      xs={12}
      container
      item
      position="static"
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid xs={10} item position="static" direction="row" spacing={2}>
        <ListTodos />
      </Grid>
      <Grid xs={10} item position="static" direction="row" spacing={2}>
        <ListStudy />
      </Grid>
      <Grid xs={10} item position="static" direction="row" spacing={2}></Grid>
    </Grid>
  );
};

export default Form;
