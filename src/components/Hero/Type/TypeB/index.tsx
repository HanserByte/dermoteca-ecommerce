import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { sanityImage } from "@/lib/sanity.image";
import { IHeroComponents } from "@/typesSanity/docs/hero";
import { useState } from "react";
import MainText from "../../Common/MainText";

interface IContainerProps {
  data: IHeroComponents;
  isMobile: boolean;
}

const TypeC = (props: IContainerProps) => {
  const { data, isMobile } = props;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Flex position="relative" id="hero" mt={data.isPadding ? "37px" : ""}>
      <Skeleton isLoaded={!isLoading} width="100%" height="auto">
        <Image
          src={sanityImage(
            isMobile
              ? data.backgroundImageMobile.asset._ref
              : data.backgroundImage.asset._ref
          ).url()}
          alt="Hero"
          height={isMobile ? "auto" : ""}
          objectFit={"cover"}
          width="100%"
          objectPosition={isMobile ? "90% 50%" : ""}
          onLoad={handleImageLoad}
        />
      </Skeleton>
      {!isMobile && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width={"100%"}
          overflow="hidden"
          p="4"
          zIndex={99999}
        >
          {!isMobile && (
            <Flex
              flex={100}
              id="text-image"
              justifyContent={isMobile ? "center" : ""}
            >
              {data?.textImage && !isMobile && (
                <Image
                  src={sanityImage(data?.textImage?.asset?._ref || "").url()}
                  alt="Image Hero"
                />
              )}
            </Flex>
          )}
          {data.text && !isMobile && (
            <Flex mt="-240px" justifyContent="center">
              <Text
                width="550px"
                textAlign="center"
                color={"white"}
                lineHeight="20px"
                fontSize="14px"
                fontWeight={500}
                letterSpacing="1.05px"
              >
                {data?.text}
              </Text>
            </Flex>
          )}
          {data.text_button && !isMobile && (
            <Flex justifyContent="center" mt="23px">
              <Button
                bg="white"
                borderRadius="35px"
                minW={
                  data.text_button && data?.text_button.length > 9
                    ? "170px"
                    : "110px"
                }
                mb="5px"
              >
                <Text textTransform="uppercase" color="black" noOfLines={1}>
                  {data?.text_button}
                </Text>
              </Button>
            </Flex>
          )}
        </Box>
      )}

      {isMobile && (
        <Flex
          flex={100}
          id="text-image"
          justifyContent={isMobile ? "center" : ""}
          position="absolute"
          width="100%"
          mt="20px"
          overflow="hidden"
        >
          {data?.textImage && (
            <Image
              src={sanityImage(data?.textImage?.asset?._ref || "").url()}
              alt="Image Hero"
              width="100%"
            />
          )}
        </Flex>
      )}
      {isMobile && (
        <Box
          position="absolute"
          width="100%"
          p="4"
          mt="70px"
          textAlign="center"
          overflow="hidden"
        >
          <Box pb="13px" pl="5px" pr="5px">
            <MainText
              title={data?.text || ""}
              fontSize="10px"
              textAlign="center"
            />
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          position="absolute"
          bottom="0"
          width="100%"
          p="4"
          justifyContent="center"
          textAlign="center"
        >
          <Button
            bg="white"
            borderRadius="35px"
            minW={
              data.text_button && data?.text_button.length > 9
                ? "170px"
                : "110px"
            }
            mb="5px"
          >
            <Text textTransform="uppercase" color="black" noOfLines={1}>
              {data?.text_button}
            </Text>
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default TypeC;
