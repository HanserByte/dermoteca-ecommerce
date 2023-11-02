import { groq } from "next-sanity";

export const blogsPageQuery = groq`
  *[_type == "blogsPage"][0] {
    ...,
    components[]->
  }
`;

export const allSanityBlogsQuery = groq`
  *[_type == "blog"]
`;

export const individualBlogPageQuery = groq`
  *[slug.current == $slug]
`;
