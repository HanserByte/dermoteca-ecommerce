import { useCart, useCartLegacy } from "@/hooks/cart";
import { useCartDrawer, useSessionVariables } from "@/store";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CartProductCard from "../CartProductCard";
import { BaseCartLine } from "@shopify/hydrogen-react/storefront-api-types";

interface ICartDrawerProps {
  button?: React.ReactElement;
}

export default function CartDrawer({ button }: ICartDrawerProps) {
  const router = useRouter();
  const { open, setOpen } = useCartDrawer();
  const cartData = useCart();
  const { checkoutUrl, cartId } = useCartLegacy();
  const btnRef = React.useRef();

  const handleCheckout = () => {
    checkoutUrl && router.push(checkoutUrl);
  };

  return (
    <>
      {button &&
        React.cloneElement(button, {
          ref: btnRef,
          onClick: () => setOpen(!open),
        })}
      <Drawer
        size="sm"
        isOpen={open}
        placement="right"
        onClose={() => setOpen(!open)}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu carrito</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap={4}>
              {cartData?.data?.lines?.nodes?.map((product: BaseCartLine) => (
                <CartProductCard
                  key={product?.merchandise?.id}
                  product={product}
                />
              ))}
            </Flex>
          </DrawerBody>

          <DrawerFooter as={Flex} direction="column" gap="2">
            <Flex w="full" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600" w="100%">
                Total:
              </Text>
              <Text fontSize="lg" fontWeight="600" w="100%" align="end">
                $
                {Number(cartData?.data?.cost?.subtotalAmount?.amount)?.toFixed(
                  2
                )}
              </Text>
            </Flex>
            <Button
              w="100%"
              onClick={handleCheckout}
              bg="#00AA4F"
              color="white"
              w="full"
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
