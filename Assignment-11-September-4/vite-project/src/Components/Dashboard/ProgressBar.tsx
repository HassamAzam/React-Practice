import { useState } from "react";

import { LinearProgress, Button, Box } from "@mui/material";
const ProgressBar=()=>{
  const [progress, setProgress] = useState(0);
  const handleClick = () => {
    setProgress((progress) => {
      progress = progress + 10;
      return progress;
    });
  };

  return (
    <Box>
      <LinearProgress variant="buffer" value={progress} />
      <br></br>
      <Button onClick={handleClick} variant="contained">
        Increase Progress
      </Button>
    </Box>
  );
}
export default ProgressBar