import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TFunction } from "i18next";
import { withTranslation } from "react-i18next";
import { companymaster } from "./Tableheader";
import CompanyMasterFormModel from "../../pages/company master/CompanyMasterFormModel";
import "../../App.scss";
import "./Table.scss";
import { CompanyType } from "../../pages/company master/CompanyMasterFormModel";

interface CompanymasterTableProps {
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

function CompanyMasterTable({
  data,
  handleUpdate,
  handleDelete,
  setPageDetail,
  count,
  pageDetail,
  t,
}: any) {
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
            <div className="viewButton">
              <CompanyMasterFormModel
                isEdit={true}
                handleUpdate={handleUpdate}
                data={params.row}
                triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
              >
                <BiEdit className="actionButton" />
              </CompanyMasterFormModel>
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.idx)}
            >
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

  const [tableRows, setTableRows] = useState<any>([]);
  useEffect(() => {
    const formatData = () => {
      const finalData: any[] =
        data &&
        data.map((each: CompanyType, index: number) => {
          return {
            ...each,
            id: index + 1,
          };
        });
      setTableRows(finalData);
    };
    formatData();
  }, [data]);

  return (
    <div className="boxtable">
      <Box sx={{ height: 635, width: "100%" }} className="">
        <DataGrid
          pagination
          className="table"
          rows={tableRows}
          rowCount={count}
          paginationMode="server"
          columns={companymaster.concat(actionColumn)}
          initialState={{
            pagination: {
              paginationModel: {
                ...{ ...pageDetail, page: pageDetail.page - 1 },
              },
            },
          }}
          onPaginationModelChange={(details, b) => {
            setPageDetail(details.page + 1, details.pageSize);
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
        />
      </Box>
    </div>
  );
}

export default withTranslation()(CompanyMasterTable);
