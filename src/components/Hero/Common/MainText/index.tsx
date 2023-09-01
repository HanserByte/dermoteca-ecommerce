import { Text } from "@chakra-ui/react";

const MainText = (props: { title: string, color?: string }) => {
  const { title, color } = props;
  return (
    <Text
      color={color ? color : "white"}
      lineHeight="20px"
      textAlign="justify"
      height="100%"
      width="100%"
      fontSize="12.5px"
      fontWeight={500}
      pt="17px"
      textTransform="uppercase"
      letterSpacing="1.05px"
    >
      {title}
    </Text>
  );
};

export default MainText;
