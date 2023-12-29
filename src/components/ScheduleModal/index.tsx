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
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Datepicker from "../Datepicker";
import { COLORS } from "@/utils/constants";
import { useCustomer } from "@/hooks/account";
import {
  generateFormattedOutput,
  generateTimeSlots,
  getDayOfWeek,
  getTimeRange,
} from "@/utils";
import { useCalendar, useCalendarSettings } from "@/hooks/calendar";
import Loading from "../Loading";
import { useMobileView } from "@/hooks/responsive";

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
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState();
  const calendarData = useCalendar(dateSelected as Date);
  const calendarSettingsData = useCalendarSettings();
  const { isMobile } = useMobileView();

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

  const usedTimeSlots = calendarData?.data?.dateData?.map((event) =>
    getTimeRange(event.start, event.end)
  );

  const filteredTimeSlots = timeSlots?.filter((timeSlot) => {
    const startHour = timeSlot.split("-")[0].split(":")[0];
    const startMinute = timeSlot.split("-")[0].split(":")[1];

    if (!usedTimeSlots) return true;

    return !usedTimeSlots?.some((usedTimeSlot) => {
      const usedStartHour = usedTimeSlot.split("-")[0].split(":")[0];
      const usedEndHour = usedTimeSlot.split("-")[1].split(":")[0];

      return (
        parseInt(startHour) >= parseInt(usedStartHour) &&
        parseInt(startHour) < parseInt(usedEndHour)
      );
    });
  });

  const handleInputChange = (e) => setEmail(e.target.value);

  const validateDateSelection = () => {
    if (!dateSelected) return;
    setShowUserInfoScreen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attributes = [
      {
        key: "_attendee",
        value: customerData?.data?.customer?.email || email,
      },
      ...generateFormattedOutput(
        dateSelected,
        timeSelected,
        appointmentduration
      ),
      {
        key: "_available_time",
        value: String(Date.now() + 1000 * 60 * 3),
      },
    ];

    handleAddToCart(attributes);
  };

  return (
    <>
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
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
                      value={
                        displayName || customerData?.data?.customer?.displayName
                      }
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt="2" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      disabled
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
                <Flex
                  w="full"
                  alignItems={isMobile ? "center" : "flex-start"}
                  flexDirection={isMobile ? "column" : "row"}
                >
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
                      {calendarData?.isLoading && calendarData?.isFetching && (
                        <Loading />
                      )}
                      {!calendarData?.isLoading &&
                        filteredTimeSlots?.map((slot, idx) => {
                          const selected = slot === timeSelected;
                          return (
                            <ListItem key={idx}>
                              <Button
                                onClick={() => setTimeSelected(slot)}
                                bg={selected ? COLORS.GREEN : "gray.100"}
                                color={selected ? "white" : COLORS.GREEN}
                                _hover={{ bg: COLORS.GREEN, color: "white" }}
                                w="full"
                              >
                                {slot}
                              </Button>
                            </ListItem>
                          );
                        })}

                      {filteredTimeSlots?.length === 0 && (
                        <Text
                          bg={COLORS.GREEN}
                          color="white"
                          fontWeight={500}
                          rounded="md"
                          textAlign="center"
                          py="2"
                        >
                          No hay citas disponibles para esta fecha 🥲
                        </Text>
                      )}
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
