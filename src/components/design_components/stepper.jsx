import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";

//main compents to register a new analysis
import New_study_form from "../ui_components/study/new_study_form";
import NewSeq from "../ui_components/sequences/new_seq";
import NewMeta from "../ui_components/metadata/new_meta";

//styles
const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper_style: {
    color: "rgb(0 172 193)",
  },
  blue: {
    color: "rgb(0 172 193) !important",
  },
  green: {
    color: "rgb(33 193 14 / 73%) !important",
  },
  text_field_container: {
    width: "100%",
    height: "100%",
    marginBottom: "8px",
  },
}));

export default function HorizontalLinearStepper(props) {
  //styel classes
  const classes = useStyles();
  //make study a parent component varible to be obtained and passed to the children components
  const [study, setStudy] = useState();
  //get the active step starting on 0
  const [activeStep, setActiveStep] = React.useState(0);

  //Array of the steps labels
  function getSteps() {
    return [
      "Register your study",
      "Upload file for analysis",
      "Register file metadata",
    ];
  }
  const onCancel = async (study) => {
    try {
      //multiple headers

      const myHeaders = new Headers();
      myHeaders.append("Content-type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      //delete study route connection

      const response = await fetch(
        `http://localhost:5000/study/${study.study_id}`,
        {
          method: "DELETE",
          headers: myHeaders,
        }
      );

      const parseResponse = await response.json();

      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  //get define the steps by the step labels
  const steps = getSteps();

  //handle next and back steps
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //handle reset, when user presses reset button, the active step goes to 0 and deletes the current incompleted study

  const handleReset = (e) => {
    setActiveStep(0);
    onCancel(study);
  };

  //define the steps components
  function GetStepContent(stepIndex) {
    //set study variable in parent component

    switch (stepIndex) {
      case 0:
        /**
         * send parent props from parent component to child
         * study is obtained from the new_study_form, it's state is passed to the children
         * handlenext is passed so when the user submits each form, it passes to next step
         */
        return <New_study_form setStudy={setStudy} handleNext={handleNext} />;
      case 1:
        // sequences form
        return <NewSeq study={study} handleNext={handleNext} />;
      case 2:
        // metadata form
        return <NewMeta study={study} handleNext={handleNext} />;
      default:
        return "Unknown stepIndex";
    }
  }

  /**
   * Stepper alternativeLabel sets the labels under the icon instead in lign
   *
   * First part(first return) of the stepper is mapping labels and states of the steps
   *
   * Second part(second return) setting the top labels from the step
   * Step icons show as blue when step being filled, green when its completed
   *
   * Last part its a cancel button with the handle reset
   *
   */

  return (
    <Grid>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    active: classes.blue,
                    completed: classes.green,
                  },
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Grid>
        <Paper>
          <Typography className={classes.instructions}>
            {GetStepContent(activeStep)}
          </Typography>
          <Paper>
            <Button
              disabled={activeStep === 0}
              onClick={handleReset}
              className={classes.button}
            >
              Cancel
            </Button>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
}
