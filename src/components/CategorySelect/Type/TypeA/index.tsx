import { sanityImage } from "@/lib/sanity.image";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { Box, Card, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { ICategory } from "../../Interface";

interface ContainerProps {
  data: ICategorySelect;
  isMobile: boolean;
}

const Category = (props: ICategory) => {
  const { titulo_imagen, subtitulo_imagen, img_fondo } = props;

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
        alt="category select"
      />
    </Card>
  );
};

const TypeA = (props: ContainerProps) => {
  const { data, isMobile } = props;
  return (
    <SimpleGrid
      spacing={3}
      templateColumns={
        isMobile ? "repeat(auto-fit, minmax(200px, 1fr))" : "repeat(4, 1fr)"
      }
    >
      {data.categorias.map((item: ICategory, index: number) => {
        return (
          <Category
            titulo_imagen={item.titulo_imagen}
            subtitulo_imagen={item.subtitulo_imagen}
            img_fondo={item.img_fondo}
            key={index}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default TypeA;
