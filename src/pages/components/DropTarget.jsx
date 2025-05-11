import React from "react";
import { useDrop } from "react-dnd";

const DropTarget = ({ index, onMoveImage }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => onMoveImage(item.index, index),
    canDrop: (item) => item.index !== index,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const borderColor = canDrop && isOver ? "green" : "transparent";

  return (
    <div
      ref={drop}
      className="w-1/4 px-2 py-1"
      style={{ border: `2px dashed ${borderColor}` }}
    />
  );
};

export default DropTarget;