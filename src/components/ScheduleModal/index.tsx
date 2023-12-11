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
import {
  generateFormattedOutput,
  generateTimeSlots,
  getDayOfWeek,
  hasInterference,
} from "@/utils";
import { useCalendar, useCalendarSettings } from "@/hooks/calendar";

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
  const calendarData = useCalendar(dateSelected as Date);
  const calendarSettingsData = useCalendarSettings();

  const calendarSettingsObjKey = dateSelected
    ? `${getDayOfWeek(dateSelected).toLowerCase()}Times`
    : "";
  const appointmentduration = calendarSettingsData?.data?.appointmentDuration;
  const calendarStartTime =
    calendarSettingsData?.data?.[calendarSettingsObjKey]?.startTime;
  const calendarEndTime =
    calendarSettingsData?.data?.[calendarSettingsObjKey]?.endTime;

  const timeSlots = generateTimeSlots(
    appointmentduration,
    calendarStartTime,
    calendarEndTime
  );

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
                    <List
                      display="flex"
                      flexDirection="column"
                      gap="2"
                      maxH="400px"
                      overflowY="auto"
                    >
                      {timeSlots?.map((slot, idx) => {
                        const selected = slot === timeSelected;
                        return (
                          <ListItem key={idx}>
                            <Button
                              onClick={() => setTimeSelected(slot)}
                              bg={selected ? COLORS.GREEN : "white"}
                              color={selected ? "white" : COLORS.GREEN}
                              _hover={{ bg: COLORS.GREEN, color: "white" }}
                              w="full"
                            >
                              {slot}
                            </Button>
                          </ListItem>
                        );
                      })}
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
