import { ICourse } from "./course";
import { IGrade } from "./grade";
import { IndicatorType } from "./indicator";
import { SkillType } from "./skill";

export interface ILesson {
  id: string;
  title: string;
  description?: string;
  course: ICourse;
  grade: IGrade;
  indicator: IndicatorType;
  skill: SkillType;
}

export interface ILessonResponse {
  id?: string;
  title?: string;
  description?: string;
}
