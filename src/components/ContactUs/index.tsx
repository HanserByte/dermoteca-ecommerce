import { Box, useToast, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { IContacUs } from "@/typesSanity/docs/contactUs";
import { sanityImage } from "@/lib/sanity.image";
import { useStore } from "@/store";

import ContainerDermo from "../Common/ContainerDermo";
import Form from "./Form";

interface IContainerProps {
  data: IContacUs;
}

const ContactUs = (props: IContainerProps) => {
  const { data } = props;
  const toast = useToast();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  const handleSubmit = () => {
    toast({
      title: "Mensaje Enviado.",
      description: "Gracias! Te contactaremos lo antes posible.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <ContainerDermo pt={isMobile ? "95px" : "130px"}>
      <Box display="flex" flexDirection={{ base: "column", lg: "row" }}>
        <Box
          h="50px"
          height="100%"
          justifySelf="center"
          id="image-left"
          width={isMobile ? "100%" : "50%"}
        >
          <Image
            src={sanityImage(data.imagen.asset._ref).url()}
            alt={data._id}
          />
        </Box>
        <Box
          ml={isMobile ? "" : "120px"}
          mt={isMobile ? "20px" : "80px"}
          id="form-content"
          width={isMobile ? "100%" : "50%"}
        >
          <Box flex={100}>
            <Text fontSize="22px" fontWeight="700" mb="5px">
              {data?.titulo_descripcion}
            </Text>
          </Box>
          <Box flex={100} mb="20px">
            <Text color="#000" textAlign="justify">
              {data.description}
            </Text>
          </Box>
          <Form handleSubmit={handleSubmit} isMobile={isMobile} />
        </Box>
      </Box>
    </ContainerDermo>
  );
};

export default ContactUs;
