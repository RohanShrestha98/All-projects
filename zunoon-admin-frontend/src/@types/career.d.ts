import { ICourse } from "./course";

export interface ICareer {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    grades?: string[]
    course: ICourse[];
}