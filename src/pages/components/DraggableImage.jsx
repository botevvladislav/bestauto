import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableImage = ({ id, url, index, moveImage }) => {
  const [, drag] = useDrag(() => ({
    type: 'image',
    item: { id, index },
  }));

  const [, drop] = useDrop(() => ({
    accept: 'image',
    hover(item, monitor) {
      if (item.index === index) {
        return;
      }
      moveImage(item.index, index);
      item.index = index;
    },
  }));

  return (
    <img
      className="w-auto h-20 mr-3 mt-4"
      ref={(node) => drag(drop(node))}
      src={url}
      alt=""
    />
  );
};

export default DraggableImage;