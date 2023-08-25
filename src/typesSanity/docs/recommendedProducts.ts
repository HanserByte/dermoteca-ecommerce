import { IImg, SanityBody } from "./default";

export interface IRecommendedProducts extends SanityBody {
  titulo: string;
  text_button: string;
  productos: {
    imagen_producto: IImg;
    titulo_producto: string;
    precio_producto: string;
  }[];
}
