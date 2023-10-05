import { useCart } from "@/hooks/cart";
import { COLORS } from "@/utils/constants";
import { Flex } from "@chakra-ui/react";
import React from "react";

const CartBadge = () => {
  const cartData = useCart();

  return (
    <>
      {cartData?.data?.totalQuantity > 0 && (
        <Flex
          alignItems="center"
          justifyContent="center"
          position="absolute"
          right="0"
          top="0"
          bg={COLORS.GREEN}
          rounded="3xl"
          w="18px"
          color="white"
          fontWeight={600}
        >
          {cartData?.data?.totalQuantity}
        </Flex>
      )}
    </>
  );
};

export default CartBadge;
