import { client } from "@/lib/sanity.client";
import {
  allBlogTagsQuery,
  allSanityBlogsQuery,
  blogsPageQuery,
  individualBlogPageQuery,
} from "./sanityGroq";

export async function getSanityBlogPage() {
  const blogsPage = await client.fetch(blogsPageQuery);
  return blogsPage;
}

export async function getSanityBlogPost(slug: string) {
  const blogPage = await client.fetch(individualBlogPageQuery, { slug });
  return blogPage;
}

export async function getAllSanityBlogPosts(
  sort: string,
  order: string = "asc"
) {
  const groqSortString = sort === "titulo" ? "title" : "_createdAt";
  const sortedGroqQuery =
    allSanityBlogsQuery + `| order(${groqSortString} ${order})`;

  const allBlogPages = await client.fetch(sortedGroqQuery);
  return allBlogPages;
}

export async function getAllBlogTags() {
  const allBlogTags = await client.fetch(allBlogTagsQuery);
  return allBlogTags;
}
