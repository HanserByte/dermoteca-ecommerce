import { Box } from "@chakra-ui/react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ComponentRenderer from "@/components/ComponentRenderer";
import { getHomePage } from "@/utils/sanityFunctions";

const Home = ({ pageData }: any) => {
  console.log(pageData, "pageData");
  return (
    <Box maxW="2560px" m="0 auto" id="main-container">
      <NavBar dataN={{}} />
      {pageData &&
        pageData?.componentes.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      {pageData && <Footer />}
    </Box>
  );
};

export default Home;

export const getStaticProps = async (cts: any) => {
  const pageData = await getHomePage();
  return {
    props: {
      pageData,
    },
  };
};
