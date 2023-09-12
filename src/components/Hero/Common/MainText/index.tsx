import { Text } from "@chakra-ui/react";

const MainText = (props: {
  title: string;
  color?: string;
  fontSize?: string;
  textAlign?: any;
}) => {
  const { title, color, fontSize, textAlign } = props;
  return (
    <Text
      color={color ? color : "white"}
      lineHeight="20px"
      textAlign={textAlign ? textAlign : "justify"}
      height="100%"
      width="100%"
      fontSize={fontSize ? fontSize : "12.5px"}
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
