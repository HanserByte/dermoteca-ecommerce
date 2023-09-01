import { useStore } from "@/store";
import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
  pl?: string;
  pr?: string;
  pt?: string;
  pb?: string;
}

const ContainerDermo: React.FC<MyComponentProps> = ({
  children,
  pl,
  pr,
  pt,
  pb,
}) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box
      mt={pt ? pt : "75px"}
      pl={isMobile ? "20px" : pl ? pl : "145px"}
      pr={isMobile ? "20px" : pr ? pr : "145px"}
      mb={pb ? pb : "0px"}
    >
      {children}
    </Box>
  );
};

export default ContainerDermo;
