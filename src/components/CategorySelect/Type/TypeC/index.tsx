import { sanityImage } from "@/lib/sanity.image";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { Box, Card, Image, Stack, VStack, Text } from "@chakra-ui/react";
import { ICategory } from "../../Interface";

interface ContainerProps {
  data: ICategorySelect;
  isMobile: boolean;
}

const Category = (props: ICategory) => {
  const { titulo_imagen, subtitulo_imagen, img_fondo, isMobile, link } = props;

  return (
    <Card w="100%" cursor="pointer">
      <Box position="absolute" bottom="0" left="0" width="100%" p="4" mb="20px">
        <Box flex={100}>
          <Text
            fontSize="22px"
            fontWeight={700}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl="10px"
            pt="20px"
            textTransform="uppercase"
            pb="4px"
          >
            {titulo_imagen}
          </Text>
        </Box>
        <Box flex={100}>
          <Text
            fontSize="17px"
            fontWeight={400}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl="10px"
            pb="4px"
          >
            {subtitulo_imagen}
          </Text>
        </Box>
      </Box>
      <Image
        src={sanityImage(img_fondo.asset._ref).url()}
        height={isMobile ? "170px" : "auto"}
        alt="category select"
        objectFit="cover"
      />
    </Card>
  );
};

const TypeC = (props: ContainerProps) => {
  const { data, isMobile } = props;

  return (
    <Stack direction={{ base: "column", sm: "row" }} spacing={3}>
      {" "}
      {/* spacing entre las dos columnas principales */}
      {/* Primera columna: imagen grande */}
      <Box flex="1">
        <Category
          titulo_imagen={data.categorias[0].titulo_imagen}
          subtitulo_imagen={data.categorias[0].subtitulo_imagen}
          img_fondo={data.categorias[0].img_fondo}
          isMobile={isMobile}
          link={data?.alternateUrl}
        />
      </Box>
      {/* Segunda columna: dos imágenes */}
      <VStack spacing={3} flex="1">
        {" "}
        {/* spacing entre las imágenes de la segunda columna */}
        {/* Imagen superior */}
        <Box flex="1" width="100%" height="100%">
          <Category
            titulo_imagen={data.categorias[1].titulo_imagen}
            subtitulo_imagen={data.categorias[1].subtitulo_imagen}
            img_fondo={data.categorias[1].img_fondo}
            isMobile={isMobile}
          />
        </Box>
        {/* Imagen inferior */}
        <Box flex="1" width="100%" height="100%">
          <Category
            titulo_imagen={data.categorias[2].titulo_imagen}
            subtitulo_imagen={data.categorias[2].subtitulo_imagen}
            img_fondo={data.categorias[2].img_fondo}
            isMobile={isMobile}
          />
        </Box>
      </VStack>
    </Stack>
  );
};

export default TypeC;
