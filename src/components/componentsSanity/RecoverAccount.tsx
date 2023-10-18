import React, { FormEvent, useState } from "react";
import ContainerDermo from "../Common/ContainerDermo";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRecoverAccount } from "@/hooks/account";

const RecoverAccount = ({ data }) => {
  const recoverAccountMutation = useRecoverAccount();
  const recoverEmailSent =
    recoverAccountMutation?.data?.customerRecover?.customerUserErrors.length ===
    0;
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    recoverAccountMutation?.mutate(formData.email);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ContainerDermo pt={"0px"} pb={"0px"}>
      <Box maxW="400px" mx="auto" py={260}>
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
                disabled={recoverEmailSent}
                placeholder="Email"
                border="1px solid #000"
                borderRadius="35px"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>

            {recoverEmailSent && (
              <Text
                textAlign="center"
                textTransform="uppercase"
                color="black"
                fontWeight={400}
                fontSize="13px"
                ml="25px"
                mr="25px"
              >
                Se ha mandado un correo a la direccion especificada para
                recuperar tu contraseña
              </Text>
            )}

            {!recoverEmailSent && (
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
                  Recuperar contraseña
                </Text>
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </ContainerDermo>
  );
};

export default RecoverAccount;
