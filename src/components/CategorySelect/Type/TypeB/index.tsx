import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { Box, Card, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import { ICategory } from "../../Interface";
import { sanityImage } from "@/lib/sanity.image";
import { useEffect, useState } from "react";

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

const TypeB = (props: ContainerProps) => {
  const { data, isMobile } = props;
  const [first, setFirst] = useState<any>([]);
  const [second, setSecond] = useState<any>([]);

  useEffect(() => {
    const originalArray = data.categorias;
    const firstPart = originalArray.slice(0, 4);
    const secondPart = originalArray.slice(4, 6);

    setFirst(firstPart);
    setSecond(secondPart);
  }, []);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
    >
      {/* Primera fila: 4 tarjetas pequeñas */}
      {first.length > 0 && (
        <>
          {first.map((item: any, index: number) => {
            return (
              <GridItem colSpan={1}>
                <Category
                  titulo_imagen={item.titulo_imagen}
                  subtitulo_imagen={item.subtitulo_imagen}
                  img_fondo={item.img_fondo}
                  key={index}
                />
              </GridItem>
            );
          })}
        </>
      )}

      {/* Segunda fila: 2 tarjetas grandes */}
      {second.length > 0 && (
        <>
          {second.map((item: any, index: number) => {
            return (
              <GridItem colSpan={2}>
                <Category
                  titulo_imagen={item.titulo_imagen}
                  subtitulo_imagen={item.subtitulo_imagen}
                  img_fondo={item.img_fondo}
                  key={index}
                />
              </GridItem>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default TypeB;
