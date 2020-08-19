import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Modal from "@material-ui/core/Modal";

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

//main function for the edit biome button//

const EditUsers = ({ users }) => {
  //get description state

  const [first_name, setFirst_name] = useState(users.first_name);

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
        id="outlined-basic"
        value={first_name}
        elevation={0}
        margin="normal"
        onChange={(e) => setFirst_name(e.target.value)}
      />
      <Button type="button" onClick={(e) => updateFirst_name(e)}>
        Edit
      </Button>
    </Grid>
  );

  const updateFirst_name = async (e) => {
    try {
      const body = { first_name };
      const response = await fetch(
        `http://localhost:5000/users/${users.users_id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

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

export default EditUsers;
