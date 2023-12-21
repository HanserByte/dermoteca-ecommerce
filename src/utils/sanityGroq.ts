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

export const homePageQuery = groq`
 *[_type == "homeDoc"] {
      _id,
      title,
      "slug": slug.current,
      componentes[]-> {
        ...,
        'linkDetail': link{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_uno': link_uno{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_dos': link_dos{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_url_uno': link_url_uno{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_url_dos': link_url_dos{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'tips': tips[]-> {
          ...
        }
      }
    }[0]
`;
