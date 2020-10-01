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

//styles
const useStyles = makeStyles(() => ({
  text_field_container: {
    width: "100%",
    height: "100%",
  },
  text_field_spacing: { margin: 25 },
  title: {
    fontSize: 16,
    marginBottom: 20,
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

/**
 *
 * New study form, where receives setStduy and handleNext function from parent component
 *
 */
const New_study_form = ({ setStudy, handleNext }) => {
  //get styles
  const classes = useStyles();

  //create input state with different params where those params start as empty

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    pubmed_id: "",
    DOI: "",
  });

  //define input array with the states obtained previously
  const { title, description, pubmed_id, DOI } = inputs;

  /**
   * onChange function for when user write something on the field,
   * the input state params gets updated to the new input
   */
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  /**
   * onSubmitForm function, after the user writes the required fields, and submits the form
   * the front end makes the connection with the new study route sending the inputs as body
   */
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = { title, description, pubmed_id, DOI };
      const response = await fetch("http://localhost:5000/new-study", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const res = await response.json();
      /**
       *
       * if back-end sends a response give a sucess message,
       * sets the study to the global variable on the parent of component and handles to next form
       * else sends error message
       *
       */
      if (res.study_id) {
        setStudy(res);
        handleNext();
        toast.success("Register successfull", {
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
        toast.error(res, {
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
            title="study register"
            display="static"
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          />
          <CardContent>
            <TextField
              required
              type="text"
              id="outlined-basic"
              variant="outlined"
              value={title}
              name="title"
              placeholder="Title"
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
              value={description}
              placeholder="Description"
              name="description"
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
              value={pubmed_id}
              placeholder="E-pubmed_id"
              name="pubmed_id"
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
              value={DOI}
              placeholder="DOI"
              name="DOI"
              onChange={(e) => onChange(e)}
              style={{ width: "100%" }}
            />
          </CardContent>

          <CardContent>
            <Button
              variant="contained"
              type="submit"
              required
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
  );
};

export default New_study_form;
