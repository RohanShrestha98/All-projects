import { IFileUploadResponse } from "./content";
import type { ICourse } from "./course";

export interface IGrade {
  id?: string;
  name?: string;
  description?: string;
  thumbnail?: IFileUploadResponse;
  course?: ICourse;
  careers?: [{ id: string; name: string }];
  grades?: [{ id: string; name: string }];
  gradeCategory?: { id: string; name: string };
  hasCareer?: boolean;
}
