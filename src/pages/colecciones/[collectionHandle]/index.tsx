import React, { useEffect, useState } from "react";
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
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/typesSanity/shopify";
import { useRouter } from "next/router";
import { useCollection } from "@/hooks/collections";
import { client } from "@/lib/sanity.client";
import PortableText from "@/components/PortableText";
import ComponentRenderer from "@/components/ComponentRenderer";
import SortSelector from "@/components/CollectionSortSelector";
import TagSelector from "@/components/TagSelector";
import CollectionsSelector from "@/components/CollectionsSelector";
import { getCollectionOrderTag } from "@/utils";
import { ICollectionPageData } from "@/typesSanity/docs/collectionPage";
import FilterDrawer from "@/components/FilterDrawer";
import Loading from "@/components/Loading";

const CollectionPage = () => {
  const router = useRouter();
  // @ts-ignore
  const sortKey = router.query?.sort?.toUpperCase();
  const order = router.query?.order === "true";
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);
  const queryTagsArray = queryTags
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  const gqlQueryTags = queryTagsArray?.map((tag: string) => {
    return { tag };
  });

  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionPage, setCollectionPage] = useState<ICollectionPageData>();
  const activeOrder = getCollectionOrderTag(
    router?.query?.sort,
    router?.query?.order,
    true
  );
  const collectionData = useCollection(
    router?.query?.collectionHandle,
    sortKey,
    order,
    gqlQueryTags
  );

  const query = `*[_type == "collectionPage"]  {
    collectionContent,
    components[]-> 
  }[0]
  `;

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setCollectionPage(data);
    }

    fetchData();
  }, []);

  const handleRemoveTag = (tag: string) => {
    // Remove tag from query params
    router.query.tags = encodeURIComponent(
      queryTagsArray?.filter((tagItem: string) => tagItem !== tag).join(",")
    );
    router.push(router);
  };

  const removeQueryParam = (param: string) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
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
        {collectionPage?.collectionContent && (
          <PortableText blocks={collectionPage?.collectionContent} />
        )}
      </Box>

      <Flex my="6" pl={"20px"} pr={"20px"}>
        {isMobile && <FilterDrawer useCollectionSort />}
      </Flex>

      {!isMobile && (
        <Box w="full">
          <Flex
            pl={isMobile ? "20px" : "145px"}
            justifyContent="space-between"
            pr={isMobile ? "20px" : "145px"}
            py={2}
          >
            <SortSelector useCollectionSort />

            <Flex>
              <TagSelector />
              <CollectionsSelector />
            </Flex>
          </Flex>
        </Box>
      )}

      <Box w="full" bg="#E7D4C7">
        <Box
          overflowX="auto"
          whiteSpace="nowrap"
          gap={2}
          alignItems="center"
          pl={isMobile ? "20px" : "145px"}
          pr={isMobile ? "20px" : "145px"}
          py={2}
        >
          <Text display="inline" fontWeight={600}>
            Filtros
          </Text>
          {activeOrder && (
            <Tag
              ml={2}
              bg="white"
              textColor="black"
              size="md"
              borderRadius="full"
              variant="solid"
            >
              <TagLabel>{activeOrder?.name}</TagLabel>
              <TagCloseButton onClick={() => removeQueryParam("sort")} />
            </Tag>
          )}
          {queryTagsArray?.map((tag) => (
            <Tag
              ml={2}
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
        </Box>
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
          {collectionData?.data?.data?.collection?.products?.nodes?.map(
            (product: IProduct) => (
              <ProductCard
                handle={product.handle}
                imageSrc={product.featuredImage.url}
                title={product.title}
                // @ts-ignore
                price={Number(product?.priceRange?.maxVariantPrice?.amount)}
                key={product?.handle}
              />
            )
          )}
        </Grid>
      </Box>
      {collectionPage &&
        collectionPage?.components.map((componente: any) => (
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

export default CollectionPage;
