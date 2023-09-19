import { Box, useMediaQuery } from "@chakra-ui/react";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ContainerNav from "@/components/ContainerNav";
import { useStore } from "@/store";
import ComponentRenderer from "@/components/ComponentRenderer";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  useEffect(() => {
    async function fetchData() {
      if (slug != undefined && slug != "") {
        const query = `
            *[_type == "pages" && slug.current == "${slug}"] {
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
                }
              }
            }[0]
          `;
        const dataHome = await client.fetch(query);
        setData(dataHome);
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      maxW="2560px"
      m="0 auto"
      id="main-container"
      bg={data.colorFondoPagina}
    >
      {data && <NavBar dataN={data} />}
      {data && (!data.isNavBarWhite || isMobile) && <ContainerNav />}
      {data &&
        data.componentes.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      {data && <Footer />}
    </Box>
  );
};
