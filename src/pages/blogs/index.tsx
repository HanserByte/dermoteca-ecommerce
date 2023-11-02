import CollectionsSelector from "@/components/CollectionsSelector";
import FilterDrawer from "@/components/FilterDrawer";
import NavBar from "@/components/NavBar";
import PortableText from "@/components/PortableText";
import SortSelector from "@/components/CollectionSortSelector";
import TagSelector from "@/components/TagSelector";
import { useMobileView } from "@/hooks/responsive";
import { useAllSanityBlogPosts, useSanityBlogPage } from "@/hooks/sanity";
import { useNavbar } from "@/store";
import { ISanityBlogPost } from "@/typesSanity/shopify";
import { getBlogOrderTag, handleRemoveTag, removeQueryParam } from "@/utils";
import { COLORS } from "@/utils/constants";
import {
  getAllSanityBlogPosts,
  getSanityBlogPage,
} from "@/utils/sanityFunctions";
import {
  Box,
  Flex,
  Grid,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CollectionSortSelector from "@/components/CollectionSortSelector";
import BlogSortSelector from "@/components/BlogSortSelector";
import ComponentRenderer from "@/components/ComponentRenderer";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import BlogCard from "@/components/BlogCard";
import { NextPageContext } from "next";

interface IBlogsPage {
  allSanityBlogPosts: ISanityBlogPost[];
  sanityBlogPage: any;
}

const Blogs = ({ allSanityBlogPosts, sanityBlogPage }: IBlogsPage) => {
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);
  const queryTagsArray = queryTags
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  const { height } = useNavbar();
  const { isMobile } = useMobileView();

  const sanityBlogPageData = useSanityBlogPage(sanityBlogPage);
  const allSanityBlogsData = useAllSanityBlogPosts(allSanityBlogPosts);
  const activeOrder = getBlogOrderTag(
    router?.query?.sort,
    router?.query?.order
  );
  const hasActiveFilters =
    (queryTags.length > 0 && queryTags != "undefined") || activeOrder;

  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        {sanityBlogPageData?.data?.blogsContent && (
          <PortableText blocks={sanityBlogPageData?.data?.blogsContent} />
        )}
      </Box>

      {/* TODO: Add filter drawer */}
      <Flex my="6" pl={"20px"} pr={"20px"} display={isMobile}>
        {isMobile && <FilterDrawer />}
      </Flex>

      {/* Filter desktop bar */}
      {!isMobile && (
        <Box w="full">
          <Flex pl={"145px"} justifyContent="space-between" pr={"145px"} py={2}>
            <BlogSortSelector />

            <Flex>
              <TagSelector />
            </Flex>
          </Flex>
        </Box>
      )}

      {(hasActiveFilters || !isMobile) && (
        <Box w="full" bg={COLORS.GREEN}>
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
          </Box>
        </Box>
      )}

      {allSanityBlogsData?.isLoading && <Loading />}

      <Box
        my="6"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
      >
        <Grid
          gap={5}
          py={5}
          templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
        >
          {allSanityBlogsData?.data.map((blog: ISanityBlogPost) => (
            <BlogCard
              handle={blog.slug.current}
              image={blog.featuredImage}
              title={blog.title}
              key={blog?._id}
              createdAt={blog?._createdAt}
            />
          ))}
        </Grid>
      </Box>

      {sanityBlogPageData?.data?.components?.map((componente: any) => (
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

export async function getServerSideProps({ res }: NextPageContext) {
  res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const allSanityBlogPosts = await getAllSanityBlogPosts();
  const sanityBlogPage = await getSanityBlogPage();
  return { props: { allSanityBlogPosts, sanityBlogPage } };
}

export default Blogs;
