import React, { useState } from "react";
import Task from "./task";
import { Button, TextField } from "@mui/material";
export default function TaskList() {
  const [taskArray, setTaskArray] = useState([]);
  const [taskText, setTaskText] = useState("");
  const addTask = () => {
    const newTask = { text: taskText, id: Date.now() };
    if (taskText) {
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
        <TextField
          sx={{ width: 1 / 3 }}
          onChange={(e) => setTaskText(e.target.value)}
        />
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
        ></Task>
      ))}
    </>
  );
}
