import ContainerDermo from "@/components/Common/ContainerDermo";
import { sanityImage } from "@/lib/sanity.image";
import { IBasicImage } from "@/typesSanity/docs/basicImage50";
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

interface IProps {
  data: IBasicImage;
  isBlackBg: boolean;
  goLink: (
    item: "link_uno" | "link_dos" | "link_url_uno" | "link_url_dos"
  ) => void;
}

const Banner = (props: IProps) => {
  const { data, isBlackBg, goLink } = props;

  return (
    <GridItem
      bg={data.colorFondo}
      borderBottom={`4px solid ${data.colorFondo}`}
    >
      <ContainerDermo pl="0px">
        <Flex flex={100}>
          <Image src={sanityImage(data.img.asset._ref).url()} alt="image-40" />
        </Flex>
        <Grid templateColumns="repeat(2, 1fr)" mt="40px" gap="30px">
          <GridItem w="full">
            <Text
              textTransform="uppercase"
              color={isBlackBg ? "white" : "black"}
              cursor="pointer"
              onClick={() => goLink("link_url_uno")}
            >
              {data.text_link_uno}
            </Text>
          </GridItem>
          <GridItem w="full">
            <Text
              textTransform="uppercase"
              color={isBlackBg ? "white" : "black"}
              cursor="pointer"
              onClick={() => goLink("link_url_dos")}
            >
              {data.text_link_dos}
            </Text>
          </GridItem>
        </Grid>
      </ContainerDermo>
    </GridItem>
  );
};

export default Banner;
