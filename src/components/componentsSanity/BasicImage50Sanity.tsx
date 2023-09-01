import BasicImageText50 from "@/components/BasicImageText50";
import { IBasicImage } from "@/typesSanity/docs/basicImage50";

interface IBasicImageText50Props {
  data: IBasicImage;
}

const BasicImageText50Sanity = ({ data }: IBasicImageText50Props) => {
  return <BasicImageText50 data={data} />;
};

export default BasicImageText50Sanity;
