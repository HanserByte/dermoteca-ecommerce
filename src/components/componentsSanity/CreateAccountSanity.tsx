import CreateAccount from "@/components/CreateAccount";
import { ICreateAccount } from "@/typesSanity/docs/createAccount";

interface IContactUsProps {
  data: ICreateAccount;
}

const CreateAccountSanity = ({ data }: IContactUsProps) => {
  return <CreateAccount data={data} />;
};

export default CreateAccountSanity;
