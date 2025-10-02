import { Box, Flex, Image, Skeleton } from "@chakra-ui/react";
import { useNavbar } from "@/store";

import { sanityImage } from "@/lib/sanity.image";
import { IHeroComponents } from "@/typesSanity/docs/hero";
import { useState } from "react";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const TypeC = (props: IContainerProps) => {
  const { data, isMobile } = props;
  const { height } = useNavbar();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Flex position="relative" id="hero" mt={`${height}px`}>
      <Skeleton isLoaded={!isLoading} width="100%">
        <Image
          src={sanityImage(data.backgroundImage.asset._ref).url()}
          alt="Hero"
          pt={isMobile ? "0" : ""}
          height={isMobile ? "900px" : ""}
          objectFit={"cover"}
          width="100%"
          objectPosition={isMobile ? "90% 50%" : ""}
          onLoad={handleImageLoad}
        />
      </Skeleton>
      <Box
        position="absolute"
        top="0"
        left="0"
        overflow="auto"
        p="4"
        zIndex={99999}
        id="box-text-image"
        width="100%"
      >
        <Flex
          flex={100}
          id="text-image"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {data?.textImage && (
            <Image
              src={sanityImage(data?.textImage?.asset?._ref || "").url()}
              alt="Image Hero Text"
              mt="80px"
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default TypeC;
