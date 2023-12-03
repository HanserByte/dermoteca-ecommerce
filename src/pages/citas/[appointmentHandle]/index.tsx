import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { client } from "@/lib/sanity.client";
import { getSanityProduct } from "@/utils/sanityFunctions";
import { getShopifyProduct } from "@/utils/shopifyFunctions";
import { useMobileView } from "@/hooks/responsive";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useNavbar } from "@/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import ReviewStars from "@/components/ReviewStars";
import ProductAccordion from "@/components/ProductAccordion";

interface PageProps {
  sanityProduct: any;
  shopifyProduct: any;
}

export default function AppointmentPage({
  sanityProduct,
  shopifyProduct,
}: PageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { isMobile } = useMobileView();
  const { height } = useNavbar();

  const hasMultipleImages = shopifyProduct.product?.images?.nodes.length > 1;
  const hasAccordions = sanityProduct.productAccordions?.length > 0;

  console.log(sanityProduct, shopifyProduct);
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
          pageTitle={sanityProduct.store?.title}
          pageCategory={{ handle: "citas", title: "Citas" }}
          mainPage="citas"
        />
      </Flex>

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
        pb={40}
      >
        <Flex gap={6} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "100%" : "50%"}>
            {!hasMultipleImages && (
              <img
                style={{ position: "sticky", top: `${height}px` }}
                src={sanityProduct?.store?.previewImageUrl}
                alt={sanityProduct?.store?.title}
              />
            )}

            {hasMultipleImages && (
              <Box position="sticky" top={`${height}px`}>
                <Swiper
                  className="mySwiper2"
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper }}
                >
                  {shopifyProduct.product?.images?.nodes.map(
                    (image: any, idx: any) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={image.url}
                          alt={sanityProduct?.store?.title}
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
                    // @ts-ignore
                    onSwiper={setThumbsSwiper}
                  >
                    {shopifyProduct.product?.images?.nodes.map(
                      (image: any, idx: any) => (
                        <SwiperSlide key={idx}>
                          <img
                            src={image.url}
                            alt={sanityProduct?.store?.title}
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
              {sanityProduct?.store?.title}
            </Text>
            <Text fontSize="xl" fontWeight="500">
              ${sanityProduct?.store?.variants[0]?.store?.price}
            </Text>

            <ReviewStars rating={4} />

            <Text
              fontSize={isMobile ? "md" : "lg"}
              fontWeight="400"
              dangerouslySetInnerHTML={{
                __html: sanityProduct?.store?.descriptionHtml,
              }}
              style={{ listStylePosition: "inside" }}
            />

            <Flex
              gap={isMobile ? 1 : 8}
              justifyContent={isMobile ? "space-between" : "flex-start"}
              alignItems="center"
            >
              <Button
                // onClick={handleAddToCart}
                bg="#00AA4F"
                color="white"
                rounded="full"
                _hover={{ opacity: 0.8 }}
              >
                AGENDAR CITA
              </Button>
            </Flex>

            {hasAccordions && (
              <ProductAccordion accordions={sanityProduct?.productAccordions} />
            )}
          </Flex>
        </Flex>
        {/* <ProductRecommendations
          products={
            productRecommendations.data?.productRecommendations
          }
        /> */}
      </Box>
      <Footer />
    </Box>
  );
}

export const getStaticProps = async (cts: any) => {
  const appointmentSanityProduct = await getSanityProduct(
    client,
    "cita-general"
  );
  const appointmentShopifyProduct = await getShopifyProduct("cita-general");
  return {
    props: {
      sanityProduct: appointmentSanityProduct,
      shopifyProduct: appointmentShopifyProduct,
    },
  };
};

export const getStaticPaths = async () => {
  // TODO: Create a function that fetches all slugs that correspond to an appointment product
  return {
    paths: ["/citas/cita-general"],
    fallback: "blocking",
  };
};
