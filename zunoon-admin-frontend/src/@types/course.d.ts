export interface ICourse {
  id?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  hasLevel?: boolean;
  grades?: string[];
  isApproved?: boolean;
  levels?: {
    id: string;
    name: string;
    type?:
      | string
      | {
          id: string;
          name: string;
        };
  }[];
  t?: Function;
}
