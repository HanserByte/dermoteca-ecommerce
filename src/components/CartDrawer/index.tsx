import { useCart } from "@/hooks/cart";
import { useCartDrawer } from "@/store";
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
import React from "react";
import CartProductCard from "../CartProductCard";
import { BaseCartLine } from "@shopify/hydrogen-react/storefront-api-types";

interface ICartDrawerProps {
  button?: React.ReactElement;
}

export default function CartDrawer({ button }: ICartDrawerProps) {
  const router = useRouter();
  const { open, setOpen } = useCartDrawer();
  const cartData = useCart();
  const btnRef = React.useRef();

  const handleCheckout = () => {
    console.log(cartData.data);
    cartData?.data?.checkoutUrl && router.push(cartData.data.checkoutUrl);
  };

  // Check if cart is empty
  const isCartEmpty =
    !cartData?.data?.lines?.nodes || cartData.data.lines.nodes.length === 0;
  const totalAmount = Number(cartData?.data?.cost?.subtotalAmount?.amount) || 0;

  return (
    <>
      {button &&
        React.cloneElement(button, {
          ref: btnRef,
          onClick: () => setOpen(!open),
          color: "black",
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
              {isCartEmpty ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  h="200px"
                  textAlign="center"
                >
                  <Text fontSize="lg" color="gray.500" mb={2}>
                    Tu carrito está vacío
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Agrega algunos productos para continuar
                  </Text>
                </Flex>
              ) : (
                cartData?.data?.lines?.nodes?.map((product: BaseCartLine) => (
                  <CartProductCard
                    key={product?.merchandise?.id}
                    product={product}
                  />
                ))
              )}
            </Flex>
          </DrawerBody>

          <DrawerFooter as={Flex} direction="column" gap="2">
            <Flex w="full" justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600" w="100%">
                Total:
              </Text>
              <Text fontSize="lg" fontWeight="600" w="100%" align="end">
                ${totalAmount.toFixed(2)}
              </Text>
            </Flex>
            <Button
              w="100%"
              onClick={handleCheckout}
              bg={isCartEmpty ? "gray.400" : "#00AA4F"}
              color="white"
              w="full"
              disabled={isCartEmpty}
              cursor={isCartEmpty ? "not-allowed" : "pointer"}
              _hover={{
                opacity: isCartEmpty ? 1 : 0.8,
                bg: isCartEmpty ? "gray.400" : "#00AA4F",
              }}
            >
              {isCartEmpty ? "Carrito vacío" : "Checkout"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
