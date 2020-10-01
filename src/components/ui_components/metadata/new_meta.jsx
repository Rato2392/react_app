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
 *  New metadata form, where receives setStduy function from parent component
 *
 */
const NewMeta = ({ study }) => {
  //get styles
  const classes = useStyles();
  //create input state with different params where those params start as empty
  const [inputs, setInputs] = useState({
    primers: "",
    chem_seq: "",
    seq_platform: "",
    quality_seq: "",
    filter_criteria: "",
    origin_biome: "",
    lib_name: "",
    lib_strat: "",
    lib_src: "",
    lib_select: "",
  });
  //define input array with the states obtained previously
  const {
    primers,
    chem_seq,
    seq_platform,
    quality_seq,
    filter_criteria,
    origin_biome,
    lib_name,
    lib_strat,
    lib_src,
    lib_select,
  } = inputs;

  /**
   * onChange function for when user write something on the field,
   * the input state params gets updated to the new input
   */
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  /**
   * onSubmitForm function, after the user writes the required fields, and submits the form
   * the front end makes the connection with the new metatada route sending the inputs as body
   * with the study id obtained from parent component props
   */
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = {
        study,
        primers,
        chem_seq,
        seq_platform,
        quality_seq,
        filter_criteria,
        origin_biome,
        lib_name,
        lib_strat,
        lib_src,
        lib_select,
      };

      const response = await fetch("http://localhost:5000/new-meta", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const meta = await response.json();
      /**
       *
       * if back-end sends a response give a sucess message,
       *
       * else sends error message
       *
       */
      toast.success("Metadata submited", {
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
              value={primers}
              name="primers"
              placeholder="Primers"
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
              value={chem_seq}
              placeholder="Chem_seq"
              name="chem_seq"
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
              value={seq_platform}
              placeholder="seq_platform"
              name="seq_platform"
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
              value={quality_seq}
              placeholder="quality_seq"
              name="quality_seq"
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
              value={filter_criteria}
              placeholder="filter_criteria"
              name="filter_criteria"
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
              value={origin_biome}
              placeholder="origin_biome"
              name="origin_biome"
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
              value={lib_name}
              placeholder="lib_name"
              name="lib_name"
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
              value={lib_strat}
              placeholder="lib_strat"
              name="lib_strat"
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
              value={lib_src}
              placeholder="lib_src"
              name="lib_src"
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
              value={lib_select}
              placeholder="lib_select"
              name="lib_select"
              onChange={(e) => onChange(e)}
              style={{ width: "100%" }}
            />
          </CardContent>

          <CardContent>
            <Button
              required
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
  );
};

export default NewMeta;
