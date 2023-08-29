import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";

import MainText from "../../Common/MainText";
import { ITitleRedirect } from "@/components/Interfaces";
import { IHeroComponents } from "@/typesSanity/docs/hero";

import { LogoShortCI, LogoTreatmentCI } from "@/components/Icons";
import RenderOptions from "../../Common/RenderOptions";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const TypeC = (props: IContainerProps) => {
  const { data, isMobile } = props;

  return (
    <Flex position="relative" id="hero" mt={data.isPadding ? "75px" : ""}>
      <Image
        src={sanityImage(data?.backgroundImage.asset._ref).url()}
        alt="Hero"
        pt={isMobile ? "81px" : ""}
        height={isMobile ? "900px" : ""}
        objectFit={"cover"}
        width="100%"
        objectPosition={isMobile ? "90% 50%" : ""}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        overflow="auto"
        p="4"
        zIndex={99999}
        id="box-text-image"
      >
        <Flex
          flex={100}
          id="text-image"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image
            src={sanityImage(data?.textImage.asset._ref).url()}
            alt="Image Hero Text"
            mt="80px"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default TypeC;
