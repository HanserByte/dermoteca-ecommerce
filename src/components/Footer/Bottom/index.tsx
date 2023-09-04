import React from "react";

import { useStore } from "@/store";
import { IDataFooter } from "@/typesSanity/docs/footer";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

interface ContainerProps {
  data: IDataFooter;
}

const Bottom = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  const iconArray: any = {
    FaFacebookF: FaFacebookF,
    FaFacebook: FaFacebookF,
    FaInstagram: FaInstagram,
    FaTiktok: FaTiktok,
  };

  return (
    <Box
      bg="#000"
      color="white"
      borderTop="2px solid #000"
      borderBottom="2px solid #000"
    >
      <Flex
        px={4}
        h="86px"
        alignItems="center"
        justifyContent="space-between"
        pt="20px"
        pb="20px"
        width="100%"
        borderTop="1px solid #000"
        borderBottom="2px solid #000"
      >
        {/* Lado izquierdo */}

        <Flex flex={1} pl="10px" justifyContent="center" mb="20px">
          {!isMobile && <Text fontSize="12px">{data?.derechos}</Text>}
        </Flex>

        {/* Centro */}
        <Flex alignItems="center" justifyContent="center" flex={2} mb="20px">
          {data.enlaces &&
            data.enlaces.length > 0 &&
            data.enlaces.map((item, index) => (
              <React.Fragment key={index}>
                {iconArray[item?.icono]({
                  style: {
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    color: "white",
                  },
                })}
                {index !== data.enlaces.length - 1 && <Box mx="10px" />}
              </React.Fragment>
            ))}
        </Flex>

        {/* Lado derecho */}
        <Flex alignItems="center" flex={1} justifyContent="flex-end"></Flex>
      </Flex>

      {isMobile && (
        <Flex flex={100} pl="10px" justifyContent="center" pb="30px" mt="-25px">
          <Text fontSize="12px">{data?.derechos}</Text>
        </Flex>
      )}
    </Box>
  );
};

export default Bottom;
