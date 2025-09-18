import { Box, Flex, HStack, Image, Skeleton } from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";

import MainText from "../../Common/MainText";
import { IHeroComponents } from "@/typesSanity/docs/hero";

import { LogoShortCI } from "@/components/Icons";
import { useNavbar } from "@/store";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const TypeA = (props: IContainerProps) => {
  const { data, isMobile } = props;
  const { height } = useNavbar();
  const image = isMobile
    ? data.backgroundImageMobile.asset._ref
    : data.backgroundImage.asset._ref;

  console.log(data);

  return (
    <>
      <Flex position="relative" id="hero">
        <Image
          src={sanityImage(image).url()}
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
          width={isMobile ? "100%" : "56%"}
          maxHeight="60vh"
          overflow="auto"
          p="4"
          pl={isMobile ? "" : "145px"}
          mt={isMobile ? `${height}px` : "180px"}
          zIndex={100}
        >
          <Flex
            flex={100}
            id="text-image"
            justifyContent={isMobile ? "center" : ""}
          >
            {data?.textImage && (
              <Image
                src={sanityImage(data?.textImage?.asset?._ref || "").url()}
                alt="Image Hero"
              />
            )}
          </Flex>

          {!isMobile && <MainText title={data?.text || ""} />}
        </Box>
        {isMobile && (
          <Box position="absolute" bottom="0" width="100%" p="4">
            <Box pb="13px" pl="5px" pr="5px">
              <MainText title={data?.text || ""} />
            </Box>
          </Box>
        )}
        {!isMobile && (
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            p="4"
            mb="20px"
          >
            <HStack>
              <Box ml="10px" />
              <LogoShortCI />
              {/* <Box pb="13px">
                <Text
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="normal"
                  color="white"
                  cursor="pointer"
                  pl="10px"
                  pt="20px"
                  textTransform="uppercase"
                  pb="4px"
                >
                  mi historial
                </Text>
                <Box flex={100} pl="10px">
                  <HStack>
                    {SampleLinks2.map((item: ITitleRedirect, index: number) => {
                      return (
                        <RenderOptions
                          title={item.title}
                          key={index}
                          dataUrl={{}}
                        />
                      );
                    })}
                  </HStack>
                </Box>
              </Box> */}
              {/* CONTENT RIGHT */}
              {/* <Box right={0} position="absolute" pr="30px">
                <HStack>
                  <LogoTreatmentCI />
                  <Box pb="13px">
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                      lineHeight="normal"
                      color="white"
                      cursor="pointer"
                      pl="10px"
                      pt="20px"
                      textTransform="uppercase"
                      pb="4px"
                    >
                      nuestros tratamientos
                    </Text>
                    <Box flex={100} pl="10px"></Box>
                  </Box>
                </HStack>
              </Box> */}
            </HStack>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default TypeA;
