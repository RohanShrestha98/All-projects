export interface Ilevel {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
}

export interface ILevelType {
  id?: string;
  name?: string;
  description?: string;
  levels?: Ilevel[];
}
