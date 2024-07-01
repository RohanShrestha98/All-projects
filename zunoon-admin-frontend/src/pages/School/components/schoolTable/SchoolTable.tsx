import { useMemo } from "react";
import { useSortBy, useTable } from "react-table/dist/react-table.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";
import TableActions from "./SchoolTableActions";
import "../../../../components/Tables/Tables.scss";
import { getPermissions } from "../../../../utils/storage";
import ErrorPages from "../../../../components/ErrorPages/ErrorPages";
import { SchoolTableType } from "../../../../@types/school";

function SchoolTable({
  columns,
  data,
  handleClickUpdate,
  handleToggleStatus,
  formToEdit,
  selectedElementRef,
  isLoading,
  hasError,
  deactivateButton = false,
  disableDelete = false,
  isFetching,
  assignAction,
  formToAssign,
  handleShowAssignModal,
  handleViewAssignedCoursesModal,
  t,
}: SchoolTableType) {
  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const schoolPermissions = getPermissions()
    ?.filter(each => each?.url?.path?.includes("school"))
    ?.map(each => each?.url?.path);

  const mutatePermissions = [
    "/school/update/",
    "/school/courses/",
    "/school/assign-course/",
    "/school/toggle-visibility/",
  ];

  const hasMutate = mutatePermissions?.some(value => {
    return schoolPermissions?.includes(value);
  });

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedDatas = useMemo(() => (data && data?.length ? data : []), [data]);
  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedDatas,
    },
    useSortBy,
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handleSelectedElement = event => {
    selectedElementRef.current = event.currentTarget;
  };

  return (
    <>
      <table className="table" {...getTableProps}>
        <thead className="h5">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
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
                </th>
              ))}
              {(hasMutate || isAdmin) && <th>{t("th_action")}</th>}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr className="" {...row.getRowProps()} onClick={handleSelectedElement}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
                {(hasMutate || isAdmin) && (
                  <TableActions
                    handleShowAssignModal={handleShowAssignModal}
                    handleViewAssignedCoursesModal={handleViewAssignedCoursesModal}
                    handleClickUpdate={handleClickUpdate}
                    handleToggleStatus={handleToggleStatus}
                    data={row.original}
                    formToEdit={formToEdit}
                    formToAssign={formToAssign}
                    isLoading={isLoading}
                    deactivateButton={deactivateButton}
                    userStatus={row.original.isActive}
                    disableDelete={disableDelete}
                    assignAction={assignAction}
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
}

export default withTranslation()(SchoolTable);
