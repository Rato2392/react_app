import React from "react";
import {
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
} from "@material-ui/core";
import { data } from "./data3.json";
import { Bar } from "react-chartjs-2";
import Table_test from "./table.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { render } from "@testing-library/react";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  },
}));
const Data_Table = () => {
  const classes = useStyles();
  var id_graph = [];
  var samples_count_graph = [];
  const data_graph = {
    labels: id_graph,
    datasets: [
      {
        data: samples_count_graph,
        label: "Sample counts",
        backgroundColor: "rgba(255, 99, 132, 1)",

        options: {
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        },
      },
    ],
  };

  render();
  {
    return (
      <Paper className={classes.container}>
        {data.map((ppidd) => {
          const { type, id, attributes } = ppidd;
          const { samples_count, biome_name, lineage } = attributes;

          id_graph.push(id);
          samples_count_graph.push(samples_count);

          return null;
        })}

        <Bar data={data_graph} />
      </Paper>
    );
  }
};

export default Data_Table;
