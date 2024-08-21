import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
export default function Task(props) {
  const [editFlag, setEditFlag] = useState(false);
  const [tempText, setTempText] = useState("");
  const { update, task, deleteTask } = props;
  const submitHandle = () => {
    const updatedTask = { text: tempText, id: task.id };
    update(updatedTask);
    setEditFlag(false);
  };
  return (
    <>
      <div className="taskBox">
        <span>
          {" "}
          <h3 className="taskText">{task.text}</h3>
        </span>
        <div className="buttons">
          <Button
            onClick={() => setEditFlag(true)}
            color="success"
            variant="contained"
          >
            Edit
          </Button>
          <Button
            color="error"
            className="deleteButton"
            variant="contained"
            onClick={deleteTask}
          >
            Delete
          </Button>
        </div>

        {editFlag && (
          <div>
            <TextField
              onChange={(e) => setTempText(e.target.value)}
              placeholder={task.text}
            />

            <Button onClick={submitHandle}>Submit</Button>
          </div>
        )}
      </div>
    </>
  );
}
