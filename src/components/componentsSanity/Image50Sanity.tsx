import BasicImage50 from "@/components/BasicImage50";
import { IImage50 } from "@/typesSanity/docs/image50";

interface IBasicImageText50Props {
  data: IImage50;
}

const Image50Sanity = ({ data }: IBasicImageText50Props) => {
  return <BasicImage50 data={data} />;
};

export default Image50Sanity;
