import { create } from "zustand";

const modalStore = (set) => ({
  isConfirmModalOpen: false,
  isCourseEnrollModalOpen: false,
  isCustomDrawerOpen: false,
  toggleConfirmModal: () => {
    set((state) => ({
      isConfirmModalOpen: !state.isConfirmModalOpen,
    }));
  },
  toggleCourseEnrollModal: () => {
    set((state) => ({
      isCourseEnrollModalOpen: !state.isCourseEnrollModalOpen,
    }));
  },
  toggleCustomDrawer: () => {
    set((state) => ({
      isCustomDrawerOpen: !state.isCustomDrawerOpen,
    }));
  },
});

export const useModalStore = create(modalStore);
