import { client } from "@/lib/sanity.client";
import { ISanityBlogsPage, ISanityBlogPost } from "@/typesSanity/shopify";
import {
  getAllBlogTags,
  getAllSanityBlogPosts,
  getSanityBlogPage,
  getSanityBlogPost,
} from "@/utils/sanityFunctions";
import { allSanityBlogsQuery } from "@/utils/sanityGroq";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useSanityBlogPage = (initialData: ISanityBlogsPage) => {
  const sanityBlogPageData = useQuery(
    ["sanityBlogPage"],
    () => getSanityBlogPage(),
    { initialData }
  );

  return sanityBlogPageData;
};

export const useSanityBlogPost = (slug: string) => {
  const sanityBlogData = useQuery(["sanityBlog", slug], () =>
    getSanityBlogPost(slug)
  );

  return sanityBlogData;
};

export const useAllSanityBlogPosts = (
  initialData: ISanityBlogPost[],
  sort: string,
  order: string
) => {
  const allSanityBlogsData = useQuery(
    ["allSanityBlogs", { sort, order }],
    () => getAllSanityBlogPosts(sort, order),
    { initialData, keepPreviousData: true }
  );

  return allSanityBlogsData;
};

export const usePrefetchOrderedBlogs = () => {
  const queryClient = useQueryClient();

  const prefetchOrderedBlogs = (sort: string, order: string = "asc") => {
    queryClient.prefetchQuery(["allSanityBlogs", { sort, order }], () =>
      getAllSanityBlogPosts(sort, order)
    );
  };

  return { prefetchOrderedBlogs };
};

export const useAllSanityBlogTags = (initialData?: string[]) => {
  const allSanityBlogTags = useQuery(
    ["allSanityBlogTags"],
    () => getAllBlogTags(),
    { initialData, staleTime: Infinity }
  );
  return allSanityBlogTags;
};
