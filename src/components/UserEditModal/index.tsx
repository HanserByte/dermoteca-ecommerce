import { useAdminCustomer, useCustomer } from "@/hooks/account";
import { useMobileView } from "@/hooks/responsive";
import { COLORS } from "@/utils/constants";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const UserEditModal = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("userAccessToken")
  );

  const customerData = useCustomer(accessToken as string);
  const adminCustomerData = useAdminCustomer(
    customerData?.data?.customer?.id as string
  );

  // Initialize state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile } = useMobileView();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (adminCustomerData?.data) {
      setFormData({
        firstName: adminCustomerData.data.firstName,
        lastName: adminCustomerData.data.lastName,
        email: adminCustomerData.data.email,
        phoneNumber: adminCustomerData.data.phoneNumber,
      });
    }
  }, [adminCustomerData?.data]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="link"
        aria-label="editar"
        _hover={{ opacity: 0.7 }}
      >
        <AiFillEdit size={20} color={COLORS.GREEN} />
      </IconButton>

      <Modal isOpen={isOpen} size={isMobile ? "full" : "lg"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar usuario</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {" "}
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Numero de telefono</FormLabel>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Box>
                <Button
                  _hover={{ opacity: 0.7 }}
                  type="submit"
                  bg={COLORS.GREEN}
                  color="white"
                  rounded="full"
                >
                  Guardar cambios
                </Button>
              </Box>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEditModal;
