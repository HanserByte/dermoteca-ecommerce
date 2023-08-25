import RecommendedProducts from "@/components/RecommendedProducts";
import { IRecommendedProducts } from "@/typesSanity/docs/recommendedProducts";

interface IRecommendedProductsS {
  data: IRecommendedProducts;
}

const RecommendedProductsSanity = ({ data }: IRecommendedProductsS) => {
  return <RecommendedProducts data={data} />;
};

export default RecommendedProductsSanity;
