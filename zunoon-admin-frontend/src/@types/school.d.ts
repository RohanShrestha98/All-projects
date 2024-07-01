import { ReactElement } from "react";
import { IFileUploadResponse } from "./content";

export type ISchoolProps = {
  id?: string;
  data?: any;
  editform?: any;
  handleCancel?: any;
  handleClickSubmit?: any;
  handleClickUpdate?: any;
  isSubmitting?: boolean;
  setIsSubmiting?: Function | any;
  isLoading?: boolean;
  t: Function;
};

export interface ISchool {
  id?: string;
  name: string;
  subdomain: string;
  taxPayerID: string;
  sector: string;
  color: string;
  file?: IFileUploadResponse;
  address: {
    address1: string;
    address2: string;
    municipality: string;
    department: string;
    country: string;
  };
  contact: {
    contactName: string;
    cellPhone: string;
    phoneNumber: string;
    email: string;
  };
  feature: {
    plan: string;
    deliverymodality: string;
    educationLevels: {
      id?: string;
      name?: string;
    }[];
  };
}

interface ISelectLabelValue {
  value: string;
  label: string | JSX.Element;
}

export interface ISelect {
  sector: string;
  plan: string;
  deliveryModality: string;
}

export type SchoolContextType = {
  schoolData: ISchool;
  setSchoolData: React.Dispatch<React.SetStateAction<ISchool>>;
  handleSchoolUpdate: Function;
};
export interface IResError {
  name?: string;
  subdomain?: string;
  taxPayerID?: string;
  email?: string;
  cellPhone?: string;
}

export type SchoolTableType = {
  columns: any[];
  data: any;
  handleClickUpdate?: Function;
  handleToggleStatus?: Function;
  formToEdit: ReactElement;
  selectedElementRef: { current: HTMLElement | null };
  isLoading?: boolean;
  isFetching?: boolean;
  hasError?: boolean;
  deactivateButton?: boolean;
  userStatus?: boolean;
  disableDelete?: boolean;
  assignAction?: boolean;
  formToAssign?: ReactElement;
  handleShowAssignModal: () => void;
  handleViewAssignedCoursesModal: () => void;
  t: Function;
};
