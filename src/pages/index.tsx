import BasicImageText from "@/components/BasicImageText";
import CategorySelect from "@/components/CategorySelect";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <CategorySelect />
      <BasicImageText />
      <Footer />
    </>
  );
};

export default Home;
