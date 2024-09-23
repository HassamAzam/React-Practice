import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import PlusIcon from "../Icons/PlusIcon";
import { ColumnType } from "../types";
import ColumnContainer from "./ColumnContainer";

function Board() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    },
  });
  document.title = "Home";
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const randomIdGenerator = () => {
    return Math.floor(Math.random() * 1000001).toString();
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId !== overColumnId) {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      );

      setColumns((prevColumns) =>
        arrayMove(prevColumns, activeColumnIndex, overColumnIndex),
      );
    }

    setActiveColumn(null);
  };
  const updateColumnName = (title: string, id: string) => {
    console.log("ff");

    const updatedColumns = columns.map((column) => {
      if (column.id === id) {
        return { ...column, title: title };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const createNewColumn = () => {
    const columnToAdd: ColumnType = {
      id: randomIdGenerator(),
      title: "Column",
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: string) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
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
                delColumn={deleteColumn}
                updateColumnName={updateColumnName}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </Box>
  );
}

export default Board;
