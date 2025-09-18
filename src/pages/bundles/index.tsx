import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box, Grid, Heading, useMediaQuery } from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useCollection } from "@/hooks/collections";
import { IProduct } from "@/typesSanity/shopify";

const BundlesPage = () => {
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  // Usamos la misma lógica que colecciones: consumimos el endpoint /api/collections
  const sortKey = "BEST_SELLING"; // default, igual a colecciones cuando no hay sort
  const reverse = false;
  const gqlQueryTags: string[] = [];
  const gqlQueryVendors: string[] = [];

  // Por convención, asumimos que existe una colección con handle "bundles"
  const collectionData = useCollection(
    "bundles",
    sortKey,
    reverse,
    gqlQueryTags,
    gqlQueryVendors
  );

  const products: IProduct[] =
    collectionData?.data?.data?.collection?.products?.nodes || [];

  return (
    <Box maxW="2560px" m="0 auto" id="bundles-page">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Heading as="h1" size={isMobile ? "md" : "lg"}>
          Bundles
        </Heading>
      </Box>

      {collectionData?.isLoading && <Loading />}

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Grid
          gap={5}
          py={5}
          templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
        >
          {products?.map((product: IProduct) => (
            <ProductCard
              key={product?.handle}
              handle={product.handle}
              imageSrc={product.featuredImage ? product.featuredImage.url : ""}
              title={product.title}
              // @ts-ignore
              price={product?.priceRange?.maxVariantPrice?.amount}
            />
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default BundlesPage;
