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
import EditStudy from "./edit_study";

const UserStudy = (props) => {
  const [study, setStudy] = useState([]);
  const { history } = props;
  const getStudy = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("jwt_token", localStorage.token);
      const response = await fetch("http://localhost:5000/user-study", {
        method: "GET",
        headers: myHeaders,
      });
      const jsonData = await response.json();
      setStudy(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getStudy();
  });

  const deleteStudy = async (study_id) => {
    try {
      //multiple headers

      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      //delete study route connection
      console.log(study_id);

      const response = await fetch(`http://localhost:5000/study/${study_id}`, {
        method: "DELETE",
        headers: myHeaders,
      });

      const parseResponse = await response.json();

      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

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
            {study.length !== 0 &&
              study[0].study_id !== null &&
              study.map((study) => (
                <TableRow key={study.study}>
                  <TableCell>{study.title}</TableCell>
                  <TableCell>{study.description}</TableCell>
                  <TableCell>{study.pubmed_id}</TableCell>
                  <TableCell>{study.doi}</TableCell>
                  <TableCell>
                    <EditStudy study={study} />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteStudy(study.study_id)}>
                      remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default UserStudy;
