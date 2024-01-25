"use client";
import NavBar from "@/components/NavBar";
import PortableText from "@/components/PortableText";
import { useMobileView } from "@/hooks/responsive";
import {
  useAllSanityBlogPosts,
  useAllSanityBlogTags,
  useSanityBlogPage,
} from "@/hooks/sanity";
import { useNavbar } from "@/store";
import { ISanityBlogPost } from "@/typesSanity/shopify";
import { getBlogOrderTag, handleRemoveTag, removeQueryParam } from "@/utils";
import { COLORS } from "@/utils/constants";
import {
  getAllBlogTags,
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
import React, { useEffect, useState } from "react";
import BlogSortSelector from "@/components/BlogSortSelector";
import ComponentRenderer from "@/components/ComponentRenderer";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import BlogCard from "@/components/BlogCard";
import { NextPageContext } from "next";
import BlogTagsSelector from "@/components/BlogTagsSelector";
import BlogsFilterDrawer from "@/components/BlogsFilterDrawer";

interface IBlogsPage {
  allSanityBlogPosts: ISanityBlogPost[];
  sanityBlogPage: any;
  allSanityBlogTags: string[];
}

const Blogs = ({
  allSanityBlogPosts,
  sanityBlogPage,
  allSanityBlogTags,
}: IBlogsPage) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);
  const queryTagsArray = queryTags
    ?.split(",")
    .filter((tag: string) => tag != "undefined" && tag != "");
  // @ts-ignore
  const sortKey = router.query?.sort as string;
  const order = (router.query?.order as string) || "asc";
  const { height } = useNavbar();
  const { isMobile } = useMobileView();
  useAllSanityBlogTags(allSanityBlogTags);
  const sanityBlogPageData = useSanityBlogPage(sanityBlogPage);
  const allSanityBlogsData = useAllSanityBlogPosts(
    allSanityBlogPosts,
    sortKey,
    order,
    queryTagsArray
  );

  const activeOrder = getBlogOrderTag(
    router?.query?.sort,
    router?.query?.order
  );

  const hasActiveFilters =
    (queryTags.length > 0 && queryTags != "undefined") || activeOrder;

  useEffect(() => {
    // Load the TikTok embed script asynchronously
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
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
        {sanityBlogPageData?.data?.blogsContent && (
          <PortableText blocks={sanityBlogPageData?.data?.blogsContent} />
        )}
      </Box>

      {/* @ts-ignore */}
      <Flex my="6" pl={"20px"} pr={"20px"} display={isMobile}>
        {isMobile && <BlogsFilterDrawer />}
      </Flex>

      {/* Filter desktop bar */}
      {!isMobile && (
        <Box w="full">
          <Flex pl={"145px"} justifyContent="space-between" pr={"145px"} py={2}>
            <BlogSortSelector />

            <Flex>
              <BlogTagsSelector />
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
            <Text display="inline" color="white" fontWeight={600}>
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
          {isClient && (
            <>
              {sanityBlogPage?.tiktoks?.map(
                (tiktokUrl: string, idx: number) => {
                  return (
                    <blockquote
                      key={idx}
                      className="tiktok-embed"
                      cite={tiktokUrl}
                      data-video-id={tiktokUrl.split("/").pop()}
                      data-embed-from="embed_page"
                      style={{ maxWidth: "605px", minWidth: "325px" }}
                    >
                      <section></section>
                    </blockquote>
                  );
                }
              )}
            </>
          )}

          <script async src="https://www.tiktok.com/embed.js"></script>

          {allSanityBlogsData?.data?.map((blog: ISanityBlogPost) => (
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

export async function getServerSideProps({ res, query }: NextPageContext) {
  res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const tags = decodeURIComponent(query?.tags as string);
  const order = query?.order as string;
  const sort = query?.sort as string;

  const allSanityBlogPosts = await getAllSanityBlogPosts(
    sort || "_createdAt",
    order || "asc",
    tags !== "undefined" && tags[0]?.length > 0 ? tags.split(",") : []
  );

  const sanityBlogPage = await getSanityBlogPage();
  const allSanityBlogTags = await getAllBlogTags();
  return { props: { allSanityBlogPosts, sanityBlogPage, allSanityBlogTags } };
}

export default Blogs;
