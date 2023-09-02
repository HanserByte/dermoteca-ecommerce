import { Flex, Image } from "@chakra-ui/react";

import { sanityImage } from "@/lib/sanity.image";
import { IBasicImage } from "@/typesSanity/docs/basicImage60";

import ContainerDermo from "@/components/Common/ContainerDermo";

interface ContainerProps {
  data: IBasicImage;
  isMobile: boolean;
  isLeft: boolean;
}

const ComponentImg = (props: ContainerProps) => {
  const { data, isMobile, isLeft } = props;
  return (
    <ContainerDermo
      pl={isLeft ? "0px" : "145px"}
      pr={isLeft ? "145px" : "0px"}
      pt={isMobile ? "0px" : "75px"}
    >
      <Flex flex={100}>
        <Image
          src={sanityImage(data.img.asset._ref).url()}
          alt="image-60"
          borderRadius={data?.formato_imagen === "b" ? "0px" : "185px"}
        />
      </Flex>
    </ContainerDermo>
  );
};

export default ComponentImg;
