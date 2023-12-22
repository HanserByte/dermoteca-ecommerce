import { sanityImage } from "@/lib/sanity.image";
import { useStore } from "@/store";
import { IBasicImageText } from "@/typesSanity/docs/basicImage";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface ContainerProps {
  data: IBasicImageText;
}

const BasicImageText = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const router = useRouter();

  return (
    <Box
      position="relative"
      width="100%"
      mt={data.isPaddingTop ? "37px" : "0px"}
      mb={data.isPaddingBottom ? "37px" : "0px"}
    >
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
        top="50%"
        transform="translateY(-50%)"
        left={isMobile ? "5px" : "0"}
        width={isMobile ? "" : "50%"}
        maxHeight={isMobile ? "100%" : "50vh"}
        overflow="auto"
        p="4"
        pl={isMobile ? "" : "145px"}
        pr={isMobile ? "20px" : "95px"}
      >
        <Heading
          fontFamily="KobeBold"
          color="white"
          fontSize="55px"
          pt={isMobile ? "20px" : "60px"}
          noOfLines={2}
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
            _hover={{ opacity: 0.7 }}
            as={Link}
            bg={data?.color_botton.value}
            border="1px solid #00AA4F"
            borderRadius="35px"
            width="200px"
            href={data?.linkDetail?.dataUrl?.url || data.link.alternateUrl}
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
