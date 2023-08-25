import { useStore } from "@/store";
import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const ContainerDermo: React.FC<MyComponentProps> = ({ children }) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box
      mt="75px"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      {children}
    </Box>
  );
};

export default ContainerDermo;
