import ContainerDermo from "@/components/Common/ContainerDermo";
import { IBasicImage } from "@/typesSanity/docs/basicImage50";
import { Button, Flex, GridItem, Text } from "@chakra-ui/react";

interface Props {
  isBlackBg: boolean;
  isMobile: boolean;
  data: IBasicImage;
  goLink: (
    item: "link_uno" | "link_dos" | "link_url_uno" | "link_url_dos"
  ) => void;
}

const Description = (props: Props) => {
  const { isBlackBg, data, isMobile, goLink } = props;

  return (
    <GridItem
      bg={data.colorFondo}
      borderBottom={`5px solid ${data.colorFondo}`}
    >
      <ContainerDermo pt={isMobile ? "20px" : "75px" }>
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
          mb={isMobile ? "20px" : "75px"}
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
  );
};

export default Description;
