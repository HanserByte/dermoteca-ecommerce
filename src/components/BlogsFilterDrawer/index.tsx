import { BLOGS_SORT_OPTIONS, COLORS } from "@/utils/constants";
import { CheckCircleIcon } from "@chakra-ui/icons";
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
import { useRouter } from "next/router";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { getBlogOrderTag } from "@/utils";
import { useAllSanityBlogTags } from "@/hooks/sanity";

const BlogsFilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();
  const allSanityBlogTags = useAllSanityBlogTags();
  const activeOrder = getBlogOrderTag(
    router?.query?.sort,
    router?.query?.order
  );

  const queryTags = decodeURIComponent(router?.query?.tags);
  const SORT_OPTIONS = BLOGS_SORT_OPTIONS;

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
    router.push(router, undefined, { shallow: true });
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

            <VStack mt={8} alignItems="start" gap={1}>
              <Text fontSize="lg" color={COLORS.GREEN} fontWeight={600}>
                Etiquetas
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" columnGap={4}>
                {allSanityBlogTags?.data?.alltags?.map((tag: any) => {
                  return (
                    <Checkbox
                      colorScheme="green"
                      size="lg"
                      value={tag}
                      onChange={handleCheckboxSelect}
                      key={tag}
                      isChecked={queryTags?.includes(tag)}
                      fontWeight={600}
                    >
                      {tag}
                    </Checkbox>
                  );
                })}
              </Grid>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BlogsFilterDrawer;
