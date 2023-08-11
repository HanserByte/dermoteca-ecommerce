import {
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart, CiUser } from "react-icons/ci";
import { TfiSearch } from "react-icons/tfi";
import { LogoCI } from "../Icons";

interface Props {
  children: React.ReactNode;
}

const Links = ["FARMACIA", "TRATAMIENTOS", "ACERCA DE"];

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      px={4}
      h="86px"
      alignItems="center"
      justifyContent="space-between"
      pt="20px"
      pb="20px"
      position="fixed"
      width="100%"
      zIndex={9999999}
    >
      {/* Lado izquierdo */}
      <Flex flex={1} pl="10px">
        <Box>
          <HStack>
            {Links.map((link) => (
              <Box key={link} mr={4}>
                <Text
                  fontSize="14px"
                  fontWeight={400}
                  lineHeight="normal"
                  color="white"
                  cursor="pointer"
                >
                  {link}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </Flex>

      {/* Centro */}
      <Flex alignItems="center" justifyContent="center" flex={2}>
        <LogoCI />
      </Flex>

      {/* Lado derecho */}
      <Flex alignItems="center" flex={1} justifyContent="flex-end">
        <CiHeart
          style={{
            width: "30px",
            height: "30px",
            marginRight: "12px",
            cursor: "pointer",
            color: "white",
          }}
        />
        <CiUser
          style={{
            width: "30px",
            height: "30px",
            marginRight: "12px",
            cursor: "pointer",
            color: "white",
          }}
        />

        <TfiSearch
          style={{
            width: "25px",
            height: "25px",
            marginRight: "12px",
            cursor: "pointer",
            color: "white",
          }}
        />
        <LiaShoppingBagSolid
          style={{
            width: "30px",
            height: "30px",
            marginRight: "12px",
            cursor: "pointer",
            color: "white",
            strokeWidth: "-2",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
