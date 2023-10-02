import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { ICreateAccount } from "@/typesSanity/docs/createAccount";
import ContainerDermo from "../Common/ContainerDermo";
import { useCreateAccount } from "@/hooks/account";

interface IProps {
  data: ICreateAccount;
}

const CreateAccount = (props: IProps) => {
  const createAccountMutation = useCreateAccount();
  const { data } = props;
  const toast = useToast();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
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

  const showSuccess = (title: string) => {
    toast({
      title: "Mensaje Enviado.",
      description: title,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName.length === 0) {
      showAlert("El campo nombre es requerido.");
    } else if (formData.lastName.length === 0) {
      showAlert("El campo apellido es requerido.");
    } else if (formData.email.length === 0) {
      showAlert("El campo correo es requerido.");
    } else if (formData.password.length === 0) {
      showAlert("El campo contraseña es requerido.");
    } else if (!formData.agreeToTerms) {
      showAlert("Debes aceptar los terminos y condiciones.");
    } else {
      createAccountMutation.mutate(formData);
      showSuccess("Tu cuenta fue creada con exito!");
    }
  };

  useEffect(() => {
    if (createAccountMutation?.data?.accessToken) {
      localStorage.setItem(
        "accessToken",
        createAccountMutation?.data?.accessToken
      );
    }
  }, [createAccountMutation?.data?.accessToken]);

  console.log(createAccountMutation?.data);

  return (
    <ContainerDermo
      pt={data.isPaddingTop ? "80px" : "0px"}
      pb={data.isPaddingBottom ? "37px" : "0px"}
    >
      <Box maxW="400px" mx="auto">
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
        <form>
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                border="1px solid #000"
                borderRadius="35px"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Apellido</FormLabel>
              <Input
                placeholder="Apellido"
                border="1px solid #000"
                borderRadius="35px"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
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
                placeholder="Contraseña"
                border="1px solid #000"
                borderRadius="35px"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="agreeToTerms">
              <Checkbox
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              >
                Estoy de acuerdo con los términos y condiciones
              </Checkbox>
            </FormControl>
            <Stack direction="row" justifyContent="center">
              <Button
                bg="#000"
                borderRadius="35px"
                border="1px solid black"
                mb="5px"
                onClick={handleSubmit}
              >
                <Text
                  textTransform="uppercase"
                  color="white"
                  fontWeight={400}
                  fontSize="13px"
                  ml="25px"
                  mr="25px"
                >
                  Crear Cuenta
                </Text>
              </Button>
              <Button
                variant="outline"
                borderRadius="35px"
                border="1px solid black"
                mb="5px"
              >
                <Text
                  textTransform="uppercase"
                  fontWeight={400}
                  fontSize="13px"
                  ml="25px"
                  mr="25px"
                >
                  Regresar
                </Text>
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </ContainerDermo>
  );
};

export default CreateAccount;
