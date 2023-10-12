import { Box, Card, Text, Image } from "@chakra-ui/react";
import { ICategory } from "../../Interface";
import { sanityImage } from "@/lib/sanity.image";
import Link from "next/link";

const Category = (props: ICategory) => {
  const { titulo_imagen, subtitulo_imagen, img_fondo, isMobile, type, link } =
    props;

  return (
    <Card as={Link} href={link?.alternateUrl || ""} w="100%" cursor="pointer">
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        p="4"
        mb={isMobile ? "0px" : "20px"}
      >
        <Box flex={100}>
          <Text
            fontSize={isMobile ? "16px" : "22px"}
            fontWeight={700}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl={isMobile ? "0px" : "10px"}
            pt="20px"
            textTransform="uppercase"
            pb="4px"
          >
            {titulo_imagen}
          </Text>
        </Box>
        <Box flex={100}>
          <Text
            fontSize={isMobile ? "15px" : "17px"}
            fontWeight={400}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl={isMobile ? "0px" : "10px"}
            pb="4px"
          >
            {subtitulo_imagen}
          </Text>
        </Box>
      </Box>
      <Image
        src={sanityImage(img_fondo.asset._ref).url()}
        alt="category select"
        height={isMobile ? "273px" : "auto"}
        objectFit="cover"
      />
    </Card>
  );
};

export default Category;
