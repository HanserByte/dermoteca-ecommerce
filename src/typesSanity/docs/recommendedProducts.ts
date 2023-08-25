import { IImg, SanityBody } from "./default";

export interface IProducts {
  imagen_producto: IImg;
  titulo_producto: string;
  precio_producto: string;
}

export interface IRecommendedProducts extends SanityBody {
  titulo: string;
  text_button: string;
  productos: IProducts[];
}
