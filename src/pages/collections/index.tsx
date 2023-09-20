import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import { Select } from "@chakra-ui/react";
import { GoChevronDown } from "react-icons/go";
import { client } from "@/lib/sanity.client";
import ProductCard from "@/components/ProductCard";
import { ISanityProduct } from "@/typesSanity/shopify";
import { ICollectionPageData } from "@/typesSanity/docs/collectionPage";
import PortableText from "@/components/PortableText";
import ComponentRenderer from "@/components/ComponentRenderer";

const AllCollectionsPage = () => {
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionProducts, setCollectionProducts] = useState<any>();
  const [collectionData, setCollectionData] = useState<ICollectionPageData>();

  const query = `*[_type == "product"]`;

  const collectionQuery = `*[_type == "collectionPage"]  {
    collectionContent,
    components[]-> 
  }[0]
  `;

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(collectionQuery);
      setCollectionData(data);
    }

    async function fetchcollection() {
      const collections = await client.fetch(query);
      setCollectionProducts(collections);
    }

    fetchData();
    fetchcollection();
  }, []);

  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        {collectionData?.collectionContent && (
          <PortableText blocks={collectionData?.collectionContent} />
        )}
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
          {collectionProducts?.map((product: ISanityProduct) => (
            <ProductCard
              handle={product.store.slug.current}
              imageSrc={product.store.previewImageUrl}
              title={product.store.title}
              price={product?.store.priceRange?.minVariantPrice}
              key={product?.store.gid}
            />
          ))}
        </Grid>
      </Box>

      {collectionData &&
        collectionData?.components.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      <Footer />
    </Box>
  );
};

export default AllCollectionsPage;
