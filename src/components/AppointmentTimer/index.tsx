import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { COLORS } from "@/utils/constants";
import { useCartActions } from "@/hooks/cart";
import { useSessionVariables } from "@/store";
import { useQueryClient } from "@tanstack/react-query";

const AppointmentTimer = ({ appointmentAvailableTime, product }) => {
  const [time, setTime] = useState("3:00");
  const { cartId } = useSessionVariables();
  const { removeFromCartMutation } = useCartActions();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (removeFromCartMutation?.isLoading) return;
    queryClient.refetchQueries(["cart", cartId]);
  }, [removeFromCartMutation?.isLoading]);

  function startTimer(endTime) {
    const startTime = Date.now();
    const remainingDuration = (endTime - startTime) / 1000;

    function updateTimer() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(0, remainingDuration * 1000 - elapsedTime); // Ensure the timer doesn't go negative

      const minutes = Math.floor(remainingTime / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      // Format the time as MM:SS
      const formattedTime = `${String(minutes)}:${String(seconds).padStart(
        2,
        "0"
      )}`;

      setTime(formattedTime);

      if (remainingTime > 0) {
        setTimeout(updateTimer, 1000); // Update the timer every second
      } else {
        removeFromCartMutation.mutate({ cartId, productId: product.id });
      }
    }

    updateTimer(); // Initial call to start the timer
  }

  useEffect(() => {
    // Start a timer for 5 minutes (300 seconds)
    startTimer(Number(appointmentAvailableTime.value));
  }, []);

  return (
    <Flex
      border="1px"
      borderColor={COLORS.GREEN}
      rounded="md"
      py="1"
      px="2"
      justifyContent="center"
      width="70px"
    >
      <Text fontWeight="bold">{time}</Text>
    </Flex>
  );
};

export default AppointmentTimer;
