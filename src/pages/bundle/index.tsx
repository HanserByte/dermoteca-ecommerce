import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import {
  useCartDrawer,
  useNavbar,
  useSessionVariables,
  useStore,
} from "@/store";
import Link from "next/link";
import { useCartActions } from "@/hooks/cart";
import { formatCurrencyMXN, normalizeShopifyAmount } from "@/utils";

interface BundleItem {
  id: string;
  title: string;
  quantity: number;
  variantId?: string;
  descriptionHtml?: string;
  createdAt?: string;
  image?: string;
  price?: number;
}

interface BundleCardData {
  id: string;
  title: string;
  image?: string;
  price?: number;
  currencyCode?: string;
  items: BundleItem[];
}

// Nota: id de cada item debe ser variantId (merchandiseId) para poder agregar al carrito.

const TEST_BUNDLE_ID = "gid://shopify/Product/10167336010040";

// Helpers para normalizar y formatear precios
const normalizeAmount = normalizeShopifyAmount;
const formatCurrency = (amount?: number, currencyCode?: string) =>
  formatCurrencyMXN(amount, currencyCode);

const BundlesListPage = () => {
  const { height } = useNavbar();
  const { value } = useStore();
  const [bundles, setBundles] = useState<BundleCardData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `/api/bundle?id=${encodeURIComponent(TEST_BUNDLE_ID)}`
        );
        const data = await res.json();
        const p = data?.product;
        const image =
          p?.media?.nodes?.[0]?.preview?.image?.url ||
          p?.media?.nodes?.[0]?.image?.url;
        const price = normalizeAmount(
          p?.priceRange?.minVariantPrice?.amount ??
            p?.priceRange?.maxVariantPrice?.amount
        );
        const currencyCode =
          p?.priceRange?.minVariantPrice?.currencyCode ??
          p?.priceRange?.maxVariantPrice?.currencyCode;
        const items: BundleItem[] = (p?.bundleComponents?.nodes || []).map(
          (n: any) => ({
            id: n?.componentProduct?.id,
            variantId: n?.componentProduct?.variants?.nodes?.[0]?.id,
            title: n?.componentProduct?.title,
            quantity: n?.quantity || 1,
            descriptionHtml:
              n?.componentProduct?.descriptionHtml ||
              n?.componentProduct?.bodyHtml,
            createdAt: n?.componentProduct?.createdAt,
            image:
              n?.componentProduct?.media?.nodes?.[0]?.preview?.image?.url ||
              n?.componentProduct?.media?.nodes?.[0]?.preview?.image?.src,
            price: normalizeAmount(
              n?.componentProduct?.priceRange?.minVariantPrice?.amount ??
                n?.componentProduct?.priceRange?.maxVariantPrice?.amount
            ) as number,
          })
        );
        const card: BundleCardData = {
          id: p?.id || TEST_BUNDLE_ID,
          title: p?.title || "Bundle",
          image,
          price: price,
          currencyCode,
          items,
        };
        setBundles([card]); // por ahora sólo 1 de prueba
      } catch (e) {
        console.error("Error loading bundles", e);
      }
    };
    load();
  }, []);
  const { addToCartMutation } = useCartActions();
  const { cartId } = useSessionVariables();
  const { setOpen } = useCartDrawer();
  const toast = useToast();

  const handleAddBundleToCart = (b: BundleCardData) => {
    const lines = b.items.map((it) => ({
      merchandiseId: it.id,
      quantity: it.quantity || 1,
    }));
    // @ts-ignore
    addToCartMutation.mutate({ cartId, lines });
    setOpen(true);
    toast({
      duration: 2000,
      isClosable: true,
      render: () => (
        <Box color="white" bg="#00AA4F" rounded="2xl" p={3} textAlign="center">
          <Text>Bundle agregado al carrito</Text>
        </Box>
      ),
    });
  };

  return (
    <Box maxW="2560px" m="0 auto">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />

      <Box my="6" px={{ base: 5, md: 24 }}>
        <Heading as="h1" size={{ base: "md", md: "lg" }}>
          Bundles
        </Heading>
        <Text color="gray.600" mt={1}>
          Descubre los bundles disponibles.
        </Text>
      </Box>

      <Box my="6" px={{ base: 5, md: 24 }}>
        <Grid
          gap={6}
          templateColumns={{
            base: "1fr",

            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
        >
          {bundles.map((b) => (
            <Box
              key={b.id}
              borderRadius="2xl"
              bg="#F9F6F3"
              boxShadow="0 10px 25px rgba(0,0,0,0.08)"
              border="1px solid #E7D4C7"
              overflow="hidden"
            >
              {b.image && (
                <Box w="100%" overflow="hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </Box>
              )}
              <Box p={5}>
                <Heading as="h3" size="md" color="#2F2F2F">
                  {b.title}
                </Heading>
                {typeof b.price === "number" && (
                  <Text mt={1} fontWeight="bold" color="#2F2F2F">
                    {formatCurrency(b.price, b.currencyCode)}
                  </Text>
                )}

                <Stack spacing={2} mt={4}>
                  {b.items.map((it) => (
                    <Flex
                      key={it.id}
                      justify="space-between"
                      align="center"
                      bg="white"
                      borderRadius="lg"
                      px={4}
                      py={3}
                      border="1px solid #EFE7E2"
                    >
                      <Text fontWeight={500} color="#2F2F2F">
                        {it.title}
                      </Text>
                      <Text color="#8A8A8A">x{it.quantity}</Text>
                    </Flex>
                  ))}
                </Stack>

                <Flex gap={3} mt={5}>
                  {/* Modal detalle */}
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size="xl"
                    motionPreset="slideInBottom"
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Detalle del bundle</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {bundles[0] && (
                          <Box>
                            <Heading as="h3" size="md" mb={2}>
                              {bundles[0].title}
                            </Heading>
                            {typeof bundles[0].price === "number" && (
                              <Text fontWeight="bold" mb={4}>
                                {formatCurrency(
                                  bundles[0].price,
                                  bundles[0].currencyCode
                                )}
                              </Text>
                            )}
                            <Stack spacing={4}>
                              {bundles[0].items.map((it) => (
                                <Box
                                  key={it.id}
                                  border="1px solid #EFE7E2"
                                  p={3}
                                  rounded="md"
                                >
                                  <Flex gap={3} align="flex-start">
                                    {it.image && (
                                      <Box
                                        w="72px"
                                        h="72px"
                                        overflow="hidden"
                                        flexShrink={0}
                                      >
                                        <img
                                          src={it.image}
                                          alt={it.title}
                                          style={{ width: "100%" }}
                                        />
                                      </Box>
                                    )}
                                    <Box flex="1">
                                      <Flex
                                        justify="space-between"
                                        align="center"
                                      >
                                        <Text fontWeight={600}>{it.title}</Text>
                                        <Text color="#8A8A8A">
                                          x{it.quantity}
                                        </Text>
                                      </Flex>
                                      {typeof it.price === "number" && (
                                        <Text
                                          color="#2F2F2F"
                                          fontWeight={500}
                                          mt={1}
                                        >
                                          {formatCurrency(it.price, "MXN")}
                                        </Text>
                                      )}
                                      {it.descriptionHtml && (
                                        <Box
                                          mt={2}
                                          color="#4a4a4a"
                                          fontSize="sm"
                                          dangerouslySetInnerHTML={{
                                            __html: it.descriptionHtml,
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </Flex>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <Button
                    bg="#00AA4F"
                    _hover={{ bg: "#009344" }}
                    color="white"
                    borderRadius="full"
                    onClick={() => handleAddBundleToCart(b)}
                  >
                    Agregar al carrito
                  </Button>
                  <Button variant="ghost" borderRadius="full" onClick={onOpen}>
                    Ver detalle
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default BundlesListPage;
