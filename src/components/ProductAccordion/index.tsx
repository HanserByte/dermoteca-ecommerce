import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";
import PortableText from "../PortableText";

interface IProductAccordionProps {
  accordions: {
    title: string;
    body: any;
    _key: string;
  }[];
}

const ProductAccordion = ({ accordions }: IProductAccordionProps) => {
  return (
    <Accordion>
      {accordions.map((accordionItem) => (
        <AccordionItem key={accordionItem._key}>
          <AccordionButton
            paddingLeft={0}
            paddingY={4}
            _hover={{ bg: "transparent" }}
          >
            <Box as="span" flex="1" textAlign="left" fontWeight={600}>
              {accordionItem.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} pl={0} pt={0}>
            <PortableText blocks={accordionItem.body} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProductAccordion;
