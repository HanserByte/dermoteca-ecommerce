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
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import { client } from "@/lib/sanity.client";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/typesSanity/shopify";
import { ICollectionPageData } from "@/typesSanity/docs/collectionPage";
import PortableText from "@/components/PortableText";
import ComponentRenderer from "@/components/ComponentRenderer";
import { useAllProducts } from "@/hooks/collections";
import { useRouter } from "next/router";
import TagSelector from "@/components/TagSelector";
import CollectionsSelector from "@/components/CollectionsSelector";
import CollectionSortSelector from "@/components/CollectionSortSelector";
import {
  getCollectionOrderTag,
  handleRemoveTag,
  handleRemoveVendor,
  removeQueryParam,
} from "@/utils";
import FilterDrawer from "@/components/FilterDrawer";
import Loading from "@/components/Loading";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import VendorSelector from "@/components/vendorSelector";

const PRODUCTS_PER_PAGE = 20;

const AllCollectionsPage = () => {
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);
  const queryTagsArray = queryTags
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  // @ts-ignore
  const queryVendors = decodeURIComponent(router?.query?.vendors);
  const queryVendorsArray = queryVendors
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  const gqlQueryTags = queryTagsArray
    ?.map((tag: string) => `(tag:${tag})`)
    .join(" OR ");
  const gqlQueryVendors = queryVendorsArray
    ?.map((tag: string) => `(vendor:${tag})`)
    .join(" OR ");
  // @ts-ignore
  const sortKey = router.query?.sort?.toUpperCase();
  const order = router.query?.order === "true";
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionData, setCollectionData] = useState<ICollectionPageData>();
  const allProductsData = useAllProducts(
    sortKey,
    order,
    gqlQueryTags,
    gqlQueryVendors
  );
  const activeOrder = getCollectionOrderTag(
    router?.query?.sort,
    router?.query?.order
  );
  const filteredProductsData =
    allProductsData?.data?.data?.products?.nodes?.filter(
      (product) => product.productType.toLowerCase() !== "cita"
    );

  const hasActiveFilters =
    (queryTags.length > 0 && queryTags != "undefined") || activeOrder;

  const collectionQuery = `*[_type == "collectionPage"]  {
    collectionContent,
    components[]-> 
  }[0]
  `;

  const [currentPage, setCurrentPage] = useState(1);

  // Leer la página actual desde el query string y actualizar el estado inicial
  useEffect(() => {
    const page = Number(router.query.page) || 1;
    setCurrentPage(page);
  }, [router.query.page]);

  const totalPages = Math.ceil(
    filteredProductsData?.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = filteredProductsData?.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(collectionQuery);
      setCollectionData(data);
    }
    fetchData();
  }, []);

  // useEffect para el scroll al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Actualizar el query string cada vez que cambie la página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Lógica para calcular el rango de páginas visibles
  const getPaginationRange = (currentPage, totalPages) => {
    const range = [];
    const maxVisiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange(currentPage, totalPages);

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

      <Flex my="6" pl={"20px"} pr={"20px"}>
        {isMobile && <FilterDrawer />}
      </Flex>

      {!isMobile && (
        <Box w="full">
          <Flex pl={"145px"} justifyContent="space-between" pr={"145px"} py={2}>
            <CollectionSortSelector />
            <Flex>
              <TagSelector />
              <VendorSelector />
              <CollectionsSelector />
            </Flex>
          </Flex>
        </Box>
      )}

      {(hasActiveFilters || !isMobile) && (
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
                <TagCloseButton
                  onClick={() => removeQueryParam("sort", router)}
                />
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
                <TagCloseButton
                  onClick={() => handleRemoveTag(tag, queryTagsArray, router)}
                />
              </Tag>
            ))}

            {queryVendorsArray?.map((tag) => (
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
                <TagCloseButton
                  onClick={() =>
                    handleRemoveVendor(tag, queryVendorsArray, router)
                  }
                />
              </Tag>
            ))}
          </Box>
        </Box>
      )}

      {allProductsData?.isLoading && <Loading />}

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
          {paginatedProducts?.map((product: IProduct) => (
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

      {totalPages > 1 && (
        <Flex justifyContent="center" my={5}>
          <HStack spacing={4}>
            <IconButton
              icon={<ArrowLeftIcon />}
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
              aria-label="Previous Page"
            />
            {paginationRange.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                sx={{
                  bgColor: currentPage === page ? "#00a94f !important" : "",
                }}
              >
                {page}
              </Button>
            ))}
            <IconButton
              icon={<ArrowRightIcon />}
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              aria-label="Next Page"
            />
          </HStack>
        </Flex>
      )}

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
