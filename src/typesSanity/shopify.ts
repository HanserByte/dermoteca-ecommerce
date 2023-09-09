export interface ICartLineInput {
  quantity: number
  merchandiseId: string
}
export interface IUpdateCartLineInput {
  quantity: number
  id: string
}

export interface IPrice {
  amount: string
}

export interface IImage {
  url: string
}

export interface IProduct {
  featuredImage: IImage
  handle: string
  title: string
}

export interface IMerchandise {
  id: string
  price: IPrice
  product: IProduct
}

export interface ICartProductLine {
  id: string
  merchandise: IMerchandise
  quantity: number
}
