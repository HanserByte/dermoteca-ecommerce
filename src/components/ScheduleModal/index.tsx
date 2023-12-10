import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Datepicker from "../Datepicker";
import { COLORS } from "@/utils/constants";
import { useCustomer } from "@/hooks/account";
import { generateFormattedOutput, getTimeRange } from "@/utils";
import { useCalendar } from "@/hooks/calendar";

export default function ScheduleModal({
  isOpen,
  onClose,
  handleAddToCart,
}: any) {
  const [dateSelected, setDateSelected] = useState<Date>();
  const [timeSelected, setTimeSelected] = useState("");
  const [showUserInfoScreen, setShowUserInfoScreen] = useState(false);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  const customerData = useCustomer(accessToken as string);
  const [email, setEmail] = useState();
  const calendarData = useCalendar<Date>(dateSelected);

  console.log(calendarData?.data);

  const handleInputChange = (e) => setEmail(e.target.value);

  const validateDateSelection = () => {
    if (!dateSelected) return;
    setShowUserInfoScreen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attributes = [
      {
        key: "attendee",
        value: customerData?.data?.customer?.email || email,
      },
      ...generateFormattedOutput(dateSelected, timeSelected),
    ];

    handleAddToCart(attributes);
  };

  return (
    <>
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agendar una cita</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {showUserInfoScreen && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Nombre completo</FormLabel>
                    <Input
                      placeholder="Nombre completo"
                      value={customerData?.data?.customer?.displayName}
                    />
                  </FormControl>

                  <FormControl mt="2" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={customerData?.data?.customer?.email || email}
                      type="email"
                      onChange={handleInputChange}
                    />
                    <FormHelperText>
                      Correo al que enviaremos una confirmacion de la cita
                    </FormHelperText>
                  </FormControl>
                </>
              )}

              {!showUserInfoScreen && (
                <Flex w="full">
                  <Datepicker
                    selected={dateSelected}
                    setSelected={setDateSelected}
                  />
                  <Flex flexDirection="column" w="full">
                    <List display="flex" flexDirection="column" gap="2">
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          bg={COLORS.GREEN}
                          color="white"
                          _hover={{ bg: COLORS.GREEN }}
                          w="full"
                        >
                          9:00 - 9:30
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          w="full"
                        >
                          9:30 - 10:00
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          w="full"
                        >
                          10:00 - 10:30
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          w="full"
                        >
                          11:00 - 11:30
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          w="full"
                        >
                          12:00 - 12:30
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          onClick={() => setTimeSelected("9:00 - 9:30")}
                          w="full"
                        >
                          13:00 - 13:30
                        </Button>
                      </ListItem>
                    </List>
                  </Flex>
                </Flex>
              )}
            </ModalBody>
            <ModalFooter>
              {!showUserInfoScreen && (
                <Button
                  bg={COLORS.GREEN}
                  color="white"
                  _hover={{ bg: COLORS.GREEN, opacity: 0.7 }}
                  onClick={() => validateDateSelection()}
                >
                  Seleccionar cita
                </Button>
              )}

              {showUserInfoScreen && (
                <Flex w="full" justifyContent="space-between">
                  <Button onClick={() => setShowUserInfoScreen(false)}>
                    Volver
                  </Button>
                  <Button
                    bg={COLORS.GREEN}
                    color="white"
                    _hover={{ bg: COLORS.GREEN, opacity: 0.7 }}
                    type="submit"
                  >
                    Agregar cita al carrito
                  </Button>
                </Flex>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
