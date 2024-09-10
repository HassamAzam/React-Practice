import { useState } from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import Question1 from "./Questions/Question1";
import Question2 from "./Questions/Question2";
import Question3 from "./Questions/Question3";

export default function SurveyComponent() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: [] as string[],
    question3: "",
  });

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);
  const handleSubmit = () => {
    handleNext();
  };

  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <Question1
            answer={answers.question1}
            setAnswer={(value) => setAnswers({ ...answers, question1: value })}
          />
        );
      case 1:
        return (
          <Question2
            answers={answers.question2}
            setAnswers={(value) => setAnswers({ ...answers, question2: value })}
          />
        );
      case 2:
        return (
          <Question3
            answer={answers.question3}
            setAnswer={(value) => setAnswers({ ...answers, question3: value })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      {step !== 3 && (
        <>
          <LinearProgress variant="determinate" value={(step / 3) * 100} />
          <Box my={4}>{renderQuestion()}</Box>
          <Box mt={4}>
            {step > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ margin: 2 }}
              >
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </Box>
        </>
      )}

      {step === 3 && (
        <Box>
          <h2>Survey Results</h2>
          <p>From Pakistan: {answers.question1}</p>
          <p>Countries to Visit: {answers.question2.join(", ")}</p>
          <p>Reason to Stay: {answers.question3}</p>
        </Box>
      )}
    </Box>
  );
}
