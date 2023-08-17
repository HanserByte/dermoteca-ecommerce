import create from "zustand";

type StringStoreState = {
  value: string;
  setValue: (newValue: string) => void;
};

export const useStore = create<StringStoreState>((set: any) => ({
  value: "1024px",
  setValue: (newValue) => set({ value: newValue }),
}));
