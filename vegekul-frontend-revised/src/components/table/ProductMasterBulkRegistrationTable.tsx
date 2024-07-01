import React from "react";
import { useImperativeHandle } from "react";
import Box from "@mui/material/Box";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import "../../App.scss";
import { Link } from "react-router-dom";
import "./Table.scss";

export const ProductMasterBulkRegistrationTable = React.forwardRef(
  (
    {
      tableData,
      setSelectedRows,
    }: {
      tableData: any;
      setSelectedRows: any;
      setExportData: React.Dispatch<React.SetStateAction<never[]>>;
    },
    ref: any
  ) => {
    function CustomToolbar() {
      const apiRef = useGridApiContext();

      const handleExport = () => {
        return apiRef.current.getSortedRows();
      };

      useImperativeHandle(ref, () => ({
        handleExport,
      }));

      return (
        <GridToolbarContainer
          style={{
            display: "hidden",
          }}
          id="export-data"
          ref={ref}
          onClick={handleExport}
        ></GridToolbarContainer>
      );
    }

    return (
      <div className="boxtable">
        <Box sx={{ height: 635, width: "100%" }} className="">
          <DataGrid
            className="table"
            rows={tableData.data}
            columns={tableData.headers}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{
              toolbar: () => <CustomToolbar />,
            }}
            onRowSelectionModelChange={(selection) => {
              setSelectedRows(selection);
            }}
            pageSizeOptions={[9]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
  }
);

export default ProductMasterBulkRegistrationTable;
