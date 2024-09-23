import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Typography,
  IconButton,
  Card,
  TextField,
  Button,
} from "@mui/material";

import DeleteIcon from "../Icons/DeleteIcon";
import { ColumnType } from "../types";
import { useEffect, useRef, useState } from "react";

interface Props {
  column: ColumnType;
  delColumn: (id: string) => void;
  updateColumnName: (title: string, id: string) => void;
}

const ColumnContainer = (props: Props) => {
  const [editMode, setEditMode] = useState(false);
  const columnName = useRef<string>(props.column.title);
  const { column, delColumn } = props;

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
    console.log("updateFunctionCalled");
    props.updateColumnName(columnName.current, column.id);
    setEditMode(false);
  };

  useEffect(() => {
    console.log("Edit mode changed to: ", editMode);
  }, [editMode]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleColumnEditMode = () => {
    setEditMode(true);
  };

  const handleChange = (e: any) => {
    columnName.current = e.target.value;
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
  console.log("Component");

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        width: 350,
        height: 500,
        display: "flex",
        flexDirection: "column",
        bgcolor: "columnBackgroundColor",
        borderRadius: 2,
      }}
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
        <Box
          component="span"
          sx={{
            bgcolor: "white",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        ></Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {!editMode && column.title}
          {editMode && (
            <>
              <TextField
                defaultValue={column.title}
                autoFocus
                onChange={handleChange}
              />
            </>
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
      <Box flexGrow={1}>Content</Box>
      <Box>Footer</Box>
    </Card>
  );
};

export default ColumnContainer;
