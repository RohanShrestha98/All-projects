import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import TableActions from "../TableActions/TableActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./Tables.scss";
import { withTranslation } from "react-i18next";
import { TableType } from "../../@types/table";
import { useLocation } from "react-router-dom";
import ErrorPages from "../ErrorPages/ErrorPages";

type IndeterminateCheckboxProps = {
  indeterminate: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
  ({ indeterminate, ...rest }, ref) => {
    return (
      <>
        <input id="table_check" type="checkbox" {...rest} className="" />
      </>
    );
  },
);

const Tables = ({
  columns,
  data,
  ID,
  handleClickUpdate,
  handleDelete,
  formToEdit,
  selectedElementRef,
  isLoading,
  deactivateButton = false,
  disableDelete = false,
  isFetching,
  assignAction,
  formToAssign,
  hasError,
  staffAction,
  contentBasketAction,
  t,
  hasActions = true,
  hasCheckBox,
  onSelectRows,
  isAssigned,
  setIsAssigned,
}: TableType) => {
  const location = useLocation();
  const isLevelTypePath =
    location.pathname === "/level-type/ " || location.pathname.includes("/level-type");

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
              <div style={isLevelTypePath ? { position: "relative", top: "3px" } : {}}>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div style={isLevelTypePath ? { position: "relative", top: "2px" } : {}}>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
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

  useEffect(() => {
    if (isAssigned) {
      selectedFlatRows.forEach(row => {
        row.toggleRowSelected(false);
        setIsAssigned(false);
      });
    }
  }, [isAssigned, selectedFlatRows]);

  const handleSelectedElement = event => {
    selectedElementRef.current = event.currentTarget;
  };

  useEffect(() => {
    hasCheckBox && onSelectRows(selectedFlatRows.map(d => d.original).map(each => each.id));
  }, [selectedFlatRows]);

  return (
    <>
      <table className="table" {...getTableProps}>
        <thead className="h5">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {!(hasCheckBox && index === 0) && column.canSort ? (
                    <span >
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

              {hasActions && (
                <th style={{ display: "flex", justifyContent: "center", border: "none" }}>
                  {t("th_action")}
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={handleSelectedElement}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="cell_data">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {hasActions && (
                  <TableActions
                    handleClickUpdate={handleClickUpdate}
                    handleDelete={handleDelete}
                    data={row.original}
                    ID={ID}
                    formToEdit={formToEdit ? formToEdit : <></>}
                    formToAssign={formToAssign}
                    isLoading={isLoading}
                    deactivateButton={deactivateButton}
                    userStatus={row.original.isActive}
                    disableDelete={disableDelete}
                    assignAction={assignAction}
                    staffAction={staffAction}
                    contentBasketAction={contentBasketAction}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ErrorPages isFetching={isFetching} data={data} error={hasError} />
    </>
  );
};

export default withTranslation()(Tables);
