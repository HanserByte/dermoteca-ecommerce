import { Box, Flex, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";

import MainText from "../../Common/MainText";
import { ITitleRedirect } from "@/components/Interfaces";
import { IHeroComponents } from "@/typesSanity/docs/hero";

import { LogoShortCI, LogoTreatmentCI } from "@/components/Icons";
import RenderOptions from "../../Common/RenderOptions";
import { useState } from "react";
import { useNavbar } from "@/store";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const SampleLinks2 = [
  { title: "bitácora", dataUrl: { url: "" } },
  { title: "agendar cita", dataUrl: { url: "" } },
  { title: "pedidos", dataUrl: { url: "" } },
];

const TypeA = (props: IContainerProps) => {
  const { data, isMobile } = props;
  const { height } = useNavbar();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Flex position="relative" id="hero">
        <Skeleton isLoaded={!isLoading} width="100%">
          <Image
            src={sanityImage(data.backgroundImage.asset._ref).url()}
            alt="Hero"
            pt={isMobile ? "81px" : ""}
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
              </Box>
              {/* CONTENT RIGHT */}
              <Box right={0} position="absolute" pr="30px">
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
                    <Box flex={100} pl="10px">
                      <HStack>
                        {SampleLinks2.map(
                          (item: ITitleRedirect, index: number) => {
                            return (
                              <RenderOptions
                                title={item.title}
                                key={index}
                                dataUrl={{}}
                              />
                            );
                          }
                        )}
                      </HStack>
                    </Box>
                  </Box>
                </HStack>
              </Box>
            </HStack>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default TypeA;
