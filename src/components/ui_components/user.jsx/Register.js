import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ListTodos from "../List_Users";

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
    border: "12px solid rgb(255 165 0)",
  },
  button_style: {
    boxShadow:
      "0px 3px 1px -2px rgb(255 165 0), 0px 2px 2px 0px rgb(255 165 0), 0px 1px 5px 0px rgb(255 165 0)",
    backgroundColor: "#ffffff",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    users_password: "",
    institute: "",
  });
  const { first_name, last_name, email, users_password, institute } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    try {
      const body = { first_name, last_name, email, users_password, institute };
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
        <Card
          elevation={3}
          className={classes.paper_center}
          variant="outlined"
          borderRadius={{ borderRadius: 3 }}
        >
          <form onSubmit={onSubmitForm}>
            <CardHeader
              title="Register"
              display="static"
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "fontWeightBold",
              }}
            />
            <CardContent>
              <TextField
                required
                type="text"
                id="outlined-basic"
                variant="outlined"
                value={first_name}
                name="first_name"
                placeholder="First name"
                onChange={(e) => onChange(e)}
                style={{ width: "100%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                required
                type="text"
                id="outlined-basic"
                variant="outlined"
                value={last_name}
                placeholder="Last name"
                name="last_name"
                onChange={(e) => onChange(e)}
                style={{ width: "100%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                required
                type="email"
                id="outlined-basic"
                variant="outlined"
                value={email}
                placeholder="E-mail"
                name="email"
                onChange={(e) => onChange(e)}
                style={{ width: "100%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                required
                type="password"
                id="outlined-basic"
                variant="outlined"
                value={users_password}
                placeholder="Password"
                name="users_password"
                onChange={(e) => onChange(e)}
                style={{ width: "100%" }}
              />
            </CardContent>
            <CardContent>
              <TextField
                type="text"
                id="outlined-basic"
                variant="outlined"
                value={institute}
                placeholder="Institute"
                name="institute"
                onChange={(e) => onChange(e)}
                style={{ width: "100%" }}
              />
            </CardContent>
            <CardContent>
              <Button
                variant="contained"
                type="submit"
                style={{ width: "100%" }}
                className={classes.button_style}
              >
                {" "}
                Submit{" "}
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <Grid xs={2} container item />
    </Grid>
  );
};

export default Register;
