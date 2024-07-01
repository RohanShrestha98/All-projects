import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import '../../App.scss';
import './Table.scss';
import { orderlistentry } from './Tableheader';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function OrderListEntryTable() {
  return (
    <div className="boxtable">
      <Box sx={{ height: 600, width: '100%' }} className="">
        <DataGrid
          className="table"
          rows={rows}
          columns={orderlistentry}
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
