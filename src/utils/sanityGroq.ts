import { groq } from "next-sanity";

export const blogsPageQuery = groq`
  *[_type == "blogsPage"][0] {
    ...,
    components[] {}
  }
`;

export const allSanityBlogsQuery = groq`
  *[_type == "blog"]
`;

export const individualBlogPageQuery = groq`
  *[slug.current == $slug][0] {
    ...,
    componentes[]{
      ...,
      relatedArticles[]->,
      cita->
    }
  }
`;

export const allBlogTagsQuery = groq`
  {
    "alltags": array::unique(*[count(tags[]) > 0].tags[].label) 
  }
`;

export const sanityProductQuery = groq`
*[_type == "product" && store.slug.current == $slug][0]{
    ...,
    store {
      ...,
      variants[]->
    },
    componentes[]->
}
`;

export const calendarSettings = groq`
  *[_type == "calendarSettings"][0]
`;
