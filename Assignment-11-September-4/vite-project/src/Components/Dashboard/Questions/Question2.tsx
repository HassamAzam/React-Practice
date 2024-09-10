import React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function Question2({
  answers,
  setAnswers,
}: {
  answers: string[];
  setAnswers: (value: string[]) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = event.target.checked
      ? [...answers, event.target.name]
      : answers.filter((answer) => answer !== event.target.name);
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
