import { Box, Button, LinearProgress } from '@mui/material';

import { useState } from 'react';

import { questionsConfig } from 'src/Components/Dashboard/questionsConfig';
import QuestionRenderer from 'src/Components/Dashboard/QuestionRenderer';
import SurveyResults from 'src/Components/Dashboard/SurveyResult';

type Answers = {
  [key: string]: string | string[];
};

const SurveyComponent = () => {
  const [currentQuestionIndex, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    question1: '',
    question2: [] as string[],
    question3: '',
    question4: '',
  });

  const handleNext = () =>
    setCurrentQuestion((prevQuestionIndex) => prevQuestionIndex + 1);
  const handleBack = () =>
    setCurrentQuestion((prevQuestionIndex) => prevQuestionIndex - 1);
  const handleSubmit = () => {
    handleNext();
  };

  const currentQuestionConfig = questionsConfig[currentQuestionIndex];

  return (
    <Box>
      {currentQuestionIndex < questionsConfig.length && (
        <>
          <LinearProgress
            variant="determinate"
            value={(currentQuestionIndex / questionsConfig.length) * 100}
          />
          <Box my={4}>
            <h1>{currentQuestionConfig.question}</h1>
            <QuestionRenderer
              questionConfig={currentQuestionConfig}
              answer={answers[currentQuestionConfig.key]}
              setAnswer={(value) =>
                setAnswers({
                  ...answers,
                  [currentQuestionConfig.key]: value,
                })
              }
            />
          </Box>
          <Box mt={4}>
            {currentQuestionIndex > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ margin: 2 }}
              >
                Back
              </Button>
            )}
            {currentQuestionIndex < questionsConfig.length - 1 ? (
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

      {currentQuestionIndex === questionsConfig.length && (
        <SurveyResults answers={answers} />
      )}
    </Box>
  );
};

export default SurveyComponent;
