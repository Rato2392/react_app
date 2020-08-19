import React from "react";
import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";
import { data } from "../data3.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Table_Test = () => {
  const classes = useStyles();
  return (
    <Grid
      padding={2}
      container
      item
      xs={12}
      position="static"
      className={classes.root}
    >
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Type</b>
              </TableCell>
              <TableCell align="left">
                <b>Id</b>
              </TableCell>
              <TableCell align="left">
                <b>Samples_count</b>
              </TableCell>
              <TableCell align="left">
                <b>Biome_name</b>
              </TableCell>
              <TableCell align="left">
                <b>Lineage</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ppidd) => {
              const { type, id, attributes } = ppidd;
              const { samples_count, biome_name, lineage } = attributes;

              return (
                <TableRow key={id}>
                  <TableCell align="left">{type}</TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {id}
                  </TableCell>
                  <TableCell align="left">{samples_count}</TableCell>
                  <TableCell align="left">{biome_name}</TableCell>
                  <TableCell align="left">{lineage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Table_Test;
