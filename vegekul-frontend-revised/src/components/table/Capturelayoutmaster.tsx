import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../../App.scss";
import { Link } from "react-router-dom";
import { capturelayoutmaster } from "./Tableheader";
import "./Table.scss";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TFunction } from "i18next";
import { withTranslation } from "react-i18next";

interface CaptureLayoutMasterTableProps {
  t: TFunction;
}

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function CaptureLayoutMasterTable({ t }: CaptureLayoutMasterTableProps) {
  const actionColumn: GridColDef[] = [
    {
      field: "action",
      width: 100,
      renderHeader: () => {
        return (
          <div className="headerAction">
            <p>{t("action")}</p>
          </div>
        );
      },
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/adminedit" style={{ textDecoration: "none" }}>
              <div className="viewButton">
                <BiEdit className="actionButton" />
              </div>
            </Link>
            <div className="deleteButton" onClick={() => params.row.id}>
              <BiTrash className="actionButton" />
            </div>
            {/* <Link to="/admindetails" style={{ textDecoration: "none" }}>
                          <div className="viewButton"><img src="img/view.png" alt="" /></div>
                      </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="boxtable">
      <Box sx={{ height: 635, width: "100%" }} className="">
        <DataGrid
          className="table"
          rows={rows}
          columns={capturelayoutmaster.concat(actionColumn)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9,
              },
            },
          }}
          pageSizeOptions={[9]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
        />
      </Box>
    </div>
  );
}

export default withTranslation()(CaptureLayoutMasterTable);
