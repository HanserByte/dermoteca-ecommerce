import { Box, Card, Text, Image, Grid } from "@chakra-ui/react";

import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { ICategory } from "../../Interface";
import { sanityImage } from "@/lib/sanity.image";
import { useEffect, useState } from "react";

interface ContainerProps {
  data: ICategorySelect;
  isMobile: boolean;
}

const Category = (props: ICategory) => {
  const { titulo_imagen, subtitulo_imagen, img_fondo, isMargin } = props;

  return (
    <Card w="100%" cursor="pointer" mb={isMargin ? "12px" : ""}>
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

const TypeD = (props: ContainerProps) => {
  const { data, isMobile } = props;

  const [first, setFirst] = useState<any>([]);
  const [second, setSecond] = useState<any>([]);

  useEffect(() => {
    const originalArray = data.categorias;
    const middleIndex = Math.floor(originalArray.length / 2);
    const array1 = originalArray.slice(0, middleIndex);
    const array2 = originalArray.slice(middleIndex);

    setFirst(array1);
    setSecond(array2);
  }, []);

  return (
    <Grid templateColumns="1fr 1fr" gap={3}>
      {/* Contenido de la primera columna */}
      <Box>
        {first.length > 0 && (
          <>
            {first.map((item: any, index: number) => {
              return (
                <Category
                  titulo_imagen={item.titulo_imagen}
                  subtitulo_imagen={item.subtitulo_imagen}
                  img_fondo={item.img_fondo}
                  key={index}
                  isMargin={true}
                />
              );
            })}
          </>
        )}
      </Box>

      {/* Contenido de la segunda columna */}
      <Box>
        {second.length > 0 && (
          <>
            {second.map((item: any, index: number) => {
              return (
                <Category
                  titulo_imagen={item.titulo_imagen}
                  subtitulo_imagen={item.subtitulo_imagen}
                  img_fondo={item.img_fondo}
                  key={index}
                  isMargin={true}
                />
              );
            })}
          </>
        )}
      </Box>
    </Grid>
  );
};

export default TypeD;
