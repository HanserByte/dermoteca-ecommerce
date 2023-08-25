import { Box, SimpleGrid, Image, useMediaQuery, Text } from "@chakra-ui/react";
import ContainerDermo from "../Common/ContainerDermo";
import { sanityImage } from "@/lib/sanity.image";
import HeadTitle from "../CategorySelect/HeadTitle";
import { useStore } from "@/store";
import { IRecommendedProducts } from "@/typesSanity/docs/recommendedProducts";

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

const RecommendedProducts = (props: IContainerProps) => {
  const { data } = props;

  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <ContainerDermo>
      <HeadTitle data={data} isMobile={isMobile} />
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
    </ContainerDermo>
  );
};

export default RecommendedProducts;
