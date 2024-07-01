import type { ICourse } from './course';
import type { IGrade } from './grade';

export type SkillType = {
  course: ICourse;
  description: string;
  grade: IGrade;
  id: number;
  name: string;
  thumbnail: string;
};
