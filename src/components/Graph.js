import React from "react";
import { Grid } from "@material-ui/core";
import { data } from "./data3.json";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
  },
}));
const Data_Table = () => {
  const classes = useStyles();
  var samples_count_graph = [];
  var biome_name_graph = [];
  const data_graph = {
    labels: biome_name_graph,
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

  return (
    <Grid
      padding={2}
      container
      item
      xs={12}
      position="static"
      className={classes.container}
    >
      {data.map((ppidd) => {
        const { attributes } = ppidd;
        const { samples_count, biome_name } = attributes;

        biome_name_graph.push(biome_name);
        samples_count_graph.push(samples_count);

        return null;
      })}

      <Bar data={data_graph} />
    </Grid>
  );
};

export default Data_Table;
