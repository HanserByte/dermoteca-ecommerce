import { useMobileView } from "@/hooks/responsive";
import { useSearch } from "@/hooks/search";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAllProducts } from "@/hooks/collections";
import { IProduct } from "@/typesSanity/shopify";
import { COLORS } from "@/utils/constants";

const Search = () => {
  const { isMobile } = useMobileView();
  const router = useRouter();
  const query = router.query.query;
  const searchData = useSearch(query as string);
  const allProductsData = useAllProducts(undefined, false, "");

  const handleInputChange = (event: any) => {
    router.query.query = event.target.value;
    router.push(router, "", { scroll: false });
  };

  return (
    <VStack
      my="6"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <Text textTransform="uppercase" fontSize="22px" fontWeight="700" mb="5px">
        Encuentra todo para tu piel
      </Text>

      <Input
        placeholder="Buscar"
        w="max"
        onChange={handleInputChange}
        value={query}
        borderColor={COLORS.GREEN}
      />

      <Grid
        gap={5}
        py={5}
        templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
      >
        {searchData?.data?.nodes?.map((product: Product) => (
          <ProductCard
            handle={product.handle}
            imageSrc={product?.featuredImage?.url}
            title={product.title}
            // @ts-ignore
            price={product?.priceRange?.maxVariantPrice?.amount}
            key={product?.id}
          />
        ))}

        {!searchData?.data && (
          <>
            {allProductsData?.data?.products?.nodes?.map(
              (product: IProduct) => (
                <ProductCard
                  handle={product.handle}
                  imageSrc={product.featuredImage.url}
                  title={product.title}
                  // @ts-ignore
                  price={product?.priceRange?.maxVariantPrice?.amount}
                  key={product?.id}
                />
              )
            )}
          </>
        )}
      </Grid>
    </VStack>
  );
};

export default Search;
