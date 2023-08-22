import BasicImage from "@/components/BasicImageText";

interface IProps {
  data: any;
}
const BasicImageSanity = ({ data }: IProps) => {
  return <BasicImage data={data} />;
};

export default BasicImageSanity;
