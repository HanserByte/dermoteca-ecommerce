import ContactUs from "@/components/ContactUs";
import { IContacUs } from "@/typesSanity/docs/contactUs";

interface IContactUsProps {
  data: IContacUs;
}

const ContactUsSanity = ({ data }: IContactUsProps) => {
  return <ContactUs data={data} />;
};

export default ContactUsSanity;
