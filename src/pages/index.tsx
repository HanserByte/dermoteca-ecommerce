import BasicImageText from "@/components/BasicImageText";
import CategorySelect from "@/components/CategorySelect";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box maxW="1920px" m="0 auto" id="main-container">
      <NavBar />
      <Hero />
      <CategorySelect />
      <BasicImageText />
      <Footer />
    </Box>
  );
};

export default Home;
