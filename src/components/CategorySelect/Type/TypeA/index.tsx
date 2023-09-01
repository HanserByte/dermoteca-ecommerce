import { SimpleGrid } from "@chakra-ui/react";
import { ICategory } from "../../Interface";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";

import Category from "../../Common/Category";

interface ContainerProps {
  data: ICategorySelect;
  isMobile: boolean;
  isOnlyOne?: boolean;
}

const TypeA = (props: ContainerProps) => {
  const { data, isMobile, isOnlyOne } = props;

  const getGrid = () => {
    if (isMobile && isOnlyOne) {
      return "repeat(auto-fit, minmax(200px, 1fr))";
    } else if (isMobile && !isOnlyOne) {
      return "repeat(2, 1fr)";
    } else {
      return "repeat(4, 1fr)";
    }
  };

  return (
    <SimpleGrid spacing={3} templateColumns={getGrid()}>
      {data.categorias.map((item: ICategory, index: number) => {
        return (
          <Category
            titulo_imagen={item.titulo_imagen}
            subtitulo_imagen={item.subtitulo_imagen}
            img_fondo={item.img_fondo}
            isMobile={isMobile}
            type={data.formato_categorias}
            key={index}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default TypeA;
