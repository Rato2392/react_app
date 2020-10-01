import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
// functions for styling the pop-up window(modal)

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    margin: "20px",
  },
}));

//main function for the edit study button//

const EditStudy = ({ study }) => {
  //get study state

  const [input, setInput] = useState(study);

  //deconstruct study

  const { title, description, pubmed_id, doi } = input;

  //function to update target study param where name = value

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //function to update study, where study_id is passed to the back-end

  const editStudy = async (study_id) => {
    try {
      //multiple headers

      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      //define the study params that can be changed

      const body = { title, description, pubmed_id, doi };

      //update study route connection

      const response = await fetch(
        `http://localhost:5000/study/${study.study_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const parseResponse = await response.json();

      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  //change style of the pop-up window(modal)

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  //handle state of the pop-up window(modal)

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // pop-up window(modal) content

  const body = (
    <Grid
      style={modalStyle}
      className={classes.paper}
      padding={2}
      container
      item
      justify="space-evenly"
      alignItems="center"
    >
      <TextField
        type="text"
        value={title}
        elevation={0}
        margin="normal"
        onChange={(e) => onChange(e)}
        name="title"
      />
      <Button type="button" onClick={(study_id) => editStudy(study_id)}>
        Edit
      </Button>
      <Button type="button" onClick={handleClose}>
        close
      </Button>
    </Grid>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        Edit
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default EditStudy;
