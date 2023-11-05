import { useMobileView } from "@/hooks/responsive";
import { sanityImage } from "@/lib/sanity.image";
import { IImg } from "@/typesSanity/docs/default";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
import { PortableTextBlockComponent } from "@portabletext/react";
import React from "react";
import PortableText from "../PortableText";
import { formatDate } from "@/utils";
import { COLORS } from "@/utils/constants";
import { default as NextImage } from "next/image";

interface IImageAndContent {
  data: {
    image: IImg;
    content: PortableTextBlockComponent;
    componentOrientation: string;
    imageSide: string;
    _createdAt: string;
  };
}

const ImageAndContent = ({ data }: IImageAndContent) => {
  const { image, content, componentOrientation, imageSide, _createdAt } = data;
  const { isMobile } = useMobileView();
  const alignment =
    componentOrientation === "vertical" || isMobile ? "center" : "flex-star";
  let orientation = componentOrientation === "horizontal" ? "row" : "column";
  orientation += imageSide === "izquierdo" ? "" : "-reverse";
  const gap = componentOrientation === "vertical" || isMobile ? 50 : 100;
  const desktopWidth = componentOrientation === "vertical" ? "100%" : "50%";
  const maxWidth = componentOrientation === "horizontal" ? "auto" : 1000;
  const imageUrl = sanityImage(image.asset._ref).url();

  return (
    <>
      {isMobile && (
        <AspectRatio ratio={1 / 1}>
          <Box width="100%" objectFit="cover" w={desktopWidth}>
            <NextImage
              loading="eager"
              src={imageUrl}
              alt=""
              width={430}
              height={439}
              style={{ width: "100%" }}
            />
          </Box>
        </AspectRatio>
      )}
      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        {/* @ts-ignore */}
        <Flex
          margin="auto"
          gap={gap}
          alignItems={alignment}
          maxW={maxWidth}
          flexDirection={orientation}
        >
          {!isMobile && (
            <Box top="140" position="sticky" objectFit="cover" w={desktopWidth}>
              <NextImage
                loading="eager"
                style={{ position: "sticky", top: "140px" }}
                src={imageUrl}
                alt=""
                width={720}
                height={700}
              />
            </Box>
            // <></>
          )}
          <Box w={isMobile ? "100%" : desktopWidth} flex={1}>
            <Text color={COLORS.GREEN} fontWeight={700}>
              {formatDate(_createdAt)}
            </Text>
            <PortableText blocks={content} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ImageAndContent;
