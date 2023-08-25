import { sanityImage } from "@/lib/sanity.image";
import { IRecommendedProducts } from "@/typesSanity/docs/recommendedProducts";
import { Box, SimpleGrid, Image, Text } from "@chakra-ui/react";

interface IContainerProps {
  data: IRecommendedProducts;
}

interface IProduct {
  title: string;
  cost: string;
  img: any;
  id: string;
}

const CardProduct = (props: IProduct) => {
  const { title, cost, img, id } = props;

  return (
    <>
      <Image src={sanityImage(img.asset._ref).url()} alt={id} />
      <Box flex={100}>
        <Text pt="10px" fontWeight={500} fontSize="13px">
          {title}
        </Text>
        <Text fontWeight={600} color="#000">
          {cost}
        </Text>
      </Box>
    </>
  );
};

const GridProduct = (props: IContainerProps) => {
  const { data } = props;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      <Box>
        <CardProduct
          title={data.productos[0].titulo_producto}
          cost={data.productos[0].precio_producto}
          img={data.productos[0].imagen_producto}
          id={data._id}
        />
      </Box>
      <Box>
        <CardProduct
          title={data.productos[1].titulo_producto}
          cost={data.productos[1].precio_producto}
          img={data.productos[1].imagen_producto}
          id={data._id}
        />
      </Box>
      <Box>
        <CardProduct
          title={data.productos[2].titulo_producto}
          cost={data.productos[2].precio_producto}
          img={data.productos[2].imagen_producto}
          id={data._id}
        />
      </Box>
    </SimpleGrid>
  );
};

export default GridProduct;
