import { IImg, SanityBody } from "./default";

export interface IImage50 extends SanityBody {
  seo: string;
  titulo: string;
  img_dos: IImg;
  img_uno: IImg;
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
}
