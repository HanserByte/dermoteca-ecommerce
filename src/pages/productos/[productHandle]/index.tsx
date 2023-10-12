import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useCartDrawer, useNavbar, useSessionVariables } from "@/store";
import ReviewStars from "@/components/ReviewStars";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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

const ProductPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // @ts-ignore
  const shopifyProductData = useShopifyProduct(router.query.productHandle);
  const sanityProductData = useSanityProduct(router.query.productHandle);
  const { addToCartMutation } = useCartActions();
  const { productRecommendations } = useProductRecommendations(
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
    customerData?.data?.customer?.metafield?.value
  );
  const productWishlistData = useUserWishlist(wishlistProducts);
  const updateProductWishlistMutation = useUpdateProductWishlistMutation();

  const isWishlisted = productWishlistData?.data?.nodes?.some(
    (product) => product.handle === router.query.productHandle
  );

  const hasMultipleImages =
    shopifyProductData?.data?.product?.images?.nodes.length > 1;
  const hasAccordions = sanityProductData?.data?.productAccordions?.length > 0;
  const hasOptions =
    shopifyProductData?.data?.product?.variants?.nodes?.length > 1;

  const handleAddToCart = async () => {
    // @ts-ignore
    const queryVariant = decodeURIComponent(router.query.variant);
    const variantId = shopifyProductData?.data?.product?.variants?.nodes?.find(
      (variant) => variant.title === queryVariant
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
    const { id, metafield } = customerData?.data?.customer;
    const initialFieldData = metafield?.value ? metafield?.value + "-,-" : "";

    updateProductWishlistMutation.mutate(
      // @ts-ignore
      {
        id,
        metafield: {
          id: metafield?.id,
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
    const { id, metafield } = customerData?.data?.customer;
    const wishlistArray = metafield?.value?.split("-,-");
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
          id: metafield?.id,
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

  useEffect(() => {
    setWishlistProducts(customerData?.data?.customer?.metafield?.value);
  }, [customerData?.data?.customer?.metafield?.value]);

  useEffect(() => {
    if (addToCartMutation?.isLoading) return;
    queryClient.refetchQueries(["cart", cartId]);
  }, [addToCartMutation?.isLoading]);

  useEffect(() => {
    setQuantity(1);
    setThumbsSwiper(null);
  }, [router.query.productHandle]);

  return (
    <Box maxW="2560px" m="0 auto">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />
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
          productTitle={sanityProductData?.data?.store?.title}
          productCollection={
            shopifyProductData?.data?.product?.collections?.nodes[0]
          }
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
                    (image, idx) => (
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
                    onSwiper={setThumbsSwiper}
                  >
                    {shopifyProductData?.data?.product?.images?.nodes.map(
                      (image, idx) => (
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
            <Text fontSize={isMobile ? "xl" : "2xl"} fontWeight={700}>
              {sanityProductData?.data?.store?.title}
            </Text>
            <Text fontSize="xl" fontWeight="500">
              ${sanityProductData?.data?.store?.variants[0]?.store?.price}
            </Text>

            <ReviewStars rating={4} />

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

            <Flex
              gap={isMobile ? 1 : 8}
              justifyContent={isMobile ? "space-between" : "flex-start"}
              alignItems="center"
            >
              {!isOutOfStock && (
                <Flex alignItems="center" gap={3}>
                  <Button
                    disabled={productWishlistData?.isLoading}
                    onClick={() =>
                      setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)
                    }
                    bg="#00AA4F"
                    size="sm"
                    color="white"
                    rounded="full"
                    _hover={{ opacity: 0.8 }}
                  >
                    -
                  </Button>
                  <Text fontSize="xl" fontWeight="500">
                    {quantity}
                  </Text>
                  <Button
                    disabled={productWishlistData?.isLoading}
                    onClick={() => setQuantity(quantity + 1)}
                    bg="#00AA4F"
                    size="sm"
                    color="white"
                    rounded="full"
                    _hover={{ opacity: 0.8 }}
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
        <ProductRecommendations products={productRecommendations} />
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductPage;
