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
import { useEffect, useState } from "react";

interface ContainerProps {
  data: IBasicImageText;
}

const BasicImageText = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  const [textButton, setTextButton] = useState("");

  useEffect(() => {
    if (data?.text_button) {
      setTextButton(data?.text_button);
    }
  }, [data?.text_button]);

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
        top={isMobile ? "24px" : "50%"}
        transform={isMobile ? "none" : "translateY(-50%)"}
        left={isMobile ? "0" : "0"}
        width={isMobile ? "100%" : "50%"}
        maxHeight={isMobile ? "100%" : "50vh"}
        overflow="auto"
        p="4"
        pl={isMobile ? "16px" : "145px"}
        pr={isMobile ? "20px" : "95px"}
      >
        <Heading
          fontFamily="KobeBold"
          color="white"
          fontSize="55px"
          pt={isMobile ? "0" : "60px"}
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
        {data?.needa_boton && (
          <Box flex={100} pt="30px">
            <Button
              _hover={{ opacity: 0.7 }}
              as={Link}
              bg={data?.color_botton.value}
              border="1px solid #00AA4F"
              borderRadius="35px"
              width="200px"
              href={data?.linkDetail.alternateUrl || ""}
            >
              <Text
                textTransform="uppercase"
                color={data?.color_texto_botton?.value || "white"}
                fontSize="14px"
              >
                {textButton}
              </Text>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BasicImageText;
