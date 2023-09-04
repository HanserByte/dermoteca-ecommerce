import { useStore } from "@/store";
import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import { IBasicImage } from "@/typesSanity/docs/basicImage50";
import { useRouter } from "next/router";
import Banner from "./Banner";
import Description from "./Description";

interface ContainerProps {
  data: IBasicImage;
}

const BasicImageText50 = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const isBlackBg = data.colorFondo === "#000";
  const router = useRouter();

  const goLink = (
    type: "link_uno" | "link_dos" | "link_url_uno" | "link_url_dos"
  ) => {
    if (data[type]) {
      const url = data[type].dataUrl.url;
      router.push(`/${url}`);
    }
  };

  const renderComponent = () => {
    if (isMobile) {
      return (
        <>
          <Banner data={data} isBlackBg={isBlackBg} goLink={goLink} />
          <Description
            data={data}
            isMobile={isMobile}
            goLink={goLink}
            isBlackBg={isBlackBg}
          />
        </>
      );
    } else {
      return (
        <>
          <Description
            data={data}
            isMobile={isMobile}
            goLink={goLink}
            isBlackBg={isBlackBg}
          />
          <Banner data={data} isBlackBg={isBlackBg} goLink={goLink} />
        </>
      );
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      mt={data.isPaddingTop ? "37px" : ""}
      mb={data.isPaddingBottom ? "37px" : ""}
    >
      <Grid templateColumns={isMobile ? "1fr" : "60% 40%"}>
        {renderComponent()}
      </Grid>
    </Box>
  );
};

export default BasicImageText50;
