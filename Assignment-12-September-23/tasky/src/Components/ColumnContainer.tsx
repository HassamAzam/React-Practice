import { useSortable, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRef, useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Card,
  TextField,
  Button,
} from "@mui/material";

import DeleteIcon from "../Icons/DeleteIcon";
import { ColumnType, TaskType } from "../types";
import PlusIcon from "../Icons/PlusIcon";
import Task from "./Task";

interface Props {
  column: ColumnType;
  tasks: TaskType[]; // Receive tasks as props
  createTask: (columnId: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
  delColumn: (id: string) => void;
  updateColumnName: (title: string, id: string) => void;
}

const ColumnContainer = ({
  column,
  tasks,
  createTask,
  deleteTask,
  updateTask,
  delColumn,
  updateColumnName,
}: Props) => {
  const taskId = tasks.map((task) => task.id);
  const [editMode, setEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // To track if a task is hovering over
  const columnName = useRef<string>(column.title);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const handleColumnNameUpdate = () => {
    updateColumnName(columnName.current, column.id);
    setEditMode(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleColumnEditMode = () => {
    setEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    columnName.current = e.target.value;
  };

  const handleDragOver = () => {
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  if (isDragging) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        sx={{
          width: 350,
          height: 500,
          bgcolor: "#08b6e5",
          borderRadius: 2,
          border: "2px solid #f50057",
        }}
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        width: 350,
        height: isHovered ? 550 : 500, // Expand when hovered
        display: "flex",
        flexDirection: "column",
        bgcolor: "columnBackgroundColor",
        borderRadius: 2,
        border: isHovered ? "2px dashed #08b6e5" : "none", // Add a visual cue when hovering
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Box
        onClick={handleColumnEditMode}
        {...attributes}
        {...listeners}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{ bgcolor: "#08b6e5", cursor: "grab" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {!editMode && column.title}
          {editMode && (
            <TextField
              defaultValue={column.title}
              autoFocus
              onChange={handleChange}
            />
          )}
        </Typography>
        <IconButton onClick={() => delColumn(column.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {editMode && (
        <Button onClick={handleColumnNameUpdate} variant="contained">
          Change Column Name
        </Button>
      )}

      <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
        <SortableContext items={taskId}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </Box>
      <Button onClick={() => createTask(column.id)} startIcon={<PlusIcon />}>
        Add Task
      </Button>
    </Card>
  );
};

export default ColumnContainer;
