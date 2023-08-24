import { useEffect, useState } from "react";
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
import { useStore } from "@/store";
import { IDataNav } from "@/typesSanity/docs/nav";
import { client } from "@/lib/sanity.client";
import React from "react";

const iconArray: any = {
  LiaShoppingBagSolid: LiaShoppingBagSolid,
  CiHeart: CiHeart,
  CiUser: CiUser,
  TfiSearch: TfiSearch,
};

const NavBar = () => {
  const query = `
    *[_type == "settings"]{
      'logo': navbar.logo,
      'links_izquierda': navbar.links_izquierda[]{ ... ,
      'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      },
      'links_derecha': navbar.links_derecha[]{ ... ,
        'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      },
      'links_derecha_mobile': navbar.links_derecha_mobile[]{ ... ,
        'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      }
    }
  `;

  const [data, setData] = useState<IDataNav>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { value } = useStore();

  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [isPhone] = useMediaQuery(`(max-width: 400px)`);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [linksLeft, setLinksLeft] = useState<{ title: string; url?: string }[]>(
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data[0]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.links_izquierda && data.links_izquierda.length > 0) {
      const result = data.links_izquierda.map((item: any) => {
        return { title: item.title };
      });

      setLinksLeft(result);
    }
  }, [data]);

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
      maxW="2560px"
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
              {linksLeft.length > 0 &&
                linksLeft.map((link: { title: string; url?: string }) => (
                  <Box key={link.title} mr={4}>
                    <Text
                      fontSize="14px"
                      fontWeight={400}
                      lineHeight="normal"
                      color={isScrolled ? "black" : "white"}
                      cursor="pointer"
                    >
                      {link.title}
                    </Text>
                  </Box>
                ))}
            </HStack>
          </Box>
        )}
      </Flex>

      {/* Centro */}
      <Flex
        alignItems="center"
        justifyContent="center"
        flex={2}
        mr={isPhone ? "15px" : ""}
      >
        <LogoCI
          color={isMobile || isScrolled ? "black" : "white"}
          width={isMobile ? "190px" : "250px"}
          height={isMobile ? "27px" : "33px"}
        />
      </Flex>

      {/* Lado derecho */}
      {!isMobile && (
        <Flex alignItems="center" flex={1} justifyContent="flex-end">
          {data?.links_derecha &&
            data.links_derecha.length > 0 &&
            data.links_derecha.map((item, index) => (
              <React.Fragment key={index}>
                {iconArray[item.icono]({
                  style: {
                    width: item.icono === "TfiSearch" ? "25px" : "30px",
                    height: item.icono === "TfiSearch" ? "25px" : "30px",
                    cursor: "pointer",
                    color: isScrolled ? "black" : "white",
                  },
                })}
                {index !== data.links_derecha.length - 1 && <Box mx="8px" />}
              </React.Fragment>
            ))}
        </Flex>
      )}

      {/* Lado derecho mobile */}
      {isMobile && (
        <Flex
          alignItems="center"
          flex={1}
          justifyContent="flex-end"
          id="mobile"
        >
          {data?.links_derecha_mobile.map((item, index) => (
            <React.Fragment key={index}>
              {iconArray[item.icono]({
                style: {
                  width: item.icono === "TfiSearch" ? "25px" : "30px",
                  height: item.icono === "TfiSearch" ? "25px" : "30px",
                  cursor: "pointer",
                  color: "black",
                },
              })}
              {index !== data.links_derecha_mobile.length - 1 && (
                <Box mx="3px" />
              )}
            </React.Fragment>
          ))}
        </Flex>
      )}

      {/* Drawer para pantallas móviles */}
      <Drawer
        isOpen={showDrawer}
        placement="left"
        onClose={() => setShowDrawer(false)}
      >
        <DrawerOverlay zIndex={9999999999999}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <LogoCI
                color={isMobile ? "black" : "white"}
                width={isMobile ? "150px" : "250px"}
                height={isMobile ? "20px" : "33px"}
              />
            </DrawerHeader>
            <DrawerBody>
              {linksLeft.length > 0 &&
                linksLeft.map((link: { title: string; url?: string }) => (
                  <Box key={link.title} mb={4}>
                    <Text
                      fontSize="14px"
                      fontWeight={400}
                      lineHeight="normal"
                      color="black"
                    >
                      {link.title}
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
