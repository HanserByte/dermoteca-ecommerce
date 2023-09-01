import ContainerDermo from "@/components/Common/ContainerDermo";
import { IBasicImage } from "@/typesSanity/docs/basicImage60";
import { Flex, Text, Button } from "@chakra-ui/react";

interface ContainerProps {
  data: IBasicImage;
}

const ComponentText = (props: ContainerProps) => {
  const { data } = props;
  return (
    <ContainerDermo>
      <Flex flex={100}>
        <Text
          textTransform="uppercase"
          fontSize="22px"
          fontWeight="700"
          mb="5px"
        >
          {data.titulo}
        </Text>
      </Flex>
      <Flex flex={100}>
        <Text textAlign="justify">{data.texto}</Text>
      </Flex>
      <Flex flex={100} mt="30px" mb="75px">
        {data.text_button_uno && (
          <Button
            variant="outline"
            borderRadius="35px"
            mb="5px"
            border="1px solid #000"
          >
            <Text textTransform="uppercase" noOfLines={1}>
              {data.text_button_uno}
            </Text>
          </Button>
        )}
        {data.text_button_dos && (
          <Button borderRadius="35px" mb="5px" bg="#00AA4F">
            <Text textTransform="uppercase" noOfLines={1} color="white">
              {data.text_button_dos}
            </Text>
          </Button>
        )}
      </Flex>
    </ContainerDermo>
  );
};

export default ComponentText;
