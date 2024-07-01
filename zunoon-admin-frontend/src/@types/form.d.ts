export interface IForm {
    data?: any;
    editform?: any;
    isFormOpen?: boolean;
    setIsFormOpen?: Function | any;
    handleCancel?: Function | any;
    handleClickSubmit?: Function | any;
    handleClickUpdate?: Function | any;
    isSubmitting?: boolean;
    t?: Function;
}