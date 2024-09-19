import { Box, Typography } from '@mui/material';
import { questionsConfig } from 'src/Components/Dashboard/questionsConfig';

type SurveyResultsProps = {
  answers: {
    [key: string]: string | string[];
  };
};

const SurveyResults = ({ answers }: SurveyResultsProps) => {
  return (
    <Box>
      <h2>Survey Results</h2>
      {questionsConfig.map((question) => (
        <Typography key={question.key}>
          {question.question}:{' '}
          {Array.isArray(answers[question.key])
            ? (answers[question.key] as string[]).join(', ')
            : answers[question.key]}
        </Typography>
      ))}
    </Box>
  );
};

export default SurveyResults;
