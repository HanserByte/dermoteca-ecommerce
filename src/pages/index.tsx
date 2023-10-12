import { Box } from "@chakra-ui/react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useHomePage } from "@/hooks/page";

const Home = () => {
  const pageData = useHomePage();

  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar dataN={{}} />

      {pageData?.data &&
        pageData?.data?.componentes.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      {pageData?.data && <Footer />}
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
