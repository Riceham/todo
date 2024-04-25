import { create } from "zustand";

type WorkspaceStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useWorkspace = create<WorkspaceStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
