import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataFooter extends SanityBody {
  logo: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  inputTexto: string;
  derechos: string;
  enlaces: {
    icono: string;
    nombre: string;
    url: string;
    _key: string;
  }[];
  sobre_nosotros_apartado_1: {
    _key: string;
    nombre: string;
    url: IUrl;
    dataUrl: { url: string };
  }[];
  sobre_nosotros_apartado_2: {
    _key: string;
    nombre: string;
    url: IUrl;
    dataUrl: { url: string };
  }[];
  isPaddingTop?: boolean;
  isPaddingBottom?: boolean;
}

export interface IUrl {
  _ref: string;
  _type: string;
}
