import { IImg, SanityBody } from "./default";

export interface ICreateAccount extends SanityBody {
  isPaddingBottom?: boolean;
  isPaddingTop?: boolean;
  seo: string;
  title: string;
}
