import { client } from "@/lib/sanity.client";
import { useQuery } from "@tanstack/react-query";

export const usePage = (slug: string[]) => {
  const query = `
            *[_type == "pages" && slug.current == "${slug
              ?.join(",")
              ?.replace(",", "/")}"] {
              _id,
              title,
              isBlackNavBar,
              isNavBarWhite,
              colorFondoPagina,
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
                },
                'relatedArticles': relatedArticles[]-> {
                  ...
                }
              },
            }[0]
          `;

  const pageData = useQuery(["page", slug], () => client.fetch(query), {
    enabled: !!slug,
  });

  return pageData;
};

export const useHomePage = () => {
  const query = `
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

  const pageData = useQuery(["homePage"], () => client.fetch(query));

  return pageData;
};
