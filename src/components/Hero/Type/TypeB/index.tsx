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

  const handleOpen = () => {
    const uri = data.linkDetail === undefined ? " " : data?.linkDetail?.dataUrl?.url;
    const newURL = "/" + uri;
    window.location.href = newURL;
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
          height="100%"
          overflow="hidden"
          p="4"
          zIndex={99999}
        >
          {!isMobile && (
            <Flex
              flex={100}
              id="text-image"
              alignItems="center" // Centra verticalmente
              justifyContent="center" // Centra horizontalmente
              height="100%"
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
                onClick={handleOpen}
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
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          overflow="hidden"
          p="4"
          zIndex={99999}
        >
          <Flex
            flexDir="column"
            alignItems="center" // Centra verticalmente
            justifyContent="center" // Centra horizontalmente
            height="100%"
          >
            {data?.textImage && (
              <Image
                src={sanityImage(data?.textImage?.asset?._ref || "").url()}
                alt="Image Hero"
              />
            )}
            {data.text && (
              <Text
                width="550px"
                textAlign="center"
                pl="50px"
                pr="50px"
                color="white"
                mt="-50px"
                lineHeight="20px"
                fontSize="14px"
                fontWeight={500}
                letterSpacing="1.05px"
              >
                {data?.text}
              </Text>
            )}
          </Flex>
        </Box>
      )}
      {/* {isMobile && data.text && (
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
      )} */}
      {isMobile && data.text_button && (
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
            onClick={handleOpen}
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
