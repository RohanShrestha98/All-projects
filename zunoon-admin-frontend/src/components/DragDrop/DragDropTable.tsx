import { useEffect, useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTable, useSortBy, useRowSelect } from "react-table";

import { DraggableTableRow } from "./DraggableTableRow";
import { StaticTableRow } from "./StaticTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "../../components/Tables/Tables.scss";

export function DragDropTable({
  columns,
  data,
  setData,
  selectedElementRef,
  hasCheckBox,
  onSelectRows,
  disableDrag,
}) {
  const [activeId, setActiveId] = useState();
  const location = useLocation();
  const isLevelTypePath =
    location.pathname === "/level-type/ " || location.pathname.includes("/level-type");
  const items = useMemo(() => data?.map(({ id }) => id), [data]);

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedDatas = useMemo(() => (data && data?.length ? data : []), [data]);

  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedDatas,
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hasCheckBox &&
        hooks.visibleColumns.push(columns => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div
                onClick={e => e.stopPropagation()}
                style={isLevelTypePath ? { position: "relative", top: "3px" } : {}}
              >
                <input
                  onClick={e => e.stopPropagation()}
                  type="checkbox"
                  {...getToggleAllRowsSelectedProps()}
                />
              </div>
            ),
            Cell: ({ row }) => (
              <div
                onClick={e => e.stopPropagation()}
                style={isLevelTypePath ? { position: "relative", top: "2px" } : {}}
              >
                <input
                  onClick={e => e.stopPropagation()}
                  type="checkbox"
                  {...row.getToggleRowSelectedProps()}
                />
              </div>
            ),
            disableSortBy: true,
          },
          ...columns,
        ]);
    },
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } =
    tableInstance;
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );
  useEffect(() => {
    hasCheckBox && onSelectRows(selectedFlatRows.map(d => d.original).map(each => each.id));
  }, [selectedFlatRows]);
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData(data => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  const handleSelectedElement = event => {
    selectedElementRef.current = event.currentTarget;
  };

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rows.find(({ original }) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  // Render the UI for your table
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <table className={disableDrag ? "table" : "table arangable"} {...getTableProps}>
        <thead className="h5">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {!(hasCheckBox && index === 0) && column.canSort ? (
                    <span className="checkBox">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                          <FontAwesomeIcon icon={faAngleDown} />
                        )
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </span>
                  ) : (
                    <></>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps}>
          <SortableContext items={items && items} strategy={verticalListSortingStrategy}>
            {rows?.map((row, i) => {
              prepareRow(row);
              return (
                <DraggableTableRow
                  key={row?.original?.id}
                  row={row && row}
                  disableDrag={disableDrag}
                  handleSelectedElement={handleSelectedElement}
                />
              );
            })}
          </SortableContext>
        </tbody>
      </table>
      <DragOverlay>
        {activeId && (
          <table style={{ width: "100%" }}>
            <tbody>
              <StaticTableRow row={selectedRow} />
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
