import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import { Select } from "@chakra-ui/react";
import { GoChevronDown } from "react-icons/go";
import ProductCard from "@/components/ProductCard";
import { IProduct, ISanityProduct } from "@/typesSanity/shopify";
import { useRouter } from "next/router";
import { useCollections } from "@/hooks/collections";

const CollectionPage = () => {
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionProducts, setCollectionProducts] = useState<any>();
  const router = useRouter();
  const { getCollection } = useCollections();

  useEffect(() => {
    async function getCollectionProducts() {
      const collectionProducts = await getCollection(
        router.query.collectionHandle as string
      );

      setCollectionProducts(
        collectionProducts?.data?.collection?.products?.nodes
      );
    }
    getCollectionProducts();
  }, [router.query.collectionHandle]);

  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Text fontWeight={700}>FARMACIA DERMATOLÓGICA</Text>
        <Text fontWeight={600} w="50%">
          Explora el exclusivo catálogo de productos dermatológicos de calidad
          que hemos <br />
          seleccionado cuidadosamente para brindarte resultados efectivos y
          confiables.
        </Text>
      </Box>

      <Box w="full">
        <Flex
          pl={isMobile ? "20px" : "145px"}
          justifyContent="space-between"
          pr={isMobile ? "20px" : "145px"}
          py={2}
        >
          <Select
            placeholder="Select option"
            w="max-content"
            icon={<GoChevronDown />}
            border="none"
            fontWeight={600}
            variant="unstyled"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>

          <Flex>
            <Select
              placeholder="Select option"
              icon={<GoChevronDown />}
              border="none"
              fontWeight={600}
              variant="unstyled"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              placeholder="Select option"
              icon={<GoChevronDown />}
              border="none"
              fontWeight={600}
              variant="unstyled"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
      </Box>

      <Box w="full" bg="#E7D4C7">
        <Box
          pl={isMobile ? "20px" : "145px"}
          pr={isMobile ? "20px" : "145px"}
          py={2}
        >
          <Text fontWeight={600}>Filtros</Text>
        </Box>
      </Box>

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
          {collectionProducts?.map((product: IProduct) => (
            <ProductCard
              handle={product.handle}
              imageSrc={product.featuredImage.url}
              title={product.title}
              // @ts-ignore
              price={Number(product?.priceRange?.maxVariantPrice?.amount)}
              key={product?.handle}
            />
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default CollectionPage;
