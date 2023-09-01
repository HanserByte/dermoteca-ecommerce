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
import { useStore } from "@/store";
import { IDataFooter } from "@/typesSanity/docs/footer";
import { useEffect, useState } from "react";

const TitleRedirect = (props: ITitleRedirect) => {
  const { title, dataUrl } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <a href={(dataUrl && `/${dataUrl.url}`) || ""} rel="noopener noreferrer">
      <Text
        fontSize="13px"
        fontWeight={400}
        lineHeight="normal"
        color="white"
        cursor="pointer"
        pl={isMobile ? "" : "20px"}
        pt="20px"
        pr={isMobile ? "" : "20px"}
        whiteSpace="nowrap"
      >
        {title}
      </Text>
    </a>
  );
};

const Form = (props: any) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flex={2}
      pr={isMobile ? "" : "40px"}
      borderBottom="1px solid #000"
    >
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
            {data.inputTexto}
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

interface ContainerProps {
  data: IDataFooter;
}

const Top = (props: ContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const [linkOne, setLinkOne] = useState<
    { title: string; url?: string; dataUrl: any }[]
  >([]);
  const [linkTwo, setLinkTwo] = useState<
    { title: string; url?: string; dataUrl: any }[]
  >([]);

  useEffect(() => {
    if (
      data.sobre_nosotros_apartado_1 &&
      data.sobre_nosotros_apartado_1.length > 0
    ) {
      const result = data.sobre_nosotros_apartado_1.map((item: any) => {
        return { title: item.nombre, dataUrl: item.dataUrl };
      });
      setLinkOne(result);
    }
  }, []);

  useEffect(() => {
    if (
      data.sobre_nosotros_apartado_2 &&
      data.sobre_nosotros_apartado_2.length > 0
    ) {
      const result = data.sobre_nosotros_apartado_2.map((item: any) => {
        return { title: item.nombre, dataUrl: item.dataUrl };
      });
      setLinkTwo(result);
    }
  }, []);

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
            <Form data={data} />
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
                  {linkOne.map(
                    (
                      item: { title: string; url?: string; dataUrl: any },
                      index: number
                    ) => {
                      return (
                        <TitleRedirect
                          title={item.title}
                          key={index}
                          dataUrl={item.dataUrl}
                        />
                      );
                    }
                  )}
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
                  {linkTwo.map(
                    (
                      item: { title: string; url?: string; dataUrl: any },
                      index: number
                    ) => {
                      return (
                        <TitleRedirect
                          title={item.title}
                          key={index}
                          dataUrl={item.dataUrl}
                        />
                      );
                    }
                  )}
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
                  {linkOne.length > 0 &&
                    linkOne.map(
                      (
                        item: { title: string; url?: string; dataUrl: any },
                        index: number
                      ) => {
                        return (
                          <TitleRedirect
                            title={item.title}
                            key={index}
                            dataUrl={item.dataUrl}
                          />
                        );
                      }
                    )}
                </HStack>
              </Box>
            </Flex>

            {/* Centro */}
            <Form data={data} />

            {/* Lado derecho */}
            <Flex alignItems="center" flex={1} justifyContent="flex-end">
              {linkTwo.length > 0 &&
                linkTwo.map(
                  (
                    item: { title: string; url?: string; dataUrl: any },
                    index: number
                  ) => {
                    return (
                      <TitleRedirect
                        title={item.title}
                        key={index}
                        dataUrl={item.dataUrl}
                      />
                    );
                  }
                )}
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Top;
