import { IImg, SanityBody } from "./default";

interface ICategorias {
  img_fondo: IImg;
  subtitulo_imagen: string;
  titulo_imagen: string;
  _key: string;
  link?: { alternateUrl: string | undefined };
}

export interface ICategorySelect extends SanityBody {
  titulo: string;
  text_button: string;
  formato_categorias: string;
  descripcion: string;
  categorias: ICategorias[];
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  linkDetail?: any;
}
