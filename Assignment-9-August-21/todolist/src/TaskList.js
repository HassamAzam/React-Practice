import React, { useState, useRef } from "react";

import { Button, TextField } from "@mui/material";

import Task from "./task";

export default function TaskList() {
  const [taskArray, setTaskArray] = useState([]);
  const taskText = useRef(null);
  const addTask = () => {
    const textValue = taskText.current.value;
    const newTask = { text: textValue, id: Date.now() };
    if (textValue) {
      setTaskArray([...taskArray, newTask]);
    }
  };
  const deleteTask = (id) => {
    setTaskArray(taskArray.filter((i) => i.id !== id));
  };

  const updateTask = (updatedTask) => {
    if (updatedTask.text) {
      setTaskArray(
        taskArray.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    }
  };

  return (
    <>
      <div className="taskInput">
        <TextField sx={{ width: 1 / 3 }} inputRef={taskText} type="text" />
        <Button onClick={addTask} variant="contained">
          Add Task
        </Button>
      </div>
      {taskArray.map((taskItem) => (
        <Task
          key={taskItem.id}
          task={taskItem}
          deleteTask={() => deleteTask(taskItem.id)}
          update={updateTask}
        />
      ))}
    </>
  );
}
