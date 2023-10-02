import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCartDrawer, useNavbar, useSessionVariables } from "@/store";
import ReviewStars from "@/components/ReviewStars";
import { AiOutlineHeart } from "react-icons/ai";
import { useCartActions, useCartLegacy } from "@/hooks/cart";
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

const ProductPage = () => {
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
  };

  useEffect(() => {
    if (addToCartMutation?.isLoading) return;

    queryClient.refetchQueries(["cart", cartId]);
    setOpen(true);
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
        h="50px"
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
                    (image) => (
                      <SwiperSlide>
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
                      (image) => (
                        <SwiperSlide>
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
              <Flex alignItems="center" gap={3}>
                <Button
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

              <Button
                onClick={handleAddToCart}
                bg="#00AA4F"
                color="white"
                rounded="full"
                _hover={{ opacity: 0.8 }}
              >
                AGREGAR AL CARRITO
              </Button>

              <Button
                p={0}
                bg="transparent"
                color="grey"
                _hover={{ color: "#00AA4F" }}
              >
                <AiOutlineHeart size={40} />
              </Button>
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
