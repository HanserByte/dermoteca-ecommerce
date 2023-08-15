import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
} from "@chakra-ui/react";

import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart, CiUser } from "react-icons/ci";
import { TfiSearch } from "react-icons/tfi";
import { LogoCI, LogoHamburguerCI } from "../Icons";

interface Props {
  children: React.ReactNode;
}

const Links = ["FARMACIA", "TRATAMIENTOS", "ACERCA DE"];

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Flex
      px={4}
      h="86px"
      bg={isMobile ? "#fff" : ""}
      alignItems="center"
      justifyContent="space-between"
      pt="20px"
      pb="20px"
      position="fixed"
      width="100%"
      zIndex={9999999}
    >
      {/* Lado izquierdo */}
      <Flex flex={1} pl={isMobile ? "" : "10px"}>
        {isMobile ? (
          <IconButton
            aria-label="Open Menu"
            icon={<LogoHamburguerCI />}
            onClick={() => setShowDrawer(true)}
            colorScheme="black"
          />
        ) : (
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
        )}
      </Flex>

      {/* Centro */}
      <Flex alignItems="center" justifyContent="center" flex={2}>
        <LogoCI
          color={isMobile ? "black" : "white"}
          width={isMobile ? "190px" : "250px"}
          height={isMobile ? "27px" : "33px"}
        />
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
            display: isMobile ? "none" : "",
          }}
        />
        <CiUser
          style={{
            width: "30px",
            height: "30px",
            marginRight: "12px",
            cursor: "pointer",
            color: "white",
            display: isMobile ? "none" : "",
          }}
        />
        <TfiSearch
          style={{
            width: "25px",
            height: "25px",
            marginRight: "12px",
            cursor: "pointer",
            color: isMobile ? "black" : "white",
          }}
        />
        <LiaShoppingBagSolid
          style={{
            width: "30px",
            height: "30px",
            marginRight: isMobile ? "" : "12px",
            cursor: "pointer",
            color: isMobile ? "black" : "white",
            strokeWidth: "-2",
          }}
        />
      </Flex>

      {/* Drawer para pantallas móviles */}
      <Drawer
        isOpen={showDrawer}
        placement="left"
        onClose={() => setShowDrawer(false)}
      >
        <DrawerOverlay zIndex={9999999999999}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              {Links.map((link) => (
                <Box key={link} mb={4}>
                  <Text
                    fontSize="14px"
                    fontWeight={400}
                    lineHeight="normal"
                    color="black"
                  >
                    {link}
                  </Text>
                </Box>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
