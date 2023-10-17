import { useMobileView } from "@/hooks/responsive";
import { useNavbar } from "@/store";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ContainerDermo from "../Common/ContainerDermo";
import ProductAccordion from "../ProductAccordion";

const Accordion = ({ data }) => {
  const { height } = useNavbar();
  const { isMobile } = useMobileView();

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box mx="auto" py={190}>
        <Text
          textTransform="uppercase"
          fontSize="22px"
          fontWeight="700"
          mb="5px"
        >
          {data.accordionHeader}
        </Text>

        <ProductAccordion accordions={data.accordions} />
      </Box>
    </ContainerDermo>
  );
};

export default Accordion;
