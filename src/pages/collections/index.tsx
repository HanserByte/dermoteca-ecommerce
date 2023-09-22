import React, { useEffect, useReducer, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Box,
  Flex,
  Grid,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import { Select } from "@chakra-ui/react";
import { GoChevronDown } from "react-icons/go";
import { client } from "@/lib/sanity.client";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/typesSanity/shopify";
import { ICollectionPageData } from "@/typesSanity/docs/collectionPage";
import PortableText from "@/components/PortableText";
import ComponentRenderer from "@/components/ComponentRenderer";
import { useAllProducts } from "@/hooks/collections";
import { initialState, collectionReducer } from "./collectionReducer";
import { useRouter } from "next/router";
import TagSelector from "@/components/TagSelector";
import CollectionsSelector from "@/components/CollectionsSelector";

const AllCollectionsPage = () => {
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);
  const queryTagsArray = queryTags
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  const gqlQueryTags = queryTagsArray
    ?.map((tag: string) => `(tag:${tag})`)
    .join(" OR ");
  // @ts-ignore
  const sortKey = router.query?.sort?.toUpperCase();
  const order = router.query?.order === "true";
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionData, setCollectionData] = useState<ICollectionPageData>();
  const allProductsData = useAllProducts(sortKey, order, gqlQueryTags);
  const [state, dispatch] = useReducer(collectionReducer, initialState);

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
    fetchData();
  }, []);

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Add query params and remove them if sort is inactive
    if (e.target.value.length > 1) {
      router.query.sort = e.target.value.split(",")?.[0];
      router.query.order = e.target.value.split(",")?.[1];
      router.push(router);
    } else router.replace("/collections", undefined, { shallow: true });
  };

  const handleRemoveTag = (tag: string) => {
    // Remove tag from query params
    router.query.tags = encodeURIComponent(
      queryTagsArray?.filter((tagItem: string) => tagItem !== tag).join(",")
    );
    router.push(router);
  };

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
            placeholder="Ordenar - Todos los productos"
            w="auto"
            icon={<GoChevronDown />}
            border="none"
            fontWeight={600}
            variant="unstyled"
            onChange={handleOrderChange}
          >
            <option value="created_at,false">Mas reciente</option>
            <option value="created_at,true">Mas antiguos</option>
            <option value="title,false">Alfabeticamente A - Z</option>
            <option value="title,true">Alfabeticamente Z - A</option>
            <option value="price,false">Precio Menor - Mayor</option>
            <option value="price,true">Precio Mayor - Menor</option>
          </Select>

          <Flex>
            <TagSelector />
            <CollectionsSelector />
          </Flex>
        </Flex>
      </Box>

      <Box w="full" bg="#E7D4C7">
        <Flex
          gap={2}
          alignItems="center"
          pl={isMobile ? "20px" : "145px"}
          pr={isMobile ? "20px" : "145px"}
          py={2}
        >
          <Text fontWeight={600}>Filtros</Text>
          {queryTagsArray?.map((tag) => (
            <Tag
              bg="white"
              textColor="black"
              size="md"
              key={tag}
              borderRadius="full"
              variant="solid"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </Flex>
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
          {allProductsData?.data?.products?.nodes?.map((product: IProduct) => (
            <ProductCard
              handle={product.handle}
              imageSrc={product.featuredImage.url}
              title={product.title}
              // @ts-ignore
              price={product?.priceRange?.maxVariantPrice?.amount}
              key={product?.id}
            />
          ))}
        </Grid>
      </Box>

      {collectionData?.components.map((componente: any) => (
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
