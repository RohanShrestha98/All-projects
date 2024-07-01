import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

const DraggingRow = styled.td`
  background: rgba(127, 207, 250, 0.3);
`;

const TableData = styled.td`
  background: white;
  &:first-of-type {
    min-width: 20ch;
  }
`;

export const DraggableTableRow = ({ row, handleSelectedElement, disableDrag }) => {
    const {
        attributes,
        listeners,
        transform,
        transition,
        setNodeRef,
        isDragging
    } = useSortable({
        id: row.original.id
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition
    };
    return (
        <tr ref={setNodeRef} style={style} {...row.getRowProps()} onClick={handleSelectedElement}>
            {isDragging ? (
                <DraggingRow colSpan={row.cells.length}>&nbsp;</DraggingRow>
            ) : (
                row.cells.map((cell, i) => {
                    return (
                        <>
                            {
                                i !== 0 && !disableDrag ? <TableData {...cell.getCellProps()}>
                                    <span  {...attributes} {...listeners} >{cell.render("Cell")}</span>
                                </TableData> : <TableData {...cell.getCellProps()}>
                                    <span >{cell.render("Cell")}</span>
                                </TableData>
                            }
                        </>
                    );

                })
            )}
        </tr >
    );
};
