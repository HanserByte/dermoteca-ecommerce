import { useAllCollections } from "@/hooks/collections";
import { COLORS } from "@/utils/constants";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  COLLECTION_PRODUCTS_SORT_OPTIONS,
  ALL_PRODUCTS_SORT_OPTIONS,
} from "@/utils/constants";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { getCollectionOrderTag } from "@/utils";
import { useAllTags } from "@/hooks/products";
import VendorSelector from "../vendorSelector";

const FilterDrawer = ({ useCollectionSort = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();
  const allTagsData = useAllTags();
  const allCollectionsData = useAllCollections();
  const activeOrder = getCollectionOrderTag(
    router?.query?.sort,
    router?.query?.order,
    useCollectionSort
  );

  const activeCollection = router?.query?.collectionHandle;
  const queryTags = decodeURIComponent(router?.query?.tags);
  const SORT_OPTIONS = useCollectionSort
    ? COLLECTION_PRODUCTS_SORT_OPTIONS
    : ALL_PRODUCTS_SORT_OPTIONS;

  const handleOrderChange = (e: React.ClickEvent<HTMLSelectElement>) => {
    // Add query params and remove them if sort is inactive
    if (e.target.value.length > 1) {
      router.query.sort = e.target.value.split(",")?.[0];
      router.query.order = e.target.value.split(",")?.[1];
      router.push(router);
    } else router.replace("/collections", undefined, { shallow: true });
    onClose();
  };

  const handleCheckboxSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = encodeURIComponent(e.target.value);
    const queryTagsArray = queryTags
      ?.split(",")
      .filter((tag: string) => tag != "undefined");

    //  Add tag to query params
    if (!queryTagsArray?.includes(e.target.value)) {
      router.query.tags =
        queryTagsArray.length > 0
          ? [encodeURIComponent(queryTagsArray.join(",")), tag].join(",")
          : tag;
    } else {
      // Remove tag from query params
      router.query.tags = encodeURIComponent(
        queryTagsArray
          ?.filter((tagItem: string) => tagItem !== e.target.value)
          .join(",")
      );
    }
    router.push(router);
  };

  return (
    <>
      <Button
        ml="auto"
        gap={2}
        _hover={{ opacity: 0.8 }}
        ref={btnRef}
        bg={COLORS.GREEN}
        color="white"
        onClick={onOpen}
      >
        Filtros
        <BsFilter />
      </Button>
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filtros</DrawerHeader>

          <DrawerBody>
            <VStack w="min-content" align="start" gap={1}>
              <Text fontSize="lg" color={COLORS.GREEN} fontWeight={600}>
                Orden
              </Text>
              {SORT_OPTIONS.map((option) => (
                <Button
                  gap={2}
                  variant="ghost"
                  _hover={{ bg: "transparent" }}
                  p={0}
                  onClick={handleOrderChange}
                  value={option.value}
                  key={option.name}
                >
                  {option.name}
                  {activeOrder?.name === option.name && (
                    <CheckCircleIcon color={COLORS.GREEN} />
                  )}
                </Button>
              ))}
            </VStack>

            <VendorSelector />

            {/* <VStack mt={8} alignItems="start" gap={1}>
              <Text fontSize="lg" color={COLORS.GREEN} fontWeight={600}>
                Etiquetas
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" columnGap={4}>
                {allTagsData?.data?.productTags?.edges?.map((tag: any) => {
                  return (
                    <Checkbox
                      colorScheme="green"
                      size="lg"
                      value={tag.node}
                      onChange={handleCheckboxSelect}
                      key={tag.node}
                      isChecked={queryTags?.includes(tag.node)}
                      fontWeight={600}
                    >
                      {tag.node}
                    </Checkbox>
                  );
                })}
              </Grid>
            </VStack> */}

            <VStack mt={8} w="min-content" align="start" gap={1}>
              <Text fontSize="lg" color={COLORS.GREEN} fontWeight={600}>
                Colecciones
              </Text>
              <Button
                gap={2}
                _hover={{ bg: "transparent" }}
                p={0}
                fontSize="16px"
                variant="ghost"
                size="sm"
                as={Link}
                href={`/collections/all`}
              >
                Todas las colecciones
                {router?.pathname.includes("all") && (
                  <CheckCircleIcon color={COLORS.GREEN} />
                )}
              </Button>
              {allCollectionsData?.data?.collections?.nodes?.map(
                (collection: any) => {
                  return (
                    <Button
                      gap={2}
                      _hover={{ bg: "transparent" }}
                      p={0}
                      key={collection.handle}
                      fontSize="16px"
                      variant="ghost"
                      size="sm"
                      as={Link}
                      href={`/collections/${collection.handle}`}
                    >
                      {collection.title}
                      {activeCollection === collection.handle && (
                        <CheckCircleIcon color={COLORS.GREEN} />
                      )}
                    </Button>
                  );
                }
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
