import { IFileUploadResponse } from "./content";

export interface IStaff {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: { id: number; name: string };
  file?: IFileUploadResponse;
  password?: string;
  middleName?: string;
  phoneNumber?: string;
  permissions?: [];
  isRoleUpdated?: boolean;
  fileType?: string;
  isActive?: boolean;
}
