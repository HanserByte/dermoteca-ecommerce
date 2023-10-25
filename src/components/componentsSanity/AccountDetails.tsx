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
import { useAdminCustomer, useCustomer } from "@/hooks/account";
import { useRouter } from "next/router";
import OrdersTable from "../OrdersTable";
import { useMobileView } from "@/hooks/responsive";

interface IProps {
  data: {
    title: string;
  };
}

const AccountDetails = ({ data }: IProps) => {
  const { isMobile } = useMobileView();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("userAccessToken")
  );
  const customerData = useCustomer(accessToken as string);
  const adminCustomerData = useAdminCustomer(
    customerData?.data?.customer?.id as string
  );

  const handleLogout = () => {
    localStorage.removeItem("userAccessToken");
    setAccessToken("");
  };

  useEffect(() => {
    !accessToken && router.push("/cuenta/iniciar-sesion");
  }, [accessToken]);

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box maxW="800px" mx="auto" h="calc(80vh)" py={40} my="auto">
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
          w="max-content"
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

        <Box mt="8">
          <Text
            textTransform="uppercase"
            fontSize="20px"
            fontWeight="700"
            mb="5px"
          >
            Historial de ordenes
          </Text>
          <OrdersTable orders={adminCustomerData?.data?.orders} />
        </Box>
      </Box>
    </ContainerDermo>
  );
};

export default AccountDetails;
