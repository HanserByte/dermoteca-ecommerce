import { ITitleRedirect } from "@/components/Interfaces";
import { Button, Text } from "@chakra-ui/react";

const RenderOptions = (props: ITitleRedirect) => {
  const { title } = props;
  return (
    <Button variant="outline" borderRadius="35px" height="35px" width="113px">
      <Text
        textTransform="uppercase"
        fontWeight={400}
        color="white"
        fontSize="12px"
      >
        {title}
      </Text>
    </Button>
  );
};

export default RenderOptions
