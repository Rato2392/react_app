import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ListTodos from "./List_Users";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    fontWeightBold: "true",
    noWrap: "true",
  },
}));

const Form = () => {
  //const classes = useStyles();

  const [first_name, setfirst_name] = useState("");

  const onSubmitForm = async (e) => {
    try {
      const body = { first_name };
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid xs={12} container item position="static" direction="column">
      <Grid xs={5} container item position="static" direction="row">
        <form onSubmit={onSubmitForm}>
          <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          />
          <Button type="submit"> add </Button>
        </form>
        <ListTodos />
      </Grid>
    </Grid>
  );
};

export default Form;
