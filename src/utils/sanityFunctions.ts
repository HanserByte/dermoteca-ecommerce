import { client } from "@/lib/sanity.client";
import {
  allBlogTagsQuery,
  allSanityBlogsQuery,
  blogsPageQuery,
  calendarSettings,
  individualBlogPageQuery,
  sanityProductQuery,
} from "./sanityGroq";
import { SanityClient, groq } from "next-sanity";

export async function getSanityBlogPage() {
  const blogsPage = await client.fetch(blogsPageQuery);
  return blogsPage;
}

export async function getSanityBlogPost(slug: string) {
  const blogPost = await client.fetch(individualBlogPageQuery, { slug });
  return blogPost;
}

export async function getAllSanityBlogPosts(
  sort: string = "",
  order: string = "asc",
  queryTags: string[]
) {
  const groqSortString = sort === "titulo" ? "title" : "_createdAt";

  const desiredTags = queryTags
    ?.map((tag) => `"${tag}" in tags[].label`)
    ?.join(" || ");
  const allSanityBlogByTagsQuery = groq`
  *[_type == "blog" && ${desiredTags}] 
`;

  const sortedGroqQuery =
    (queryTags?.length > 0 ? allSanityBlogByTagsQuery : allSanityBlogsQuery) +
    `| order(${groqSortString} ${order})`;

  const allBlogPages = await client.fetch(sortedGroqQuery);

  return allBlogPages;
}

export async function getAllBlogTags() {
  const allBlogTags = await client.fetch(allBlogTagsQuery);
  return allBlogTags;
}

export async function getSanityProduct(client: SanityClient, slug: string) {
  return await client.fetch(sanityProductQuery, { slug });
}

export async function getCalendarSettings() {
  return await client.fetch(calendarSettings);
}
