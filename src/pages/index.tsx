import { client } from "@/lib/sanity.client";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CategorySelect from "@/components/CategorySelect";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const Home = () => {
  const [data, setData] = useState<any>();
  const query = `
    *[_type == "homeDoc"] {
      _id,
      title,
      "slug": slug.current,
      componentes[]-> {
        ...
      }
    }[0]
  `;

  useEffect(() => {
    async function fetchData() {
      const dataHome = await client.fetch(query);
      setData(dataHome);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar />
      {/* <Hero />
      <CategorySelect />
      <BasicImageText /> */}
      {data &&
        data.componentes.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      <Footer />
    </Box>
  );
};

const ComponentRenderer = ({
  component,
  data,
}: {
  component: string;
  data: any;
}) => {
  const Component =
    require(`../components/componentsSanity/${component}`).default;
  return <Component data={data} />;
};

export default Home;
