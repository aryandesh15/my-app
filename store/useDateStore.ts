// store/useDateStore.ts
import { create } from "zustand";

type DateState = {
  date: Date;
  setDate: (d: Date) => void;
};

const useDateStore = create<DateState>((set) => ({
  date: new Date(),
  setDate: (d: Date) => set({ date: d }),
}));

export default useDateStore;
