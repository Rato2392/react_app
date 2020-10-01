import React, { useEffect, useState } from "react";
import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";

//get props from the parent component
const UsersMeta = (props) => {
  //define the meta state as an empty list
  const [meta, setMeta] = useState([]);
  //from the props get history
  const { history } = props;
  /**
   * Connection with the user metadata, only accessable if user is logged in
   * if connection is estabalished, meta state is updated
   */
  const getMeta = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("jwt_token", localStorage.token);
      const response = await fetch("http://localhost:5000/users-meta", {
        method: "GET",
        headers: myHeaders,
      });
      const jsonData = await response.json();
      setMeta(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //function to always be update page when changes are made
  useEffect(() => {
    getMeta();
  });

  return (
    <Grid xs={6}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Metadata id</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meta.length !== 0 &&
              meta[0].metadata_id !== null &&
              meta.map((meta) => <TableRow key={meta.metadata_id}></TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default UsersMeta;
