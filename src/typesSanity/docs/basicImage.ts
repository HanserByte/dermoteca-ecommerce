import { IImg, SanityBody } from "./default";

export interface IBasicImageText extends SanityBody {
  img_web: IImg;
  img_mobile: IImg;
  seo: string;
  titulo: string;
  texto: string;
  color_texto: { value: string };
  text_button: string;
  link?: any;
  linkDetail?: any;
  color_botton: { value: string };
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  alternateUrl?: string;
}
