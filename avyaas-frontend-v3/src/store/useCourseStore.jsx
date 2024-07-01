import { create } from "zustand";

const courseStore = (set) => ({
  selectedCourseGroup: null,
  selectedCourse: null,

  setSelectedCourseGroup: (courseGroup) => {
    set(() => {
      return { selectedCourseGroup: courseGroup };
    });
  },

  setSelectedCourse: (course) => {
    set(() => {
      return { selectedCourse: course };
    });
  },
});

export const useCourseStore = create(courseStore);
