import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

interface IProps {
  handleSubmit: () => void;
  isMobile: boolean;
}

const Form = (props: IProps) => {
  const { handleSubmit, isMobile } = props;

  return (
    <Box flex={100}>
      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
        {/* Primera fila */}
        <Box
          gridColumn={isMobile ? "span 2" : "span 1"}
          mb={isMobile ? "12px" : ""}
        >
          <FormControl>
            <Input
              placeholder="Nombre"
              border="1px solid #000"
              borderRadius="35px"
            />
          </FormControl>
        </Box>
        <Box gridColumn={isMobile ? "span 2" : "span 1"} mb="12px">
          <FormControl>
            <Input
              placeholder="Apellido"
              border="1px solid #000"
              borderRadius="35px"
            />
          </FormControl>
        </Box>

        {/* Segunda fila */}
        <Box
          gridColumn={isMobile ? "span 2" : "span 1"}
          mb={isMobile ? "12px" : ""}
        >
          <FormControl>
            <Input
              type="email"
              placeholder="Correo"
              border="1px solid #000"
              borderRadius="35px"
            />
          </FormControl>
        </Box>
        <Box gridColumn={isMobile ? "span 2" : "span 1"} mb="12px">
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
        <Box
          gridColumn="span 2"
          justifySelf="right"
          width={isMobile ? "100%" : ""}
        >
          <Button
            bg="#000"
            borderRadius="35px"
            border="1px solid black"
            mb="5px"
            w={isMobile ? "100%" : ""}
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
  );
};

export default Form;
