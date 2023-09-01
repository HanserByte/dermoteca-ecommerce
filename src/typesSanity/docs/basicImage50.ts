import { IImg, SanityBody } from "./default";

export interface IBasicImage extends SanityBody {
  seo: string;
  text_button_dos: string;
  text_button_uno: string;
  text_link_dos: string;
  text_link_uno: string;
  texto: string;
  titulo: string;
  img: IImg;
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  colorFondo: string;
}
