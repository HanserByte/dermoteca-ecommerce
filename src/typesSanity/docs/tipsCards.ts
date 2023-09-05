import { IImg, SanityBody } from "./default";

export interface ITips extends SanityBody {
  content: any,
  fecha_tip: string,
  imagen_tip: IImg,
  titulo: string, 
}

export interface ITipsMenu extends SanityBody {
  text_button: string;
  titulo: string;
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  linkDetail?: any;
  link: any,
  tips: ITips[]
}
