import { useEffect, useState } from "react";
import { IDataFooter } from "@/typesSanity/docs/footer";
import { client } from "@/lib/sanity.client";

import Top from "./Top";
import Bottom from "./Bottom";
import { Box } from "@chakra-ui/react";

const Footer = () => {
  const query = `*[_type == "settings"]{
    'enlaces': footer.enlaces,
      'derechos': footer.derechos,
      'sobre_nosotros_apartado_1': footer.sobre_nosotros_apartado_1[]{
        ...,
        'dataUrl': *[_id == ^.url._ref]{
          'url': slug.current
        }[0]
      },
      'sobre_nosotros_apartado_2': footer.sobre_nosotros_apartado_2[]{
        ...,
        'dataUrl': *[_id == ^.url._ref]{
          'url': slug.current
        }[0]
      },
      'logo': footer.logo,
      'inputTexto': footer.inputTexto,
      'isPaddingTop': footer.isPaddingTop,
      'isPaddingBottom': footer.isPaddingBottom
  }`;
  const [data, setData] = useState<IDataFooter>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);

      setData(data[0]);
    }

    fetchData();
  }, [query]);

  return (
    <>
      {data && (
        <Box
          mt={data.isPaddingTop ? "37px" : ""}
          mb={data.isPaddingBottom ? "37px" : ""}
        >
          <Top data={data} />
          <Bottom data={data} />
        </Box>
      )}
    </>
  );
};

export default Footer;
