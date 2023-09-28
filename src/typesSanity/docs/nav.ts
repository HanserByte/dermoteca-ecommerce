import { SanityBody } from "@/typesSanity/docs/default";

export interface IDataNav extends SanityBody {
  navbar: {
    banner: {
      _key: string;
      content: any;
    }[];
  };
  logo: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  links_izquierda: ILinks[];
  links_derecha: ILinksRight[];
  links_derecha_mobile: ILinksRight[];
}

interface ILinksRight {
  _key: string;
  icono: string;
  title: string;
  link: {
    url?: string;
    isSubmenu: boolean;
    submenu?: ISubMenu[];
  };
  dataUrl: { url: string };
}

interface ILinks {
  _key: string;
  title: string;
  link: {
    url?: string;
    isSubmenu: boolean;
    submenu?: ISubMenu[];
  };
  dataUrl: { url: string };
}

interface ISubMenu {
  _key: string;
  title: string;
  url: string;
}
