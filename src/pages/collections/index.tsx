import React, { useEffect, useReducer, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavbar, useStore } from "@/store";
import { Select } from "@chakra-ui/react";
import { GoChevronDown } from "react-icons/go";
import { client } from "@/lib/sanity.client";
import ProductCard from "@/components/ProductCard";
import {
  IProduct,
  ISanityProduct,
  ProductSortKey,
} from "@/typesSanity/shopify";
import { ICollectionPageData } from "@/typesSanity/docs/collectionPage";
import PortableText from "@/components/PortableText";
import ComponentRenderer from "@/components/ComponentRenderer";
import { useAllProducts } from "@/hooks/collections";
import {
  initialState,
  collectionReducer,
  actionTypes,
} from "./collectionReducer";
import { useRouter } from "next/router";

const AllCollectionsPage = () => {
  const router = useRouter();
  // @ts-ignore
  const sortKey = router.query?.sort?.toUpperCase();
  const order = router.query?.order === "true";
  const { height } = useNavbar();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [collectionData, setCollectionData] = useState<ICollectionPageData>();
  const allProductsData = useAllProducts(sortKey, order);
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
    // dispatch({
    //   action: actionTypes.SET_COLLECTION_SORT,
    //   payload: e.target.value.split(",")?.[0],
    // }); // Collection order

    // dispatch({
    //   action: actionTypes.SET_COLLECTION_ORDER,
    //   payload: e.target.value.split(",")?.[0],
    // }); // Reverse state

    // Add query params and remove them if sort is inactive
    if (e.target.value.length > 1) {
      router.query.sort = e.target.value.split(",")?.[0];
      router.query.order = e.target.value.split(",")?.[1];
      router.push(router);
    } else router.replace("/collections", undefined, { shallow: true });
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
            <Select
              w="auto"
              placeholder="Etiquetas"
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
              w="auto"
              placeholder="Colleccion"
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
