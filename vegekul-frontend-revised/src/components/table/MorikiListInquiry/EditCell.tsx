import { MouseEvent } from 'react';
import { withTranslation } from 'react-i18next';

interface Props {
  row: any;
  table: any;
  t: any;
}

const EditCell = ({ row, table, t }: Props) => {
  const meta = table?.options?.meta;
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setRowSelection((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== 'edit') {
      meta?.revertData(row.index, e.currentTarget.name === 'cancel');
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className="flex items-center gap-x-2">
      {!row.original?.idx && (
        <button
          className="bg-danger text-white h-5 w-5 rounded-full"
          onClick={removeRow}
          name="remove"
        >
          X
        </button>
      )}
      <input
        type="checkbox"
        name="edit"
        checked={meta?.rowSelection?.[row?.id] ? true : false}
        className="mr-4 h-4 w-4 cursor-pointer accent-primary"
        onClick={(e: any) => setEditedRows(e)}
      />
    </div>
  );
};

export default withTranslation()(EditCell);
