import { Box, useMediaQuery } from "@chakra-ui/react";
import { useStore } from "@/store";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";

import HeadTitle from "./HeadTitle";

import TypeA from "./Type/TypeA";
import TypeB from "./Type/TypeB";
import TypeC from "./Type/TypeC";
import TypeD from "./Type/TypeD";

interface ContainerProps {
  data: ICategorySelect;
}

const CategorySelect = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [isMobileIpad] = useMediaQuery(`(max-width: 662px)`);

  return (
    <Box
      mt="75px"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      {data.text_button && <HeadTitle data={data} isMobile={isMobile} />}
      {data.formato_categorias === "a" && (
        <TypeA data={data} isMobile={isMobile} />
      )}
      {data.formato_categorias === "b" && (
        <>
          {isMobileIpad && <TypeA data={data} isMobile={isMobile} />}
          {!isMobileIpad && <TypeB data={data} isMobile={isMobile} />}
        </>
      )}
      {data.formato_categorias === "c" && (
        <TypeC data={data} isMobile={isMobile} />
      )}
      {data.formato_categorias === "d" && (
        <>
          {isMobileIpad && <TypeA data={data} isMobile={isMobile} />}
          {!isMobileIpad && <TypeD data={data} isMobile={isMobile} />}
        </>
      )}
    </Box>
  );
};

export default CategorySelect;
