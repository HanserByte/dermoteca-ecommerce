import {
  Box,
  Card,
  CardBody,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

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
  return (
    <Box mt="75px" pl="145px" pr="145px">
      <SimpleGrid spacing={3} templateColumns="repeat(4, 1fr)">
        {DataCategory.map((item: ICategory) => {
          return <Category title={item.title} url_img={item.url_img} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default CategorySelect;
