import { useMobileView } from "@/hooks/responsive";
import { COLORS } from "@/utils/constants";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useBestSellingProducts } from "@/hooks/products";
import ProductCard from "../ProductCard";

const BestSelling = () => {
  const { isMobile } = useMobileView();
  const bestSellingProductsData = useBestSellingProducts();

  return (
    <Box
      my="6"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <VStack my={12} w="full">
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text fontWeight={700} fontSize={isMobile ? "md" : "xl"}>
            Productos populares
          </Text>
          <Button
            as={Link}
            href="/colecciones/todas"
            border="1px"
            borderColor="black"
            rounded="full"
            bg="transparent"
            size={isMobile ? "sm" : "lg"}
            _hover={{
              bg: "transparent",
              borderColor: COLORS.GREEN,
              textColor: COLORS.GREEN,
            }}
          >
            VER TODO {!isMobile && <BsArrowRight />}
          </Button>
        </Flex>
        <Box w="full">
          <Splide
            options={{
              gap: "1rem",
              perPage: isMobile ? 2 : 3,
              arrows: false,
              pagination: false,
            }}
            aria-label="My Favorite Images"
          >
            {bestSellingProductsData?.data?.nodes?.map((product) => (
              <SplideSlide key={product.id}>
                <ProductCard
                  imageSrc={product.featuredImage.url}
                  title={product?.title}
                  // @ts-ignore
                  price={product?.priceRange?.maxVariantPrice?.amount}
                  handle={product?.handle}
                />
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      </VStack>
    </Box>
  );
};

export default BestSelling;
