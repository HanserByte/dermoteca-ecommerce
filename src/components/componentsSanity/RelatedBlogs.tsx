import { useMobileView } from "@/hooks/responsive";
import { ISanityBlogPost } from "@/typesSanity/shopify";
import { COLORS } from "@/utils/constants";
import { Box, Button, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import BlogCard from "../BlogCard";

interface IRelatedBlogs {
  data: {
    title: string;
    relatedArticles: ISanityBlogPost[];
  };
}

const RelatedBlogs = ({ data }: IRelatedBlogs) => {
  const { isMobile } = useMobileView();

  return (
    <Box
      my="6"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <VStack my={12} w="full">
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text fontWeight={700} fontSize={isMobile ? "md" : "xl"}>
            {data.title}
          </Text>
          <Button
            as={Link}
            href="/blogs"
            border="1px"
            borderColor="black"
            rounded="full"
            bg="transparent"
            size={isMobile ? "sm" : "lg"}
            _hover={{
              bg: "transparent",
              borderColor: COLORS.GREEN,
              textColor: COLORS.GREEN,
            }}
          >
            VER TODO {!isMobile && <BsArrowRight />}
          </Button>
        </Flex>

        <Grid
          w="full"
          templateColumns={isMobile ? "1fr" : "repeat(3, 1fr)"}
          columnGap="1rem"
          rowGap="1rem"
        >
          {data?.relatedArticles?.map((blog, idx) => (
            <BlogCard
              handle={blog.slug.current}
              image={blog.featuredImage}
              title={blog.title}
              key={blog?._id}
              createdAt={blog?._createdAt}
            />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default RelatedBlogs;
