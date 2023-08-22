import { sanityImage } from "@/lib/sanity.image";
import { useStore } from "@/store";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

interface ContainerProps {
  data: any;
}

const BasicImageText = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Box position="relative" width="100%" mt="75px">
      <Image
        src={
          isMobile
            ? sanityImage(data?.img_mobile.asset._ref).url()
            : sanityImage(data?.img_web.asset._ref).url()
        }
        alt="Image text"
        width="100%"
        height={isMobile ? "550px" : ""}
        objectFit="cover"
      />
      <Box
        position="absolute"
        top="0"
        left={isMobile ? "5px" : "0"}
        width={isMobile ? "100%" : "50%"}
        maxHeight={isMobile ? "100%" : "50vh"}
        overflow="auto"
        p="4"
        pl={isMobile ? "" : "145px"}
        pr={isMobile ? "20px" : "95px"}
      >
        <Heading
          fontFamily="KobeBold"
          color="white"
          fontSize="60px"
          pt={isMobile ? "20px" : "60px"}
        >
          {data?.titulo}
        </Heading>
        <Text
          color={data?.color_texto.value}
          lineHeight="normal"
          textAlign="justify"
        >
          {data?.texto}
        </Text>
        <Box flex={100} pt="30px">
          <Button
            bg={data?.color_botton.value}
            border="1px solid #00AA4F"
            borderRadius="35px"
            width="200px"
          >
            <Text textTransform="uppercase" color="white" fontSize="14px">
              {data?.text_button}
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicImageText;
