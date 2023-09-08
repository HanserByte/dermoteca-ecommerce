import create from 'zustand'

type StringStoreState = {
  value: string
  setValue: (newValue: string) => void
}

export const useStore = create<StringStoreState>((set: any) => ({
  value: '1024px',
  setValue: newValue => set({ value: newValue }),
}))

type NavbarState = {
  height: number
  setHeight: (height: number) => void
}
export const useNavbar = create<NavbarState>((set: any) => ({
  height: 0,
  setHeight: (height: number) => set({ height }),
}))
