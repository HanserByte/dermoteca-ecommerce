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

type CartDrawerState = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCartDrawer = create<CartDrawerState>((set: any) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}))

type CartProductsState = {
  products: {
    merchandise: {
      id: string
      price: { amount: string }
      product: { title: string; handle: 'string'; featuredImage: { url: string } }
    }
    quantity: number
  }[]
  setProducts: (products: any[]) => void
}
export const useCartProducts = create<CartProductsState>((set: any) => ({
  products: [],
  setProducts: (products: any[]) => set({ products }),
}))
