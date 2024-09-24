import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";

import { Box, Button } from "@mui/material";
import PlusIcon from "../Icons/PlusIcon";
import { ColumnType, TaskType } from "../types";
import ColumnContainer from "./ColumnContainer";

import { randomIdGenerator } from "../Utilities/randomIdGenerator";
import Task from "./Task";

function Board() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]); // Moved task state to the board
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null); // Track active task

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  });

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    const { type, column, task } = event.active.data.current || {};

    if (type === "Column") {
      setActiveColumn(column);
    }

    if (type === "Task") {
      setActiveTask(task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Handle column dragging
    if (active.data.current?.type === "Column") {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      if (activeColumnIndex !== overColumnIndex) {
        setColumns((prevColumns) =>
          arrayMove(prevColumns, activeColumnIndex, overColumnIndex)
        );
      }
    }

    // Handle task dragging
    if (active.data.current?.type === "Task") {
      const activeTask = active.data.current.task;
      const overColumnId = overId.toString();

      // Prevent overriding the task, append the task to the new column instead
      if (activeTask.columnId !== overColumnId) {
        setTasks((prevTasks) => {
          // Find the task being dragged and update its columnId
          const updatedTasks = prevTasks.map((task) =>
            task.id === activeId ? { ...task, columnId: overColumnId } : task
          );
          return updatedTasks;
        });
      }
    }
  };

  const createTask = (columnId: string) => {
    const newTask: TaskType = {
      id: randomIdGenerator(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, content: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, content } : task))
    );
  };

  const updateColumnName = (title: string, id: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  };

  const createNewColumn = () => {
    const newColumn: ColumnType = {
      id: randomIdGenerator(),
      title: "Column",
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const deleteColumn = (id: string) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== id));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={5}
      overflow="auto"
    >
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={[sensor]}
      >
        <Box display="flex" gap={2}>
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                delColumn={deleteColumn}
                updateColumnName={updateColumnName}
              />
            ))}
          </SortableContext>
        </Box>

        <Box mt={2} textAlign="center">
          <Button
            onClick={createNewColumn}
            variant="contained"
            startIcon={<PlusIcon />}
            sx={{
              height: 60,
              width: 350,
              minWidth: 350,
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "gray" },
            }}
          >
            Add Column
          </Button>
        </Box>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                delColumn={deleteColumn}
                updateColumnName={updateColumnName}
              />
            )}
            {activeTask && (
              <Task
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Box>
  );
}

export default Board;
