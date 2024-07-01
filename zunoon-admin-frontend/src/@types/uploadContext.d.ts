export interface IError {
  status: boolean;
  message: string;
}
export interface IValues {
  id?: number;
  title: string;
  description: string;
  instruction: string;
  contentType: string;
  bloomTaxonomyLevel: string;
  file: File;
  link: string;
}

export type UploadContextType = {
  value: IValues | null;
  setValue: React.Dispatch<React.SetStateAction<IValues | null>>;
  uploadFile: any;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadQueue: IValues[];
  log: IValues[];
  temp: IValues | null;
  error: IError;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
