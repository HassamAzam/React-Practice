import { ChangeEvent } from "react";

import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const Question2=({
  answers,
  setAnswers,
}: {
  answers: string[];
  setAnswers: (value: string[]) => void;
})=> {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newAnswers = checked
      ? [...answers, name]
      : answers.filter((answer) => answer !== name);

    setAnswers(newAnswers);
  };

  return (
    <>
      <h1>Select the countries you have visited</h1>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={answers.includes("USA")}
                onChange={handleChange}
                name="USA"
              />
            }
            label="USA"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={answers.includes("Canada")}
                onChange={handleChange}
                name="Canada"
              />
            }
            label="Canada"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={answers.includes("France")}
                onChange={handleChange}
                name="France"
              />
            }
            label="France"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={answers.includes("Belgium")}
                onChange={handleChange}
                name="Belgium"
              />
            }
            label="Belgium"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}

export default Question2