import { Box, useMediaQuery } from "@chakra-ui/react";
import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ContainerNav from "@/components/ContainerNav";
import { useNavbar, useStore } from "@/store";
import ComponentRenderer from "@/components/ComponentRenderer";
import { usePage } from "@/hooks/page";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const pageData = usePage(slug as string[]);

  return (
    <>
      {pageData?.isLoading && <Loading />}
      <Box
        maxW="2560px"
        m="0 auto"
        id="main-container"
        bg={pageData?.data?.colorFondoPagina}
      >
        {pageData?.data && <NavBar dataN={pageData?.data} />}
        {pageData?.data && (!pageData?.data?.isNavBarWhite || isMobile) && (
          <ContainerNav />
        )}
        {pageData?.data &&
          pageData?.data?.componentes?.map((componente: any) => (
            <ComponentRenderer
              key={componente._id}
              component={componente._type}
              data={componente}
            />
          ))}
        {pageData?.data && <Footer />}
      </Box>
    </>
  );
};

export default Page;
