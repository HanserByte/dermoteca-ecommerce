import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

const BasicImageText = () => {
  return (
    <Box position="relative" width="100%" mt="75px">
      <Image src="/img/lineaproductos2.png" alt="Image text" width="100%" />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="50%"
        maxHeight="50vh"
        overflow="auto"
        p="4"
        pl="145px"
        pr="95px"
      >
        <Heading fontFamily="KobeBold" color="white" fontSize="60px" pt="60px">
          ANTI-AGE
        </Heading>
        <Text color="white" lineHeight="normal" textAlign="justify">
          Kit especializado para el cuidado, diseñado para combatir los signos
          del envejecimiento y devolverle a tu piel su vitalidad juvenil. Con
          una poderosa combinación de productos avanzados, este kit te ayudará a
          reducir arrugas, líneas de expresión y a mejorar la firmeza y
          elasticidad de tu piel.
        </Text>
        <Box flex={100} pt="30px">
          <Button
            bg="#00AA4F"
            border="1px solid #00AA4F"
            borderRadius="35px"
            width="200px"
          >
            <Text textTransform="uppercase" color="white" fontSize="14px">
              comprar colección
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicImageText;
