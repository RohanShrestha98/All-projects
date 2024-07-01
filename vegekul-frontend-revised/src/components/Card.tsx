import type { XYCoord } from "dnd-core";
import type { Identifier } from "dnd-core";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "../types";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  idx: string;
  id: any;
  amount: string;
  customer_code: string;
  customer_name: string;
  delivery_date: string;
  item_quantity: number;
  order_number: string;
  product_code: string;
  product_name: string;
  unit_of_measure: string;
  unit_price: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({
  id,
  customer_code,
  customer_name,
  delivery_date,
  item_quantity,
  order_number,
  product_code,
  product_name,
  unit_of_measure,
  unit_price,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="flex flex-row gap-4"
      data-handler-id={handlerId}
    >
      <p>{index + 1}</p>
      <p className="min-w-50 max-w-200">{customer_code}</p>
      <p className="min-w-200 max-w-350">{customer_name}</p>
      <p className="min-w-100 max-w-350">{product_code}</p>
      <p className="min-w-100 max-w-200">{delivery_date}</p>
      <p className="min-w-50 max-w-200">{item_quantity}</p>
      <p className="min-w-100 max-w-200">{order_number}</p>
      <p className="min-w-100 max-w-200">{product_code}</p>
      <p className="min-w-150 max-w-200">{product_name}</p>
      <p className="min-w-50 max-w-200">{unit_of_measure}</p>
      <p className="min-w-100 max-w-200">{unit_price}</p>
    </div>
  );
};
