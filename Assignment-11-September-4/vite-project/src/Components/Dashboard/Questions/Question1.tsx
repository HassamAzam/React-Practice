import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const Question1 = ({
  answer,
  setAnswer,
}: {
  answer: string;
  setAnswer: (value: string) => void;
}) => {
  return (
    <>
      <h1>Are you from Pakistan</h1>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="from-pakistan"
          name="from-pakistan"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default Question1;
