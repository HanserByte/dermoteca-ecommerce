import { useMediaQuery } from "@chakra-ui/react";
import { useStore } from "@/store";
import { IHeroComponents } from "@/typesSanity/docs/hero";

import TypeA from "./Type/TypeA";
import TypeC from "./Type/TypeC";

interface ContainerProps {
  data: IHeroComponents;
}

const Hero = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <>
      {data.formato_hero === "a" && <TypeA isMobile={isMobile} data={data} />}
      {data.formato_hero === "c" && <TypeC isMobile={isMobile} data={data} />}
    </>
  );
};

export default Hero;
