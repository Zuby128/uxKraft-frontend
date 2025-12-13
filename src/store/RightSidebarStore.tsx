import { create } from "zustand";

interface IRightSidebar {
  isOpen: boolean;
  title: React.ReactNode;
  description?: string;
  content: React.ReactNode;
  extraButton?: {
    text: string;
    onClick: (v: any) => void;
  } | null;
  openBar: (
    title: React.ReactNode,
    content: React.ReactNode,
    description?: React.ReactNode,
    extraButton?: { text: string; onClick: () => void } | null
  ) => void;
  closeBar: () => void;
}

export const useRightSidebarStore = create<IRightSidebar>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  description: "",
  extraButton: null,
  openBar: (title, content, description = "", extraButton = null) =>
    set({
      isOpen: true,
      title,
      content,
      description: description as any,
      extraButton,
    }),
  closeBar: () => set({ isOpen: false }),
}));
