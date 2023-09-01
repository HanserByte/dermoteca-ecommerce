import { IImg, SanityBody } from "./default";

interface ITips {
    
}

export interface IBasicImage extends SanityBody {
  text_button: string;
  titulo: string;
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  img: IImg;
}
