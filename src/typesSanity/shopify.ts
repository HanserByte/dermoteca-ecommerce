export interface ICartLineInput {
  quantity: number;
  merchandiseId: string;
}
export interface IUpdateCartLineInput {
  quantity: number;
  id: string;
}

export interface IPrice {
  amount: string;
}

export interface IImage {
  url: string;
}

export interface IProduct {
  id: string;
  featuredImage: IImage;
  handle: string;
  title: string;
  priceRange: IPriceRange;
}

export interface ISanityProduct {
  store: IStore;
}

export interface ISlug {
  current: string;
}

export interface IPriceRange {
  maxVariantPrice: number | { amount: string };
  minVariantPrice: number | { amount: string };
}

export interface IStore {
  slug: ISlug;
  previewImageUrl: string;
  title: string;
  priceRange: IPriceRange;
  gid: string;
}

export interface IMerchandise {
  id: string;
  price: IPrice;
  product: IProduct;
}

export interface ICartProductLine {
  id: string;
  merchandise: IMerchandise;
  quantity: number;
}
