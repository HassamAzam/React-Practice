import { useState } from "react";
import { LinearProgress, Button } from "@mui/material";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const handleClick = () => {
    setProgress((progress) => {
      progress = progress + 10;
      return progress;
    });
  };

  return (
    <div>
      <LinearProgress variant="buffer" value={progress} />
      <br></br>
      <Button onClick={handleClick} variant="contained">
        Increase Progress
      </Button>
    </div>
  );
}
