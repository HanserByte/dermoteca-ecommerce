import {
  Box,
  Button,
  FormControl,
  useToast,
  Grid,
  Image,
  Input,
  Text,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import ContainerDermo from "../Common/ContainerDermo";
import { IContacUs } from "@/typesSanity/docs/contactUs";
import { sanityImage } from "@/lib/sanity.image";
import { useStore } from "@/store";

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
    <ContainerDermo>
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
          <Box flex={100}>
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              {/* Primera fila */}
              <Box gridColumn="span 1">
                <FormControl>
                  <Input
                    placeholder="Nombre"
                    border="1px solid #000"
                    borderRadius="35px"
                  />
                </FormControl>
              </Box>
              <Box gridColumn="span 1" mb="12px">
                <FormControl>
                  <Input
                    placeholder="Apellido"
                    border="1px solid #000"
                    borderRadius="35px"
                  />
                </FormControl>
              </Box>

              {/* Segunda fila */}
              <Box gridColumn="span 1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Correo"
                    border="1px solid #000"
                    borderRadius="35px"
                  />
                </FormControl>
              </Box>
              <Box gridColumn="span 1" mb="12px">
                <FormControl>
                  <Input
                    placeholder="Teléfono"
                    border="1px solid #000"
                    borderRadius="35px"
                  />
                </FormControl>
              </Box>

              {/* Tercer fila */}
              <Box gridColumn="span 2" mb="12px">
                <FormControl>
                  <Textarea
                    placeholder="Mensaje"
                    border="1px solid #000"
                    borderRadius="35px"
                  />
                </FormControl>
              </Box>

              {/* Cuarta fila */}
              <Box gridColumn="span 1"></Box>
              <Box gridColumn="span 1" justifySelf="right">
                <Button
                  bg="#000"
                  borderRadius="35px"
                  border="1px solid black"
                  mb="5px"
                  onClick={handleSubmit}
                >
                  <Text
                    textTransform="uppercase"
                    color="white"
                    fontWeight={400}
                    fontSize="13px"
                    ml="25px"
                    mr="25px"
                  >
                    Enviar
                  </Text>
                </Button>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ContainerDermo>
  );
};

export default ContactUs;
