import BreadCrumbs from "@/components/BreadCrumbs";
import ComponentRenderer from "@/components/ComponentRenderer";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import { useMobileView } from "@/hooks/responsive";
import { useSanityBlogPost } from "@/hooks/sanity";
import { useNavbar } from "@/store";
import { ISanityBlogPost } from "@/typesSanity/shopify";
import { COLORS } from "@/utils/constants";
import { getSanityBlogPost } from "@/utils/sanityFunctions";
import { Box, Flex } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";

interface IBlogPostPage {
  blogPost: ISanityBlogPost;
}

const BlogPage = ({ blogPost }: IBlogPostPage) => {
  const router = useRouter();
  const { height } = useNavbar();
  const { isMobile } = useMobileView();
  const sanityBlogData = useSanityBlogPost(
    blogPost,
    router.query?.slug as string
  );

  return (
    <Box maxW="2560px" m="0 auto">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />
      {sanityBlogData.isLoading && <Loading />}

      <Flex
        alignItems="center"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
        py="2"
        h="max-content"
        bg={COLORS.GREEN}
        color="white"
        w="100%"
      >
        <BreadCrumbs
          pageTitle={sanityBlogData?.data?.title}
          pageCategory={{
            title: sanityBlogData?.data?.tags[0].value,
            handle: sanityBlogData?.data?.tags[0].value,
          }}
          mainPage="blogs"
        />
      </Flex>

      {sanityBlogData?.data?.componentes?.map((component: any) => {
        const componentCopy = { ...component };
        componentCopy.createdAt = blogPost._createdAt;
        return (
          <ComponentRenderer
            key={component?._id || component?._key}
            component={component?._type}
            data={componentCopy}
          />
        );
      })}
      <Footer />
    </Box>
  );
};

export async function getServerSideProps({ res, query }: NextPageContext) {
  res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const blogPost = await getSanityBlogPost(query.slug as string);
  return { props: { blogPost } };
}

export default BlogPage;
