import { create } from "zustand";
import Cookies from "universal-cookie";
import { decryptedData, encryptData } from "../utils/crypto";
const cookies = new Cookies();

const videoStore = (set) => ({
  currentSubject: decryptedData(cookies.get("subject")) ?? null,
  setCurrentSubject: (currentSubject) => {
    set(() => {
      cookies.set("subject", encryptData(currentSubject));
      return { currentSubject: currentSubject };
    });
  },
  currentUnit: decryptedData(cookies?.get("unit")) ?? null,
  setCurrentUnit: (currentUnit) => {
    set(() => {
      cookies?.set("unit", encryptData(currentUnit));
      return { currentUnit: currentUnit };
    });
  },
  currentVideo: decryptedData(cookies.get("video")) ?? null,
  setCurrentVideo: (currentVideo) => {
    set(() => {
      cookies.set("video", encryptData(currentVideo));
      return { currentVideo: currentVideo };
    });
  },
  recentVideo: decryptedData(cookies.get("recentVideo")) ?? null,
  setRecentVideo: (recentVideo) => {
    set(() => {
      cookies.set("recentVideo", encryptData(recentVideo));
      return { recentVideo: recentVideo };
    });
  },
});

export const useVideoStore = create(videoStore);
