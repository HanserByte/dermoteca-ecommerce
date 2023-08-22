import { Box, useMediaQuery } from "@chakra-ui/react";
import { useStore } from "@/store";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import TypeA from "./Type/TypeA";
import TypeB from "./Type/TypeB";
import HeadTitle from "./HeadTitle";

interface ContainerProps {
  data: ICategorySelect;
}

const CategorySelect = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box
      mt="75px"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <HeadTitle data={data} isMobile={isMobile} />
      {data.formato_categorias === "a" && (
        <TypeA data={data} isMobile={isMobile} />
      )}
      {data.formato_categorias === "b" && (
        <TypeB data={data} isMobile={isMobile} />
      )}
    </Box>
  );
};

export default CategorySelect;
