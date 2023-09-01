import BasicImageText60 from "@/components/BasicImageText60";
import { IBasicImage } from "@/typesSanity/docs/basicImage60";

interface IBasicImageText50Props {
  data: IBasicImage;
}

const BasicImageText60Sanity = ({ data }: IBasicImageText50Props) => {
  return <BasicImageText60 data={data} />;
};

export default BasicImageText60Sanity;
