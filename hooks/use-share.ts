import { create } from "zustand";

type ShareStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useShare = create<ShareStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
