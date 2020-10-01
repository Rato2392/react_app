import React, { useEffect, useState } from "react";
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
import { withRouter } from "react-router-dom";
import axios from "axios";
//styles
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

/**
 *
 *  New sequences form, where receives setStduy function from parent component
 *
 */
const NewSeq = ({ study, handleNext }) => {
  //get styles
  const classes = useStyles();
  //create file input state
  const [file, setFile] = useState("");
  /**
   * onSubmitForm function, after the user choses the input file  and submits the form
   * the front end makes the connection with the new sequence route sending the file
   * and the study id and title
   * with the study id and title obtained from parent component props
   */
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("body", study.study_id);
      formData.append("title", study.title);

      const myHeaders = new Headers();

      myHeaders.append("Content-type", "multipart/form-data");

      myHeaders.append("jwt_token", localStorage.token);

      const res = await axios.post("http://localhost:5000/new-seq", formData, {
        headers: myHeaders,
      });
      handleNext();
      /**
       *
       * if back-end sends a response give a sucess message,
       *
       * else sends error message
       *
       */
      toast.success("Upload completed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } catch (err) {
      toast.error("No study was selected, submit study again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
      console.error(err.message);
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
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
      {" "}
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
              type="file"
              variant="outlined"
              name="file"
              onChange={(e) => onChange(e)}
              style={{ width: "100%" }}
            />
          </CardContent>
          <CardContent></CardContent>

          <CardContent>
            <Button
              variant="contained"
              type="submit"
              required
              style={{ width: "100%" }}
              className={classes.button_style}
            >
              {" "}
              Send{" "}
            </Button>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
};

export default NewSeq;
