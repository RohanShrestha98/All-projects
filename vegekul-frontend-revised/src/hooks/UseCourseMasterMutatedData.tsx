import { useMutate } from './Usemutatedata';

export const useCourseMasterMutation = () =>
  useMutate(['course-master'], 'course/');
