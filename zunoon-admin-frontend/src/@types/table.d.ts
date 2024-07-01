import { Dispatch, ReactElement, SetStateAction } from "react";

export type TableType = {
  columns: any[];
  data: any;
  ID?: string;
  handleClickUpdate?: Function;
  handleDelete: Function;
  formToEdit?: ReactElement;
  selectedElementRef?: { current: HTMLElement | null };
  isLoading?: boolean;
  isFetching?: boolean;
  hasError?: boolean;
  deactivateButton?: boolean;
  userStatus?: boolean;
  disableDelete?: boolean;
  assignAction?: boolean;
  formToAssign?: ReactElement;
  t: Function;
  hasActions?: boolean;
  staffAction?: boolean;
  contentBasketAction?: boolean;
  hasCheckBox?: boolean;
  onSelectRows?: Function;
  isAssigned?: boolean;
  setIsAssigned?: Dispatch<SetStateAction<boolean>>;
};
