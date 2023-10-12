export interface ICategory {
  titulo_imagen: string;
  subtitulo_imagen: string;
  img_fondo: any;
  isMargin?: boolean;
  isMobile?: boolean;
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
  type?: string;
  link?: {
    alternateUrl: string;
  };
}
