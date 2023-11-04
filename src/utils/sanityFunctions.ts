import { client } from "@/lib/sanity.client";
import {
  allBlogTagsQuery,
  allSanityBlogsQuery,
  blogsPageQuery,
  individualBlogPageQuery,
} from "./sanityGroq";
import { groq } from "next-sanity";

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

  console.log(sortedGroqQuery);

  const allBlogPages = await client.fetch(sortedGroqQuery);
  return allBlogPages;
}

export async function getAllBlogTags() {
  const allBlogTags = await client.fetch(allBlogTagsQuery);
  return allBlogTags;
}
