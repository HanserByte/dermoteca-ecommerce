import React, { FormEvent, useEffect, useState } from "react";
import { CustomerAccessTokenCreateInput } from "@shopify/hydrogen-react/storefront-api-types";
import { useMobileView } from "@/hooks/responsive";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useCustomer, useCustomerAccessTokenCreate } from "@/hooks/account";
import { useRouter } from "next/router";
import ContainerDermo from "../Common/ContainerDermo";

interface IProps {
  data: {
    title: string;
  };
}

const Login = ({ data }: IProps) => {
  const router = useRouter();
  const customerAccessTokenMutation = useCustomerAccessTokenCreate();
  const accessToken =
    customerAccessTokenMutation?.data?.customerAccessToken?.accessToken;
  const customerData = useCustomer(accessToken);
  const toast = useToast();
  const [formData, setFormData] = useState<CustomerAccessTokenCreateInput>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showAlert = (title: string) => {
    toast({
      title: "Hubo un error.",
      description: title,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.email.length === 0) {
      showAlert("El campo email es requerido.");
    } else if (formData.password.length === 0) {
      showAlert("El campo contraseña es requerido.");
    } else {
      customerAccessTokenMutation?.mutate(formData);
    }
  };

  useEffect(() => {
    if (customerAccessTokenMutation?.data?.customerUserErrors?.length > 0) {
      showAlert("Usuario o contraseña incorrectos");
    }
  }, [customerAccessTokenMutation?.data]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("userAccessToken", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    customerData?.data && router.push("/cuenta");
  }, [customerData?.data]);

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box maxW="400px" mx="auto" py={190}>
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
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                border="1px solid #000"
                borderRadius="35px"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Contraseña"
                border="1px solid #000"
                borderRadius="35px"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <Stack direction="row" justifyContent="center">
              <Button
                _hover={{ opacity: 0.7 }}
                bg="#000"
                borderRadius="35px"
                border="1px solid black"
                type="submit"
              >
                <Text
                  textTransform="uppercase"
                  color="white"
                  fontWeight={400}
                  fontSize="13px"
                  ml="25px"
                  mr="25px"
                >
                  Iniciar sesion
                </Text>
              </Button>
              <Button
                as={Link}
                href="/cuenta/creacion-de-cuenta"
                _hover={{ opacity: 0.7 }}
                variant="outline"
                borderRadius="35px"
                border="1px solid black"
              >
                <Text
                  textTransform="uppercase"
                  fontWeight={400}
                  fontSize="13px"
                  ml="25px"
                  mr="25px"
                >
                  Crear una cuenta
                </Text>
              </Button>
            </Stack>

            <Button as={Link} href="/cuenta/recuperar" m="auto" variant="link">
              Recuperar contraseña
            </Button>
          </Stack>
        </form>
      </Box>
    </ContainerDermo>
  );
};

export default Login;
