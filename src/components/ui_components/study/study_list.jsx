import React, { useState, useEffect } from "react";
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

import EditStudy from "./edit_study";

const ListStudy = () => {
  const [study, setstudy] = useState([]);

  const getStudy = async () => {
    try {
      const response = await fetch("http://localhost:5000/study");
      const jsonData = await response.json();

      setstudy(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStudy();
  });
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>PubMed ID</b>
            </TableCell>
            <TableCell>
              <b>DOI</b>
            </TableCell>
            <TableCell>
              <b></b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {study.map((study) => (
            <TableRow key={study.study}>
              <TableCell>{study.title}</TableCell>
              <TableCell>{study.description}</TableCell>
              <TableCell>{study.pubmed_id}</TableCell>
              <TableCell>{study.doi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListStudy;

//const deleteUser = async (users_id) => {
//try {
//const deleteUser = await fetch(
// `http://localhost:5000/users/${users_id}`,
//{
//  method: "DELETE",
// }
// );
// } catch (err) {
//console.error(err.message);
//}
//};
