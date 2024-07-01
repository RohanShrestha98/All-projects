export type DeleteModalType = {
  id?: string | number;
  ID?: string;
  name?: string;
  show?: boolean;
  handleClose?: () => void;
  handleDelete?: Function;
  isDeactivate?: boolean;
  isConfirm?: boolean;
  contentBasketAction?: boolean;
  t: Function;
};
