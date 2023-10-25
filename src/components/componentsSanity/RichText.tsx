import { PortableTextBlockComponent } from "@portabletext/react";
import React from "react";
import PortableText from "../PortableText";
import { Box } from "@chakra-ui/react";
import { useMobileView } from "@/hooks/responsive";
import ContainerDermo from "../Common/ContainerDermo";

interface IRichTextProps {
  data: {
    content: PortableTextBlockComponent;
  };
}

const RichText = ({ data }: IRichTextProps) => {
  const { isMobile } = useMobileView();

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box maxW="800px" mx="auto" py={isMobile ? 20 : 40}>
        <PortableText blocks={data?.content} />
      </Box>
    </ContainerDermo>
  );
};

export default RichText;
