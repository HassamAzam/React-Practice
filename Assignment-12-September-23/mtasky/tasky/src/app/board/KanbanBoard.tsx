"use client";

import { useState, useMemo, useEffect } from "react";
import PlusIcon from "@/Icons/PlusIcon";
import { ColumnType, TaskType } from "@/types";
import { redirect } from "next/navigation";
import { v4 } from "uuid";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./Card";
import { createPortal } from "react-dom";
import {
  addCard,
  deleteColumnFromDb,
  getCards,
  getColumns,
  sendColumn,
  updateCardFromDb,
} from "@/middleware/middleware";
import { updateColumnNameFromDb } from "@/middleware/middleware";
import { Button } from "@mui/material";
import Link from "next/link";
import { getFormattedDate } from "@/middleware/utilties";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  let loggedInUser: string | null = null;
  if (typeof window !== "undefined") {
    loggedInUser = sessionStorage.getItem("email");
    if (loggedInUser == null) {
      redirect("/login");
    }
  }
  const createTask = async (columnId: string) => {
    if (loggedInUser) {
      const newTask: TaskType = {
        id: v4(),
        columnId,
        content: `Task ${tasks.length + 1}`,
        email: loggedInUser,
        time:Date()
      };
      await addCard(
        newTask.id,
        newTask.columnId,
        newTask.content,
        loggedInUser
      );
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    if (loggedInUser) {
      const fetchColumns = async () => {
        const columnsFromDb = await getColumns(loggedInUser);
        const taskFromDb = await getCards(loggedInUser);
        if (columnsFromDb) {
          setColumns(columnsFromDb);
          if (taskFromDb) {
            setTasks(taskFromDb);
          }
        }
      };

      fetchColumns();
    }
  }, [loggedInUser]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const handleLogout = () => {
    sessionStorage.removeItem("email");
  };

  const createNewColumn = async () => {
    if (!loggedInUser) return;
    const columnToAdd: ColumnType = {
      id: v4(),
      title: `Column ${columns.length + 1}`,
      email: loggedInUser,
    };
    await sendColumn(columnToAdd.id, columnToAdd.email, columnToAdd.title);
    setColumns((prevColumns) => [...prevColumns, columnToAdd]);
  };

  const deleteColumn = async (id: string) => {
    await deleteColumnFromDb(id);
    const filteredColumn = columns.filter((col) => col.id !== id);

    setColumns(filteredColumn);
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const updateTask = async (id: string, content: string, columnId: string) => {
    console.log("UpdateTask Called")
    if (loggedInUser) {
      console.log("Inside LoggedInUser")
      console.log("Content",content)
      await updateCardFromDb(id, content, loggedInUser, columnId,getFormattedDate());
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, content, columnId } : task
      )
    );
  };

  const updateColumn = (id: string, title: string) => {
    if (loggedInUser) {
      updateColumnNameFromDb(id, title);
    }
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  };

  const deleteTask = (id: string) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("Inside Drag");
    console.log(event);
    const { active, over } = event;
    console.log(active.id === over?.id);

    setActiveTask(null);
    setActiveColumn(null);

    if (!over) return;

    if (active.data.current?.type === "Column") {
      const activeColumnId = active.id;
      const overColumnId = over.id;
      console.log("Columns i s running");

      if (activeColumnId === overColumnId) return;

      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
          (col) => col.id === activeColumnId
        );
        const overColumnIndex = columns.findIndex(
          (col) => col.id === overColumnId
        );

        if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
          return arrayMove(columns, activeColumnIndex, overColumnIndex);
        }
        return columns;
      });
    }
    console.log("After  Column");
    if (active.data.current?.type === "Task") {
      const activeTaskId = active.id;
      const overTaskId = over.id;
      console.log("tasjk is running");
      if (activeTaskId === overTaskId) {
        return;
      }
      console.log("Afterwards");
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);
        const overIndex = tasks.findIndex((t) => t.id === overTaskId);

        if (tasks[activeIndex]?.columnId && tasks[overIndex]?.columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex]?.columnId && tasks[overIndex]?.columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverAColumn) {
      console.log("Insdide Active Task andd over task conditions");
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        console.log(over.id);
        if (over.id) {
          tasks[activeIndex].columnId = overId.toString();
        }
        return [...tasks];
      });
    }
  };

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] bg-[#8f83d8]">
      <DndContext
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div>
            <SortableContext items={columnsId}>
              <div className="flex gap-4">
                {columns.map((col) => (
                  <ColumnContainer
                    updateTask={updateTask}
                    key={col.id}
                    updateColumn={updateColumn}
                    column={col}
                    deleteColumn={deleteColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
          <button
            onClick={createNewColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg border-2 p-4 ring-rose-500 hover:ring-2 flex gap-2"
            style={{ backgroundColor: "#51074a", borderColor: "#0D1117" }}
          >
            <PlusIcon />
            Add Columns
          </button>
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  updateTask={updateTask}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  column={activeColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>

      <Button onClick={handleLogout} variant="contained">
        <Link href="/login">Logout</Link>
      </Button>
    </div>
  );
};

export default KanbanBoard;
