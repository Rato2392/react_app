import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardMedia,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import Iceberg from "C:\\Users\\João\\react-app\\src\\components\\images\\iceberg.jpg";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    borderRadius: 0,
    outline: "false",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "fontWeightBold",
  },
  pos: {
    marginBottom: 12,
  },
  iceberg_root: {
    width: 250,
    height: 338,
    padding: 30,
  },
  link_color: {
    color: "orange",
  },
}));

const TextBox = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="center"
      position="static"
    >
      <Grid
        container
        item
        xs={12}
        sm={8}
        justify="center"
        alignItems="center"
        direction="column"
        position="static"
      >
        <Card className={classes.root} elevation={0} square={true}>
          <CardContent>
            <Typography className={classes.title} color="initial">
              <b>BioData.pt </b>
              is the Portuguese distributed e-infrastructure for biological data
              and the Portuguese
              <Link
                className={classes.link_color}
                href="https://elixir-europe.org/"
              >
                {" ELIXIR "}
              </Link>
              node.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className={classes.title} color="initial">
              <b>BioData.pt </b>
              supports the national scientific system through best practices in
              data management and state of the art data analysis.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className={classes.title} color="initial">
              It interfaces with both academia and industry, making research
              available for innovation, namely in sectors such as agro-food and
              forestry, sea, and health.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className={classes.title} color="initial">
              <b>BioData.pt </b>
              services include ELIXIR services such as our training programme
              and computing facilities, as well as consulting services in data
              analysis and management, and a number of community services.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={4}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Card
          item="true"
          className={classes.root}
          elevation={0}
          square={true}
          xs={12}
          sm={6}
        >
          <CardMedia
            img="true"
            src={Iceberg}
            className={classes.iceberg_root}
            width="244"
            component="img"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default TextBox;
