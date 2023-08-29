import { IHeroComponents } from "@/typesSanity/docs/hero";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const TypeB = (props: IContainerProps) => {
  const { data, isMobile } = props;
  return <></>;
};

export default TypeB;
