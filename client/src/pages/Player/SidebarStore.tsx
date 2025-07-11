import { create } from "zustand";

export const sidebarStore = create((set) => ({
  openSidebar: false,
  setOpenSidebar: (o) => { set({ openSidebar: o }) },
  openLoad: false,
  setOpenLoad: (o) => { set({ openLoad: o }) },
}));