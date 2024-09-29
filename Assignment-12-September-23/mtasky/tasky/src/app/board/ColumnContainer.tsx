'use client'

import { ColumnType, TaskType } from "@/types";
import DeleteIcon from "@/Icons/DeleteIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "@/Icons/PlusIcon";
import TaskCard from "./Card";
interface Props {
  column: ColumnType;
  deleteColumn: (id: string) => void;
  updateColumn: (id: string, title: string) => void;
  createTask: (columnId: string) => void;
  tasks: TaskType[];
  deleteTask: (id: string) => void;
    updateTask: (id: string, content: string, columdId: string) => void;
 
}

import { useRef } from "react";

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
      deleteTask,
    
    updateTask,
  } = props;

  const taskId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: "#161D22",
    borderColor: "#0D1117",
  };

  const columnNameRef = useRef<HTMLInputElement>(null);

  const handleCreateTask = () => {
    createTask(column.id);
  };

  const handleUpdateColumn = () => {
    if (columnNameRef.current) {
      updateColumn(column.id, columnNameRef.current.value);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] max-h-[500px] rounded-md h-[500px] flex flex-col opacity-40 border-2 border-rose-500"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] max-h-[500px] rounded-md h-[500px] flex flex-col"
    >
      {/* Title */}
      <div
        {...attributes}
        {...listeners}
        className="text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 flex items-center justify-between"
        style={{
          backgroundColor: "#0D1117",
          borderColor: "#161D22",
        }}
      >
        <div className="flex gap-2">
          <div
            className="flex justify-center items-center px-2 py-1 text-sm rounded-full"
            style={{ backgroundColor: "#0D1117" }}
          >
            0
          </div>
          <input
            ref={columnNameRef} 
            className="bg-black focus:border-rose-500 border rounded outline-none px-2"
            defaultValue={column.title}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateColumn(); 
              }
            }}
            onBlur={handleUpdateColumn} 
          />
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="store-gray-500 hover:stroke-black rounded px-1 py-2"
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col gap-3 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="flex gap-2 items-center border-2 rounded-md p-4 border-[#161D22] hover:bg-[#0D1117] hover:text-rose-500 active:bg-black"
        onClick={handleCreateTask}
        style={{ backgroundColor: "#0D1117" }}
      >
        <PlusIcon /> Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
