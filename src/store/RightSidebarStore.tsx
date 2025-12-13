import { create } from "zustand";

interface IRightSidebar {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  extraButton?: {
    text: string;
    onClick: (v: any) => void;
  } | null;
  openBar: (
    title: string,
    content: React.ReactNode,
    extraButton?: { text: string; onClick: () => void } | null
  ) => void;
  closeBar: () => void;
}

export const useRightSidebarStore = create<IRightSidebar>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  extraButton: null,
  openBar: (title, content, extraButton = null) =>
    set({ isOpen: true, title, content, extraButton }),
  closeBar: () => set({ isOpen: false }),
}));
