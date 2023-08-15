import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { LogoShortCI, LogoTreatmentCI } from "../Icons";
import { ITitleRedirect } from "../Interfaces";

const SampleLinks1 = [{ title: "MI HISTORIAL" }];
const SampleLinks2 = [
  { title: "bitácora" },
  { title: "agendar cita" },
  { title: "pedidos" },
];
const bodyText = `cada piel cuenta una historia única y apasionante. Como un diario
que escribimos sin pensar, nuestra piel lleva consigo las huellas de
nuestras experiencias, desde los momentos más emotivos hasta las
aventuras más asombrosas. Cada marca, cada cicatriz y cada destello
de juventud cuentan una parte de quiénes somos y de los caminos que
hemos recorrido.`;

const MainText = (props: { title: string }) => {
  const { title } = props;
  return (
    <Text
      color="white"
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

const Hero = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Box position="relative" id="hero">
      <Image
        src="/img/HeroHome1.png"
        alt="Hero"
        pt={isMobile ? "81px" : ""}
        height={isMobile ? "900px" : ""}
        objectFit={"cover"}
        width="100%"
        objectPosition={isMobile ? "90% 50%" : ""}
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        width={isMobile ? "100%" : "56%"}
        maxHeight="60vh"
        overflow="auto"
        p="4"
        pl={isMobile ? "" : "145px"}
        mt={isMobile ? "101px" : "180px"}
        zIndex={99999}
      >
        <Box flex={100}>
          <Image src="/img/SampleHero.png" alt="Image Hero" />
        </Box>

        {!isMobile && <MainText title={bodyText} />}
      </Box>

      {isMobile && (
        <Box
          position="absolute"
          bottom="0"
          width="100%"
          p="4"
        >
          <Box pb="13px" pl="5px" pr="5px">
            <MainText title={bodyText} />
          </Box>
        </Box>
      )}

      {!isMobile && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          p="4"
          mb="20px"
        >
          <HStack>
            <Box ml="10px" />
            <LogoShortCI />
            <Box pb="13px">
              <Text
                fontSize="14px"
                fontWeight={500}
                lineHeight="normal"
                color="white"
                cursor="pointer"
                pl="10px"
                pt="20px"
                textTransform="uppercase"
                pb="4px"
              >
                mi historial
              </Text>
              <Box flex={100} pl="10px">
                <HStack>
                  {SampleLinks2.map((item: ITitleRedirect, index: number) => {
                    return <RenderOptions title={item.title} key={index} />;
                  })}
                </HStack>
              </Box>
            </Box>
            {/* CONTENT RIGHT */}
            <Box right={0} position="absolute" pr="30px">
              <HStack>
                <LogoTreatmentCI />
                <Box pb="13px">
                  <Text
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="normal"
                    color="white"
                    cursor="pointer"
                    pl="10px"
                    pt="20px"
                    textTransform="uppercase"
                    pb="4px"
                  >
                    nuestros tratamientos
                  </Text>
                  <Box flex={100} pl="10px">
                    <HStack>
                      {SampleLinks2.map((item: ITitleRedirect, index: number) => {
                        return <RenderOptions title={item.title} key={index} />;
                      })}
                    </HStack>
                  </Box>
                </Box>
              </HStack>
            </Box>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
