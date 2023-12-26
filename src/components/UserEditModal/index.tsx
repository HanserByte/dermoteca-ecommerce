import {
  useAdminCustomer,
  useCustomer,
  useUpdateCustomerMutation,
} from "@/hooks/account";
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
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const UserEditModal = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("userAccessToken")
  );
  const updateCustomerMutation = useUpdateCustomerMutation();
  const queryClient = useQueryClient();
  const customerData = useCustomer(accessToken as string);
  const adminCustomerData = useAdminCustomer(
    customerData?.data?.customer?.id as string
  );

  // Initialize state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    day: null,
    month: null,
    year: null,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile } = useMobileView();
  const toast = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    updateCustomerMutation.mutate({
      customer: { id: customerData?.data?.customer?.id, ...formData },
    });
  };
  useEffect(() => {
    if (adminCustomerData?.data) {
      setFormData({
        firstName: adminCustomerData.data.firstName || "",
        lastName: adminCustomerData.data.lastName || "",
        email: adminCustomerData.data.email || "",
        day: adminCustomerData?.data?.day || null,
        month: adminCustomerData?.data?.month || null,
        year: adminCustomerData?.data?.year || null,
      });
    }
  }, [adminCustomerData?.data]);

  useEffect(() => {
    if (updateCustomerMutation?.data?.customerUserErrors?.length > 0) {
      toast({
        title: "Hubo un error.",
        description:
          updateCustomerMutation?.data?.customerUserErrors[0].message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (
      !updateCustomerMutation?.isLoading &&
      !updateCustomerMutation?.isIdle
    ) {
      queryClient.refetchQueries(["adminCustomer"]);
      queryClient.refetchQueries(["customer"]);
      onClose();
      toast({
        title: "Actualizacion exitosa",
        description: "Tu informacion ha sido actualizado con exito",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [updateCustomerMutation?.data]);

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
                  <FormLabel>Cumpleaños</FormLabel>
                  <Flex gap="4">
                    <Input
                      type="number"
                      name="day"
                      value={formData.day}
                      onChange={handleInputChange}
                      placeholder="Dia - 30"
                      max={31}
                      min={1}
                    />
                    <Input
                      type="number"
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      placeholder="Mes - 12"
                      max={12}
                      min={1}
                    />
                    <Input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="Año - 1999"
                    />
                  </Flex>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Box>
                <Button
                  isLoading={updateCustomerMutation?.isLoading}
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
