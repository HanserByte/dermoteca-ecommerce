import React, { useEffect, useState } from "react";
import ContainerDermo from "../Common/ContainerDermo";
import {
  Box,
  Button,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCustomer } from "@/hooks/account";
import { useRouter } from "next/router";

interface IProps {
  data: {
    title: string;
  };
}

const AccountDetails = ({ data }: IProps) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("userAccessToken")
  );
  const customerData = useCustomer(accessToken as string);

  const handleLogout = () => {
    localStorage.removeItem("userAccessToken");
    setAccessToken("");
  };

  useEffect(() => {
    !accessToken && router.push("/cuenta/iniciar-sesion");
  }, [accessToken]);

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box maxW="400px" mx="auto" py={220}>
        <Flex flex={100}>
          <Text
            textTransform="uppercase"
            fontSize="22px"
            fontWeight="700"
            mb="5px"
          >
            {data.title}
          </Text>
        </Flex>

        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          alignItems="start"
          fontSize="16px"
          fontWeight="700"
          mb="5px"
          textAlign="start"
        >
          <HStack>
            <Text>Nombre: </Text>
            <Text fontWeight={400}>
              {customerData?.data?.customer?.firstName}
            </Text>
          </HStack>
          <HStack>
            <Text>Apellido: </Text>
            <Text fontWeight={400}>
              {customerData?.data?.customer?.lastName}
            </Text>
          </HStack>
          <HStack>
            <Text>Email: </Text>
            <Text fontWeight={400}>{customerData?.data?.customer?.email}</Text>
          </HStack>
        </VStack>

        <Button
          mt={8}
          alignSelf="end"
          _hover={{ opacity: 0.7 }}
          bg="#000"
          borderRadius="35px"
          border="1px solid black"
          mb="5px"
          onClick={handleLogout}
        >
          <Text
            textTransform="uppercase"
            color="white"
            fontWeight={400}
            fontSize="13px"
            ml="25px"
            mr="25px"
          >
            Cerrar sesion
          </Text>
        </Button>
      </Box>
    </ContainerDermo>
  );
};

export default AccountDetails;
