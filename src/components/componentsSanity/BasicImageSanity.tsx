import BasicImage from "@/components/BasicImageText";
import { IBasicImageText } from "@/typesSanity/docs/basicImage";

interface IProps {
  data: IBasicImageText;
}
const BasicImageSanity = ({ data }: IProps) => {
  return <BasicImage data={data} />;
};

export default BasicImageSanity;
