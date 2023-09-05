import TipsCards from "@/components/TipsCards";
import { ITipsMenu } from "@/typesSanity/docs/tipsCards";

interface ITipsCardsS {
  data: ITipsMenu;
}

const TipsListSanity = ({ data }: ITipsCardsS) => {
  return <TipsCards data={data} isList />;
};

export default TipsListSanity;
