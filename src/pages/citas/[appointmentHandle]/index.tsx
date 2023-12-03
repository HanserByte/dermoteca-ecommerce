import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { client } from "@/lib/sanity.client";
import { getSanityProduct } from "@/utils/sanityFunctions";
import { getShopifyProduct } from "@/utils/shopifyFunctions";
import { useMobileView } from "@/hooks/responsive";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useNavbar } from "@/store";

interface PageProps {
  sanityProduct: any;
  shopifyProduct: any;
}

export default function AppointmentPage({
  sanityProduct,
  shopifyProduct,
}: PageProps) {
  const { isMobile } = useMobileView();
  const { height } = useNavbar();

  console.log(sanityProduct, shopifyProduct);
  return (
    <Box maxW="2560px" m="0 auto">
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg="white" w="100%" />
      <Flex
        alignItems="center"
        pl={isMobile ? "20px" : "145px"}
        pr={isMobile ? "20px" : "145px"}
        py="2"
        h="max-content"
        bg="#E7D4C7"
        w="100%"
      >
        <BreadCrumbs
          pageTitle={sanityProduct.store?.title}
          pageCategory={{ handle: "citas", title: "Citas" }}
          mainPage="citas"
        />
      </Flex>
      <Footer />
    </Box>
  );
}

export const getStaticProps = async (cts: any) => {
  const appointmentSanityProduct = await getSanityProduct(
    client,
    "cita-general"
  );
  const appointmentShopifyProduct = await getShopifyProduct("cita-general");
  return {
    props: {
      sanityProduct: appointmentSanityProduct,
      shopifyProduct: appointmentShopifyProduct,
    },
  };
};

export const getStaticPaths = async () => {
  // TODO: Create a function that fetches all slugs that correspond to an appointment product
  return {
    paths: ["/citas/cita-general"],
    fallback: "blocking",
  };
};
