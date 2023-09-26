import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { client } from "@/lib/sanity.client";
import { useCartDrawer, useCartProducts, useNavbar, useStore } from "@/store";
import ReviewStars from "@/components/ReviewStars";
import { AiOutlineHeart } from "react-icons/ai";
import { useCart } from "@/hooks/cart";
import { useProductRecommendations, useShopifyProduct } from "@/hooks/products";
import ProductRecommendations from "@/components/ProductRecommendations";
import ProductAccordion from "@/components/ProductAccordion";
import BreadCrumbs from "@/components/BreadCrumbs";

const ProductPage = () => {
  const router = useRouter();

  // @ts-ignore
  const shopifyProductData = useShopifyProduct(router.query.productHandle);
  const [productData, setProductData] = useState<any>();
  const { addToCart, cartId } = useCart();
  const { productRecommendations } = useProductRecommendations(
    productData?.store?.gid
  );
  const { setOpen } = useCartDrawer();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const { height } = useNavbar();
  const { setProducts, setPrice } = useCartProducts();
  const [quantity, setQuantity] = useState(1);
  const hasAccordions = productData?.productAccordions?.length > 0;

  const query = `*[_type == "product" && store.slug.current == "${router.query.productHandle}"][0]{
    ...,
    store {
      ...,
      variants[]->
    }
  }
  `;

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setProductData(data);
    }

    fetchData();
  }, [router.query.productHandle]);

  const handleAddToCart = async () => {
    const productId = productData?.store?.variants[0]?.store?.gid;
    const response = await addToCart(cartId, productId, quantity);
    setProducts(response?.data?.cartLinesAdd?.cart?.lines?.nodes);
    setPrice(response?.data?.cartLinesAdd?.cart?.cost?.subtotalAmount?.amount);
    setOpen(true);
  };

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
        <BreadCrumbs productTitle={productData?.store.title} />
      </Flex>
      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Flex gap={6}>
          <Box w="50%">
            <img
              style={{ position: "sticky", top: "86px" }}
              src={productData?.store?.previewImageUrl}
              alt={productData?.store?.title}
            />
          </Box>
          <Flex w="50%" gap={3} direction="column">
            <Text fontSize="2xl" fontWeight={700}>
              {productData?.store?.title}
            </Text>
            <Text fontSize="xl" fontWeight="500">
              ${productData?.store?.variants[0]?.store?.price}
            </Text>

            <ReviewStars rating={4} />

            <Text
              fontSize="lg"
              fontWeight="400"
              dangerouslySetInnerHTML={{
                __html: productData?.store?.descriptionHtml,
              }}
              style={{ listStylePosition: "inside" }}
            />

            {/* Variant options */}

            <Flex mt="6" gap={8} alignItems="center">
              <Flex alignItems="center" gap={3}>
                <Button
                  onClick={() =>
                    setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)
                  }
                  bg="#00AA4F"
                  size="sm"
                  color="white"
                  rounded="full"
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
                bg="transparent"
                color="grey"
                _hover={{ color: "#00AA4F" }}
              >
                <AiOutlineHeart size={40} />
              </Button>
            </Flex>

            {hasAccordions && (
              <ProductAccordion accordions={productData?.productAccordions} />
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
