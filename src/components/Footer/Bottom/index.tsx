import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Bottom = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box bg="#000" color="white" borderTop="1px solid #000">
      <Flex
        px={4}
        h="86px"
        alignItems="center"
        justifyContent="space-between"
        pt="20px"
        pb="20px"
        width="100%"
      >
        {/* Lado izquierdo */}

        <Flex flex={1} pl="10px" justifyContent="center" mb="20px">
          {!isMobile && (
            <Text fontSize="12px">
              Dermoteca © Todos los derechos reservados
            </Text>
          )}
        </Flex>

        {/* Centro */}
        <Flex alignItems="center" justifyContent="center" flex={2} mb="20px">
          <FaFacebookF
            style={{
              width: "25px",
              height: "25px",
              marginRight: "20px",
              cursor: "pointer",
            }}
          />
          <FaInstagram
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
          <FaTiktok
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
          />
        </Flex>

        {/* Lado derecho */}
        <Flex alignItems="center" flex={1} justifyContent="flex-end"></Flex>
      </Flex>

      {isMobile && (
        <Flex flex={100} pl="10px" justifyContent="center" pb="30px" mt="-25px">
          <Text fontSize="12px">Dermoteca © Todos los derechos reservados</Text>
        </Flex>
      )}
    </Box>
  );
};

export default Bottom;
