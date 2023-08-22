import Hero from "@/components/Hero";
import { IHero, IHeroComponents } from "@/typesSanity/docs/hero";

interface IHeroProps {
  data: IHeroComponents;
}

const HeroSanity = ({ data }: IHeroProps) => {
  return <Hero data={data} />;
};

export default HeroSanity;
