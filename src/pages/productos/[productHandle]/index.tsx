import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useCartDrawer, useNavbar, useSessionVariables } from "@/store";
import ReviewStars from "@/components/ReviewStars";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { useCartActions } from "@/hooks/cart";
import {
  useProductRecommendations,
  useSanityProduct,
  useShopifyProduct,
} from "@/hooks/products";
import ProductRecommendations from "@/components/ProductRecommendations";
import ProductAccordion from "@/components/ProductAccordion";
import BreadCrumbs from "@/components/BreadCrumbs";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import { useMobileView } from "@/hooks/responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import { useQueryClient } from "@tanstack/react-query";
import {
  useUpdateProductWishlistMutation,
  useCustomer,
  useCustomerAccessTokenCreate,
  useUserWishlist,
} from "@/hooks/account";
import { COLORS } from "@/utils/constants";
import Link from "next/link";
import Loading from "@/components/Loading";
import ComponentRenderer from "@/components/ComponentRenderer";

// Extend Window interface to include Shopify property
declare global {
  interface Window {
    Shopify: {
      store: string;
    };
  }
}

const ProductPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // @ts-ignore
  const shopifyProductData = useShopifyProduct(router.query.productHandle);
  const sanityProductData = useSanityProduct(
    router?.query?.productHandle as string
  );
  const { addToCartMutation } = useCartActions();
  const productRecommendationsData = useProductRecommendations(
    sanityProductData?.data?.store?.gid
  );
  const { setOpen } = useCartDrawer();
  const { height } = useNavbar();
  const [quantity, setQuantity] = useState(1);
  const { isMobile } = useMobileView();
  const { cartId } = useSessionVariables();
  const customerAccessTokenMutation = useCustomerAccessTokenCreate();
  const accessToken =
    customerAccessTokenMutation?.data?.customerAccessToken?.accessToken;
  const customerData = useCustomer(accessToken);
  const [wishlistProducts, setWishlistProducts] = useState(
    customerData?.data?.customer?.wishlistIds?.value
  );
  const productWishlistData = useUserWishlist(wishlistProducts);
  const updateProductWishlistMutation = useUpdateProductWishlistMutation();

  // Fix: Only consider wishlist as loading if we actually have wishlist products to load
  const isWishlistLoading = wishlistProducts
    ? productWishlistData?.isLoading
    : false;

  const isWishlisted = productWishlistData?.data?.nodes?.some(
    (product: any) => product.handle === router.query.productHandle
  );

  const hasMultipleImages =
    shopifyProductData?.data?.product?.images?.nodes.length > 1;
  const hasAccordions = sanityProductData?.data?.productAccordions?.length > 0;
  const hasOptions =
    shopifyProductData?.data?.product?.variants?.nodes?.length > 1;

  const handleAddToCart = async () => {
    // Validate inventory before adding to cart
    if (quantity > availableInventory) {
      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            color="white"
            bg="red.500"
            rounded="2xl"
            p={3}
            textAlign="center"
          >
            <Text>
              Solo hay {availableInventory} unidades disponibles de este
              producto.
            </Text>
          </Box>
        ),
      });
      setQuantity(availableInventory);
      return;
    }

    // @ts-ignore
    const queryVariant = decodeURIComponent(router.query.variant);
    const variantId = shopifyProductData?.data?.product?.variants?.nodes?.find(
      (variant: any) => variant.title === queryVariant
    );

    const productId =
      variantId?.id || sanityProductData?.data?.store?.variants[0]?.store?.gid;

    // @ts-ignore
    addToCartMutation.mutate({
      cartId,
      lines: [{ merchandiseId: productId, quantity }],
    });
    setOpen(true);
  };

  const isOutOfStock = shopifyProductData?.data?.product?.totalInventory === 0;

  // Get available inventory for the current variant
  const getCurrentVariantInventory = () => {
    const queryVariant = router.query.variant
      ? decodeURIComponent(router.query.variant as string)
      : null;

    if (queryVariant && shopifyProductData?.data?.product?.variants?.nodes) {
      const selectedVariant =
        shopifyProductData.data.product.variants.nodes.find(
          (variant: any) => variant.title === queryVariant
        );
      return selectedVariant?.quantityAvailable || 0;
    }

    // If no variant selected, use the first variant or total inventory
    const firstVariant =
      shopifyProductData?.data?.product?.variants?.nodes?.[0];
    return (
      firstVariant?.quantityAvailable ||
      shopifyProductData?.data?.product?.totalInventory ||
      0
    );
  };

  const availableInventory = getCurrentVariantInventory();

  const handleWishlistItem = () => {
    if (!customerData?.data) {
      toast({
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box
            color="white"
            bg={COLORS.GREEN}
            rounded="2xl"
            p={3}
            textAlign="center"
          >
            <Text
              as={Link}
              fontWeight={500}
              textDecor="underline"
              display="inline"
              href="/cuenta/iniciar-sesion"
            >
              Inicia sesion
            </Text>{" "}
            <Text display="inline">
              para agregar este producto a tu lista de favoritos.
            </Text>
          </Box>
        ),
      });

      return;
    }
    const { id, wishlistIds } = customerData?.data?.customer;
    const initialFieldData = wishlistIds?.value
      ? wishlistIds?.value + "-,-"
      : "";

    updateProductWishlistMutation.mutate(
      // @ts-ignore
      {
        id,
        metafield: {
          id: wishlistIds?.id,
          value:
            initialFieldData +
            shopifyProductData?.data?.product?.title?.toLowerCase(),
        },
        shopifyProductData: shopifyProductData?.data?.product,
      },
      {
        onSuccess: () => {
          queryClient.resetQueries(["customer"]);
        },
      }
    );
  };

  const handleRemoveWishlistItem = () => {
    const { id, wishlistIds } = customerData?.data?.customer;
    const wishlistArray = wishlistIds?.value?.split("-,-");
    const filteredArray = wishlistArray?.filter(
      (product: any) =>
        product !== shopifyProductData?.data?.product?.title.toLowerCase()
    );
    const wishlistData = filteredArray?.join("-,-");

    updateProductWishlistMutation.mutate(
      // @ts-ignore
      {
        id,
        metafield: {
          id: wishlistIds?.id,
          value: wishlistData,
        },
        shopifyProductData: shopifyProductData?.data?.product,
        action: "remove",
      },
      {
        onSuccess: () => {
          queryClient.resetQueries(["customer"]);
        },
      }
    );
  };

  const handleShareProduct = async () => {
    try {
      const currentUrl = window.location.href;

      // Copiar al portapapeles tanto en móvil como en desktop
      await navigator.clipboard.writeText(currentUrl);
      toast({
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box
            color="white"
            bg={COLORS.GREEN}
            rounded="2xl"
            p={3}
            textAlign="center"
          >
            <Text>¡Link copiado al portapapeles!</Text>
          </Box>
        ),
      });
    } catch (error) {
      // Fallback si falla la copia al portapapeles
      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            color="white"
            bg="red.500"
            rounded="2xl"
            p={3}
            textAlign="center"
          >
            <Text>No se pudo copiar el link. Intenta de nuevo.</Text>
          </Box>
        ),
      });
    }
  };

  useEffect(() => {
    setWishlistProducts(customerData?.data?.customer?.wishlistIds?.value);
  }, [customerData?.data?.customer?.wishlistIds?.value]);

  useEffect(() => {
    if (addToCartMutation?.isLoading) return;
    queryClient.refetchQueries(["cart", cartId]);
  }, [addToCartMutation?.isLoading]);

  useEffect(() => {
    setQuantity(1);
    setThumbsSwiper(null);
  }, [router.query.productHandle]);

  // Reset quantity when variant changes to ensure it doesn't exceed new variant's inventory
  useEffect(() => {
    if (quantity > availableInventory && availableInventory > 0) {
      setQuantity(availableInventory);
    }
  }, [router.query.variant, availableInventory]);

  if (typeof window !== "undefined") {
    window.Shopify = {
      store: "6a8516-2.myshopify.com",
    };
  }

  return (
    <Box maxW="2560px" m="0 auto">
      {/* Other meta tags */}

      <NavBar dataN={{ isBlackNavBar: true }} />

      <Box h={`${height}px`} bg="white" w="100%" />
      {shopifyProductData?.isLoading && sanityProductData.isLoading && (
        <Loading />
      )}

      <Flex
        alignItems="center"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
        py="2"
        h="max-content"
        bg="#E7D4C7"
        w="100%"
      >
        <BreadCrumbs
          pageTitle={sanityProductData?.data?.store?.title}
          pageCategory={
            shopifyProductData?.data?.product?.collections?.nodes[0]
          }
          mainPage="colecciones"
        />
      </Flex>

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Flex gap={6} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "100%" : "50%"}>
            {!hasMultipleImages && (
              <img
                style={{ position: "sticky", top: `${height}px` }}
                src={sanityProductData?.data?.store?.previewImageUrl}
                alt={sanityProductData?.data?.store?.title}
              />
            )}

            {hasMultipleImages && (
              <Box position="sticky" top={`${height}px`}>
                <Swiper
                  className="mySwiper2"
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                  {shopifyProductData?.data?.product?.images?.nodes.map(
                    (image: any, idx: any) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={image.url}
                          alt={sanityProductData?.data?.store?.title}
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>

                <Box mt={2}>
                  <Swiper
                    spaceBetween={8}
                    modules={[Thumbs]}
                    slidesPerView={5}
                    watchSlidesProgress
                    freeMode={true}
                    className="mySwiper"
                    onSwiper={setThumbsSwiper as any}
                  >
                    {shopifyProductData?.data?.product?.images?.nodes.map(
                      (image: any, idx: any) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={image.url}
                            alt={sanityProductData?.data?.store?.title}
                          />
                        </SwiperSlide>
                      )
                    )}
                  </Swiper>
                </Box>
              </Box>
            )}
          </Box>
          <Flex w={isMobile ? "100%" : "50%"} gap={3} direction="column">
            <Text
              as="h1"
              margin={0}
              fontSize={isMobile ? "xl" : "2xl"}
              fontWeight={700}
            >
              {sanityProductData?.data?.store?.title}
            </Text>
            <Text fontSize="xl" fontWeight="500">
              ${sanityProductData?.data?.store?.variants[0]?.store?.price}
            </Text>

            {/* <ReviewStars rating={4} /> */}

            <Text
              fontSize={isMobile ? "md" : "lg"}
              fontWeight="400"
              dangerouslySetInnerHTML={{
                __html: sanityProductData?.data?.store?.descriptionHtml,
              }}
              style={{ listStylePosition: "inside" }}
            />

            {/* Variant options */}
            <Box w="full">
              {hasOptions && (
                <ProductVariantSelector
                  variants={shopifyProductData?.data?.product?.variants?.nodes}
                />
              )}
            </Box>

            {/* Stock availability indicator */}
            {!isOutOfStock && availableInventory <= 5 && (
              <Text fontSize="sm" color="orange.500" fontWeight="500">
                ¡Solo quedan {availableInventory} unidades disponibles!
              </Text>
            )}

            <Flex
              gap={isMobile ? 1 : 8}
              justifyContent={isMobile ? "space-between" : "flex-start"}
              alignItems="center"
            >
              {!isOutOfStock && (
                <Flex alignItems="center" gap={3}>
                  <Button
                    disabled={isWishlistLoading || quantity <= 1}
                    onClick={() =>
                      setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)
                    }
                    bg="#00AA4F"
                    size="sm"
                    color="white"
                    rounded="full"
                    _hover={{ opacity: 0.8 }}
                    opacity={quantity <= 1 ? 0.5 : 1}
                  >
                    -
                  </Button>
                  <Text fontSize="xl" fontWeight="500">
                    {quantity}
                  </Text>
                  <Button
                    disabled={
                      isWishlistLoading || quantity >= availableInventory
                    }
                    onClick={() => setQuantity(quantity + 1)}
                    bg="#00AA4F"
                    size="sm"
                    color="white"
                    rounded="full"
                    _hover={{ opacity: 0.8 }}
                    opacity={quantity >= availableInventory ? 0.5 : 1}
                  >
                    +
                  </Button>
                </Flex>
              )}

              {!isOutOfStock && (
                <Button
                  onClick={handleAddToCart}
                  bg="#00AA4F"
                  color="white"
                  rounded="full"
                  _hover={{ opacity: 0.8 }}
                >
                  AGREGAR AL CARRITO
                </Button>
              )}

              {isOutOfStock && (
                <Box
                  py={3}
                  px={5}
                  bg="transparent"
                  color={COLORS.GREEN}
                  border="2px"
                  borderColor={COLORS.GREEN}
                  rounded="full"
                  fontWeight={600}
                >
                  Out of stock
                </Box>
              )}

              <Button
                onClick={handleShareProduct}
                p={0}
                bg="transparent"
                color="grey"
                _hover={{ color: COLORS.GREEN }}
                title="Compartir producto"
              >
                <IoShareOutline size={40} />
              </Button>

              {!isWishlisted && (
                <Button
                  onClick={handleWishlistItem}
                  p={0}
                  bg="transparent"
                  color="grey"
                  _hover={{ color: COLORS.GREEN }}
                >
                  <AiOutlineHeart size={40} />
                </Button>
              )}
              {isWishlisted && (
                <Button
                  onClick={handleRemoveWishlistItem}
                  p={0}
                  bg="transparent"
                  color={COLORS.GREEN}
                  _hover={{ opacity: 0.8 }}
                >
                  <AiFillHeart size={40} />
                </Button>
              )}
            </Flex>

            {hasAccordions && (
              <ProductAccordion
                accordions={sanityProductData?.data?.productAccordions}
              />
            )}
          </Flex>
        </Flex>
        <ProductRecommendations
          products={
            productRecommendationsData?.data?.data?.productRecommendations
          }
        />
      </Box>

      {sanityProductData?.data?.componentes?.map((component: any) => {
        return (
          <ComponentRenderer
            key={component?._id || component?._key}
            component={component?._type}
            data={component}
          />
        );
      })}

      <Footer />
    </Box>
  );
};

export default ProductPage;
