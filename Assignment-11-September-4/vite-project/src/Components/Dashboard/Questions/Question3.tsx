import { TextField } from "@mui/material";

const Question3=({
  answer,
  setAnswer,
}: {
  answer: string;
  setAnswer: (value: string) => void;
}) =>{
  return (
    <>
      <h1>"How would you describe your reason to stay?"</h1>
      <TextField
        multiline
        rows={4}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        fullWidth
      />
    </>
  );
}
export default Question3