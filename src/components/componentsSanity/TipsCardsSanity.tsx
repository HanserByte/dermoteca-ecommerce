import TipsCards from "@/components/TipsCards";
import { IRecommendedProducts } from "@/typesSanity/docs/recommendedProducts";

interface ITipsCardsS {
  data: any;
}

const TipsCardsSanity = ({ data }: ITipsCardsS) => {
  return <TipsCards data={data} />;
};

export default TipsCardsSanity;
