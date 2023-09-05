import {
  Box,
  SimpleGrid,
  useMediaQuery,
  Image,
  Card,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import HeadTitle from "../CategorySelect/HeadTitle";
import ContainerDermo from "../Common/ContainerDermo";

import { useStore } from "@/store";
import { sanityImage } from "@/lib/sanity.image";

import { ITips, ITipsMenu } from "@/typesSanity/docs/tipsCards";

interface IContainerProps {
  data: ITipsMenu;
  isList?: boolean;
}

const Category = (props: any) => {
  const { titulo, fecha, img_fondo, isMobile } = props;

  return (
    <Card w="100%" cursor="pointer" height={isMobile ? "150px" : "auto"}>
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
        height="100%"
        objectFit="cover"
      />
    </Card>
  );
};

const TipsCards = (props: IContainerProps) => {
  const { data, isList } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  console.log(data, "data")
  console.log(isList, "list")

  const renderTips = () => {
    const result = data.tips.map((item: ITips, index: number) => {
      return (
        <Box key={index}>
          <Category
            titulo={item.titulo}
            fecha={item.fecha_tip}
            img_fondo={item.imagen_tip}
            isMobile={isMobile}
          />
        </Box>
      );
    });

    return result;
  };

  return (
    <ContainerDermo
      pt={data.isPaddingTop ? "37px" : "0px"}
      pb={data.isPaddingBottom ? "37px" : "0px"}
    >
      {!isList && <HeadTitle data={data} isMobile={isMobile} />}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {renderTips()}
      </SimpleGrid>
    </ContainerDermo>
  );
};

export default TipsCards;
