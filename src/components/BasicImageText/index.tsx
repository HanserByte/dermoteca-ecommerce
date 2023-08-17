import { useStore } from "@/store";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

const BasicImageText = () => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box position="relative" width="100%" mt="75px">
      <Image
        src={
          isMobile ? "/img/basicImageMobile.png" : "/img/lineaproductos2.png"
        }
        alt="Image text"
        width="100%"
        height={isMobile ? "550px" : ""}
        objectFit="cover"
      />
      <Box
        position="absolute"
        top="0"
        left={isMobile ? "5px" : "0"}
        width={isMobile ? "100%" : "50%"}
        maxHeight={isMobile ? "100%" : "50vh"}
        overflow="auto"
        p="4"
        pl={isMobile ? "" : "145px"}
        pr={isMobile ? "20px" : "95px"}
      >
        <Heading
          fontFamily="KobeBold"
          color="white"
          fontSize="60px"
          pt={isMobile ? "20px" : "60px"}
        >
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
