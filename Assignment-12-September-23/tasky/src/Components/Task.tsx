import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";

import { Box, Card, CardContent, TextField, Button } from "@mui/material";

import DeleteIcon from "../Icons/DeleteIcon";

interface TaskProps {
  task: {
    id: string;
    content: string;
  };
  deleteTask: (id: string) => void;
  updateTask: (id: string, content: string) => void;
}

function Task({ task, deleteTask, updateTask }: TaskProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [content, setContent] = useState(task.content);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const handleUpdateTask = () => {
    if (content !== task.content) {
      updateTask(task.id, content);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    }
  };

  if (isDragging) {
    return <Box ref={setNodeRef} style={style} sx={{ opacity: "50" }}></Box>;
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <Card
        sx={{ minWidth: 275, position: "relative", border: "1px  solid cyan" }}
      >
        <CardContent sx={{ display: "flex" }}>
          <TextField
            value={content}
            autoFocus
            onBlur={handleUpdateTask}
            onKeyDown={handleKeyDown}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit task content"
            fullWidth
          />
          {mouseIsOver && (
            <>
              <Button onClick={handleDeleteTask}>
                <DeleteIcon />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Task;
