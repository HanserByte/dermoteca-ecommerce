import { client } from "@/lib/sanity.client";
import {
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

export async function getAllSanityBlogPosts() {
  const allBlogPages = await client.fetch(allSanityBlogsQuery);
  return allBlogPages;
}
