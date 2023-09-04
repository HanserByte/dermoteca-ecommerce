import { sanityImage } from "@/lib/sanity.image";
import { useStore } from "@/store";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import ContainerDermo from "../Common/ContainerDermo";
import { IBasicImage } from "@/typesSanity/docs/basicImage50";
import { useRouter } from "next/router";

interface ContainerProps {
  data: IBasicImage;
}

const BasicImageText50 = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const isBlackBg = data.colorFondo === "#000";
  const router = useRouter();

  const goLink = (
    type: "link_uno" | "link_dos" | "link_url_uno" | "link_url_dos"
  ) => {
    if (data[type]) {
      const url = data[type].dataUrl.url;
      router.push(`/${url}`);
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      mt={data.isPaddingTop ? "37px" : ""}
      mb={data.isPaddingBottom ? "37px" : ""}
    >
      <Grid templateColumns={isMobile ? "1fr" : "60% 40%"}>
        <GridItem
          bg={data.colorFondo}
          borderBottom={`1px solid ${data.colorFondo}`}
        >
          <ContainerDermo>
            <Flex flex={100}>
              <Text
                textTransform="uppercase"
                fontSize="22px"
                fontWeight="700"
                mb="5px"
                color={isBlackBg ? "white" : "black"}
              >
                {data.titulo}
              </Text>
            </Flex>
            <Flex flex={100}>
              <Text textAlign="justify" color={isBlackBg ? "white" : "black"}>
                {data.texto}
              </Text>
            </Flex>
            <Flex
              flex={100}
              mt="30px"
              mb="75px"
              justifyContent={isMobile ? "center" : ""}
            >
              <Button
                variant="outline"
                borderRadius="35px"
                mb="5px"
                border={`1px solid ${isBlackBg ? "white" : "black"}`}
                onClick={() => goLink("link_uno")}
              >
                <Text
                  textTransform="uppercase"
                  color={isBlackBg ? "white" : "black"}
                  noOfLines={1}
                  fontSize={isMobile ? "16px" : ""}
                >
                  {data.text_button_uno}
                </Text>
              </Button>
              <Button
                bg={isBlackBg ? "white" : "black"}
                borderRadius="35px"
                mb="5px"
                onClick={() => goLink("link_dos")}
              >
                <Text
                  textTransform="uppercase"
                  color={isBlackBg ? "black" : "white"}
                  noOfLines={1}
                  fontSize={isMobile ? "16px" : ""}
                >
                  {data.text_button_dos}
                </Text>
              </Button>
            </Flex>
          </ContainerDermo>
        </GridItem>
        <GridItem
          bg={data.colorFondo}
          borderBottom={`3px solid ${data.colorFondo}`}
        >
          <ContainerDermo pl="0px">
            <Flex flex={100}>
              <Image
                src={sanityImage(data.img.asset._ref).url()}
                alt="image-40"
              />
            </Flex>
            <Grid templateColumns="50% 50%" mt="40px" gap="30px">
              <GridItem>
                <Text
                  textTransform="uppercase"
                  color={isBlackBg ? "white" : "black"}
                  cursor="pointer"
                  onClick={() => goLink("link_url_uno")}
                >
                  {data.text_link_uno}
                </Text>
              </GridItem>
              <GridItem>
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
      </Grid>
    </Box>
  );
};

export default BasicImageText50;
