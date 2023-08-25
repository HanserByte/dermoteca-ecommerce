interface ICommons {
  _updatedAt: string;
  _type: string;
  _rev: string;
  _id: string;
  _createdAt: string;
}

interface IImg {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface IHeroComponents extends ICommons {
  title: string;
  textImage: IImg;
  text: string;
  backgroundImage: IImg;
  formato_hero: string;
  isPadding?: boolean
}

export interface IHero {
  _id: string;
  title: string;
  slug: string;
  componentes: IHeroComponents[];
}
