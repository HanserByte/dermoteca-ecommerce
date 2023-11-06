import { IProduct } from "@/typesSanity/shopify";
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

import ProductCard from "../ProductCard";
import { useStore } from "@/store";
import Link from "next/link";
import { COLORS } from "@/utils/constants";

interface ProductRecommendationsProps {
  products: IProduct[];
}

const ProductRecommendations = ({ products }: ProductRecommendationsProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  return (
    <VStack my={12} w="full">
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Text fontWeight={700} fontSize={isMobile ? "md" : "xl"}>
          Productos Recomendados
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
          {products?.map((product) => (
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
  );
};

export default ProductRecommendations;
