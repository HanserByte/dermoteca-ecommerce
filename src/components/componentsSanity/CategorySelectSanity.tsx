import CategorySelect from "@/components/CategorySelect";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";

interface ICategorySelectProps {
  data: ICategorySelect;
}

const CategorySelectSanity = ({ data }: ICategorySelectProps) => {
  return <CategorySelect data={data} />;
};

export default CategorySelectSanity;
