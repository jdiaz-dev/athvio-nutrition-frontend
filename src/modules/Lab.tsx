// npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
// (MUI is assumed already installed: @mui/material @mui/icons-material)

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface SortableItemData {
  id: string;
  label: string;
}

interface SortableItemProps {
  id: string;
  label: string;
}

// --- One sortable row ---
function SortableItem({ id, label }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      component={Paper}
      elevation={isDragging ? 4 : 1}
      sx={{ mb: 1 }}
      secondaryAction={
        // drag handle — only this icon triggers dragging
        <IconButton {...attributes} {...listeners} sx={{ cursor: "grab" }}>
          <DragIndicatorIcon />
        </IconButton>
      }
    >
      <ListItemText primary={label} />
    </ListItem>
  );
}

// --- Parent component ---
export default function MuiSortableList() {
  const [items, setItems] = useState<SortableItemData[]>([
    { id: "1", label: "Item One" },
    { id: "2", label: "Item Two" },
    { id: "3", label: "Item Three" },
    { id: "4", label: "Item Four" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <List sx={{ width: 320 }}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} label={item.label} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}
