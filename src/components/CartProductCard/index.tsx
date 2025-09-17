import { useCartActions } from "@/hooks/cart";
import { useCartDrawer, useSessionVariables, useStore } from "@/store";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { BaseCartLine } from "@shopify/hydrogen-react/storefront-api-types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import AppointmentTimer from "../AppointmentTimer/index";

import { formatCurrencyMXN, normalizeShopifyAmount } from "@/utils";

interface ICartProductCardProps {
  product: BaseCartLine;
}

const CartProductCard = ({ product }: ICartProductCardProps) => {
  const { setOpen } = useCartDrawer();
  const queryClient = useQueryClient();
  const { value } = useStore();
  const { removeFromCartMutation, updateCartProductMutation } =
    useCartActions();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const { cartId } = useSessionVariables();
  const isAppointment =
    product?.merchandise?.product?.productType?.toLowerCase() === "cita";
  const appointmentAvailableTime = product.attributes.find(
    (attribute) => attribute.key === "_available_time"
  );

  const handleRemoveFromCart = async () => {
    // @ts-ignore
    removeFromCartMutation.mutate({ cartId, productId: product.id });
  };

  const handleQuantityChange = async (quantity: number) => {
    // @ts-ignore
    updateCartProductMutation.mutate({
      cartId,
      productId: product.id,
      quantity,
    });
  };

  useEffect(() => {
    if (
      removeFromCartMutation?.isLoading ||
      updateCartProductMutation?.isLoading
    )
      return;
    queryClient.refetchQueries(["cart", cartId]);
  }, [removeFromCartMutation?.isLoading, updateCartProductMutation?.isLoading]);

  return (
    <Flex gap={2} alignItems="center">
      <Box
        onClick={() => setOpen(false)}
        as={Link}
        style={{
          pointerEvents: isAppointment ? "none" : "auto",
        }}
        href={`/productos/${product?.merchandise?.product?.handle}`}
        w={`${isMobile ? "25%" : "35%"}`}
      >
        <img
          src={product?.merchandise?.image.url}
          alt={product?.merchandise?.product?.title}
        />
      </Box>

      <Flex flexDirection="column" gap={isMobile ? 0 : 4} w="65%">
        <Text noOfLines={isMobile ? 1 : 2} fontSize="sm">
          {product?.merchandise?.product?.title}
          {product?.merchandise?.selectedOptions?.[0].value !==
            "Default Title" && (
            <Text as="span" display="block" fontWeight={600}>
              {" "}
              {product?.merchandise?.selectedOptions?.[0].value}
            </Text>
          )}
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          fontSize="sm"
          fontWeight={500}
          color="#00AA4F"
        >
          <span>
            {formatCurrencyMXN(
              normalizeShopifyAmount(product?.merchandise?.price?.amount),
              product?.merchandise?.price?.currencyCode || "MXN"
            )}
          </span>
          <Button
            onClick={handleRemoveFromCart}
            bg="#00AA4F"
            size="sm"
            color="white"
          >
            <TbTrash />
          </Button>
        </Flex>

        {isAppointment && (
          <AppointmentTimer
            product={product}
            appointmentAvailableTime={appointmentAvailableTime}
          />
        )}

        {!isAppointment && (
          <Flex alignItems="center" gap={3}>
            <Button
              onClick={() => handleQuantityChange(product?.quantity - 1)}
              bg="#00AA4F"
              size="sm"
              color="white"
              rounded="full"
            >
              -
            </Button>
            <Text>{product?.quantity}</Text>
            <Button
              onClick={() => handleQuantityChange(product?.quantity + 1)}
              bg="#00AA4F"
              size="sm"
              color="white"
              rounded="full"
            >
              +
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CartProductCard;
