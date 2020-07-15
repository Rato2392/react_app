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
import { data } from "./data3.json";
import { Bar } from "react-chartjs-2";
import Table_test from "./table.jsx";
import Data_Table from "./Graph.js";

const DataTable = () => {
  return (
    <Grid container item xs={12} position="static">
      <Table_test />
      <Grid container item xs={12} position="static" padding={2}>
        <Data_Table />
      </Grid>
    </Grid>
  );
};

export default DataTable;
