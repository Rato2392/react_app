import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
import { withRouter } from "react-router-dom";

//get props from the parent component
const UsersSeq = (props) => {
  //define the seq state as an empty list
  const [seq, setSeq] = useState([]);
  //from the props get history
  const { history } = props;
  /**
   * Connection with the user sequences, only accessable if user is logged in
   * if connection is estabalished, seq state is updated
   */
  const getSeq = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("jwt_token", localStorage.token);
      const response = await fetch("http://localhost:5000/users-seq", {
        method: "GET",
        headers: myHeaders,
      });
      const jsonData = await response.json();
      setSeq(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //function to always be update page when changes are made
  useEffect(() => {
    getSeq();
  });

  return (
    <Grid xs={6}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>First Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Password</b>
              </TableCell>
              <TableCell>
                <b></b>
              </TableCell>
              <TableCell>
                <b></b>
              </TableCell>
              <TableCell>
                <b></b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seq.length !== 0 &&
              seq[0].seq_id !== null &&
              seq.map((seq) => (
                <TableRow key={seq.seq_id}>
                  <TableCell>{seq.study_id}</TableCell>
                  <TableCell>{seq.filename}</TableCell>
                  <TableCell>{seq.title}</TableCell>
                  <TableCell>{seq.users_id}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default UsersSeq;
