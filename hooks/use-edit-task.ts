import { create } from "zustand";

type TaskType = {
  id: string;
  task: string;
};

type EditTaskStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
  task: TaskType;
  setTask: (task: TaskType) => void;
};

export const useEditTask = create<EditTaskStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
  task: {
    id: "",
    task: "",
  },
  setTask: (task) => set({ task }),
}));
