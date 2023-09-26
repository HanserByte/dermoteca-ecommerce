import { useCartProducts } from "@/store";
import { COLORS } from "@/utils/constants";
import { Box } from "@chakra-ui/react";
import React from "react";

const CartBadge = () => {
  const { products } = useCartProducts();

  return (
    <>
      {products?.length > 0 && (
        <Box
          position="absolute"
          right="0"
          top="0"
          bg={COLORS.GREEN}
          rounded="3xl"
          w="18px"
          color="white"
          fontWeight={600}
        >
          {products?.length}
        </Box>
      )}
    </>
  );
};

export default CartBadge;
