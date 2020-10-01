import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";

const useStyles = makeStyles(() => ({
  text_field_container: {
    width: "100%",
    height: "100%",
  },
  text_field_spacing: { margin: 25 },
  title: {
    fontSize: 16,
  },
  paper_center: {
    justifyContent: "center",
    direction: "row",
    justify: "center",
    alignItems: "center",
    width: 500,
    border: "8px solid rgb(0 172 193)",
  },
  button_style: {
    boxShadow:
      "0px 3px 1px -2px rgb(0 172 193), 0px 2px 2px 0px  rgb(0 172 193), 0px 1px 5px 0px  rgb(0 172 193)",
    backgroundColor: "#ffffff",
  },
}));

const Login = ({ setAuth }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    users_password: "",
  });
  const { email, users_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { email, users_password };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwttoken) {
        localStorage.setItem("token", parseRes.jwttoken);
        setAuth(true);
        toast.success("Login successfull", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      } else {
        setAuth(false);
        toast.error(parseRes, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid
      xs={12}
      container
      item
      position="static"
      direction="row"
      justify="center"
      alignItems="baseline"
      className={classes.text_field_container}
    >
      <Card elevation={3} className={classes.paper_center} variant="outlined">
        <form onSubmit={onSubmitForm}>
          <CardHeader
            title="Login"
            display="static"
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          />

          <CardContent>
            <TextField
              required
              type="email"
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
              variant="outlined"
              value={users_password}
              placeholder="Password"
              name="users_password"
              onChange={(e) => onChange(e)}
              style={{ width: "100%" }}
            />
          </CardContent>

          <CardContent>
            <Button
              variant="contained"
              type="login"
              style={{ width: "100%" }}
              className={classes.button_style}
            >
              {" "}
              Login{" "}
            </Button>
          </CardContent>
        </form>
        <CardContent>
          <Button
            variant="contained"
            type="link"
            style={{ width: "100%" }}
            className={classes.button_style}
            href="/register"
          >
            Don't have an account? Register here
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Login;
