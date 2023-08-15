import { LogoShortCI } from "@/components/Icons";
import { ITitleRedirect } from "@/components/Interfaces";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  UnorderedList,
  useMediaQuery,
} from "@chakra-ui/react";
import "./index.scss";

const SampleLinks1 = [
  { title: "BITACORA" },
  { title: "AGENDAR CITA" },
  { title: "PEDIDOS" },
];

const SampleLinks2 = [
  { title: "CONTACTO" },
  { title: "FAQ" },
  { title: "AVISO DE PRIVACIDAD" },
];

const TitleRedirect = (props: ITitleRedirect) => {
  const { title } = props;
  return (
    <Text
      fontSize="13px"
      fontWeight={400}
      lineHeight="normal"
      color="white"
      cursor="pointer"
      pl="15px"
      pt="20px"
    >
      {title}
    </Text>
  );
};

const Form = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flex={2}>
      <Box textAlign="center">
        <Box mb="4px" textTransform="uppercase">
          <Text
            fontSize="13px"
            fontWeight={400}
            lineHeight="normal"
            color="white"
            pb="10px"
          >
            {" "}
            Suscríbete a nuestro newsletter
          </Text>
        </Box>
        <InputGroup
          size="md"
          borderRight="32px 0px 0px 32px"
          justifyContent="center"
        >
          <Input
            placeholder="Ingresa tu correo"
            borderWidth="2px"
            width="300px"
            borderRadius="md"
            pr="4.5rem"
            color="white"
            style={{ borderRadius: "32px 0px 0px 32px" }}
          />
          <InputRightAddon width="4.5rem" borderRadius="0px 32px 32px 0px">
            <Button h="100%" size="md" fontWeight={300} fontSize="12px">
              <Box mr="6px">ENVIAR</Box>
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </Flex>
  );
};

const Top = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile && (
        <>
          {" "}
          <Flex
            flex={100}
            bg="#000"
            justifyContent="center"
            pt="38px"
            borderBottom="1px solid #000"
          >
            <LogoShortCI />
          </Flex>
          <Flex flex={100} bg="#000" pt="30px" borderBottom="1px solid #000">
            <Form />
          </Flex>
          <Box bg="#000" color="white" borderBottom="1px solid #000">
            <Flex
              px={4}
              h="126px"
              alignItems="center"
              justifyContent="space-between"
              pt="20px"
              pb="20px"
              width="100%"
            >
              {/* Lado izquierdo */}
              <Flex flex={1}>
                <Box>
                  {SampleLinks1.map((item: { title: string; url?: string }) => {
                    return <TitleRedirect title={item.title} />;
                  })}
                </Box>
              </Flex>

              {/* Lado derecho */}
              <Flex
                alignItems="right"
                flex={1}
                justifyContent="flex-end"
                textAlign="right"
              >
                <UnorderedList>
                  {SampleLinks2.map((item: { title: string; url?: string }) => {
                    return <TitleRedirect title={item.title} />;
                  })}
                </UnorderedList>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
      {!isMobile && (
        <Box bg="#000" color="white">
          <Flex
            px={4}
            h="126px"
            alignItems="center"
            justifyContent="space-between"
            pt="20px"
            pb="20px"
            width="100%"
          >
            {/* Lado izquierdo */}
            <Flex flex={1} pl="10px">
              <Box>
                <HStack>
                  <LogoShortCI />
                  {SampleLinks1.map((item: { title: string; url?: string }) => {
                    return <TitleRedirect title={item.title} />;
                  })}
                </HStack>
              </Box>
            </Flex>

            {/* Centro */}
            <Form />

            {/* Lado derecho */}
            <Flex alignItems="center" flex={1} justifyContent="flex-end">
              {SampleLinks2.map((item: { title: string; url?: string }) => {
                return <TitleRedirect title={item.title} />;
              })}
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Top;
