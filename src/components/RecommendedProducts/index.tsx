import { useMediaQuery } from "@chakra-ui/react";

import { useStore } from "@/store";
import { IRecommendedProducts } from "@/typesSanity/docs/recommendedProducts";

import ContainerDermo from "../Common/ContainerDermo";
import HeadTitle from "../CategorySelect/HeadTitle";
import GridProduct from "./GridProduct";
import SliderInstagram from "./SliderProduct";

interface IContainerProps {
  data: IRecommendedProducts;
}

const RecommendedProducts = (props: IContainerProps) => {
  const { data } = props;

  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <ContainerDermo>
      <HeadTitle data={data} isMobile={isMobile} />
      {!isMobile && <GridProduct data={data} />}
      {isMobile && <SliderInstagram data={data} />}
    </ContainerDermo>
  );
};

export default RecommendedProducts;
