import {
  Box,
  Button,
  Card,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { LogoArrowRightCI } from "../Icons";
import { useStore } from "@/store";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { sanityImage } from "@/lib/sanity.image";

interface ICategory {
  titulo_imagen: string;
  subtitulo_imagen: string;
  img_fondo: any;
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

interface ContainerProps {
  data: ICategorySelect;
}

const CategorySelect = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box
      mt="75px"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <Box mb="25px">
        <HStack justifyContent="space-between">
          <Text
            textTransform="uppercase"
            fontSize="22px"
            fontWeight="700"
            mb="5px"
          >
            {data?.titulo}
          </Text>
          {isMobile && (
            <>
              <Spacer />
              <Button
                variant="outline"
                borderRadius="35px"
                border="1px solid black"
                width="110px"
                mb="5px"
              >
                <Text textTransform="uppercase" color="black">
                  {data?.text_button}
                </Text>
              </Button>
            </>
          )}
        </HStack>
        <Box flex={100}>
          <Grid templateColumns={isMobile ? "100%" : "70% 30%"} gap={4}>
            <Text textAlign="justify">{data?.descripcion}</Text>
            {!isMobile && (
              <div style={{ justifySelf: "right", marginRight: "15px" }}>
                <Button
                  rightIcon={<LogoArrowRightCI />}
                  variant="outline"
                  borderRadius="35px"
                  border="1px solid black"
                  width="150px"
                >
                  <Text textTransform="uppercase" color="black">
                    {data?.text_button}
                  </Text>
                </Button>
              </div>
            )}
          </Grid>
        </Box>
      </Box>
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
    </Box>
  );
};

export default CategorySelect;
