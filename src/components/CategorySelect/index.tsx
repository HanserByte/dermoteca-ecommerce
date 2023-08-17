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

interface ICategory {
  title: string;
  url_img: string;
}

const DataCategory = [
  { title: "CREMAS", url_img: "/img/category1.png" },
  { title: "SUEROS", url_img: "/img/category2.png" },
  { title: "HIGIENE", url_img: "/img/category3.png" },
  { title: "PROTECCIÓN SOLAR", url_img: "/img/category4.png" },
];

const Category = (props: ICategory) => {
  const { title, url_img } = props;

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
            {title}
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
            Comprar ahora
          </Text>
        </Box>
      </Box>
      <Image src={url_img} alt="category select" />
    </Card>
  );
};

const CategorySelect = () => {
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
            nuestros productos
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
                  Ver más
                </Text>
              </Button>
            </>
          )}
        </HStack>
        <Box flex={100}>
          <Grid templateColumns={isMobile ? "100%" : "70% 30%"} gap={4}>
            <Text textAlign="justify">
              Explora nuestra farmacia dermatológica, encontrarás una amplia
              gama de productos de calidad, contamos con los productos más
              avanzados y recomendados por expertos.
            </Text>
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
                    Ver más
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
        {DataCategory.map((item: ICategory, index: number) => {
          return <Category title={item.title} url_img={item.url_img} key={index}/>;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default CategorySelect;
