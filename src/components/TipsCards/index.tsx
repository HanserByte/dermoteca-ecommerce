import {
  Box,
  SimpleGrid,
  useMediaQuery,
  Image,
  Card,
  Text,
} from "@chakra-ui/react";
import HeadTitle from "../CategorySelect/HeadTitle";
import ContainerDermo from "../Common/ContainerDermo";
import { useStore } from "@/store";
import { sanityImage } from "@/lib/sanity.image";

import dayjs from "dayjs";

interface IContainerProps {
  data: any;
}

const Category = (props: any) => {
  const { titulo, fecha, img_fondo } = props;

  return (
    <Card w="100%" cursor="pointer">
      <Box position="absolute" bottom="0" left="0" width="100%" p="4" mb="0px">
        <Box flex={100}>
          <Text
            fontSize="13px"
            fontWeight={500}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl="10px"
            pt="20px"
            pb="4px"
          >
            {dayjs(fecha).format("MMMM D, YYYY")}
          </Text>
        </Box>
        <Box flex={100}>
          <Text
            fontSize="14px"
            fontWeight={400}
            lineHeight="normal"
            color="white"
            cursor="pointer"
            pl="10px"
            pb="4px"
          >
            {titulo}
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

const TipsCards = (props: IContainerProps) => {
  const { data } = props;

  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  
  return (
    <ContainerDermo>
      <HeadTitle data={data} isMobile={isMobile} />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Box>
          <Category
            titulo={data.tips[0].titulo_tip}
            fecha={data.tips[0].fecha_tip}
            img_fondo={data.tips[0].imagen_tip}
          />
        </Box>
        <Box>
          <Category
            titulo={data.tips[1].titulo_tip}
            fecha={data.tips[1].fecha_tip}
            img_fondo={data.tips[1].imagen_tip}
          />
        </Box>
        <Box>
          <Category
            titulo={data.tips[2].titulo_tip}
            fecha={data.tips[2].fecha_tip}
            img_fondo={data.tips[2].imagen_tip}
          />
        </Box>
      </SimpleGrid>
    </ContainerDermo>
  );
};

export default TipsCards;
