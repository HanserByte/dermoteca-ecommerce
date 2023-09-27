import { useCart } from "@/hooks/cart";
import { useCartProducts, useStore } from "@/store";
import { ICartProductLine } from "@/typesSanity/shopify";
import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { TbTrash } from "react-icons/tb";

interface ICartProductCardProps {
  product: ICartProductLine;
}

const CartProductCard = ({ product }: ICartProductCardProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const { cartId, removeFromCart, updateProduct } = useCart();
  const { setProducts, setPrice } = useCartProducts();

  const handleRemoveFromCart = async () => {
    const response = await removeFromCart(cartId, product.id);
    setProducts(response?.data?.cartLinesRemove?.cart?.lines?.nodes);
    setPrice(
      response?.data?.cartLinesRemove?.cart?.cost?.subtotalAmount?.amount
    );
  };

  const handleQuantityChange = async (quantity: number) => {
    const response = await updateProduct(cartId, product.id, quantity);
    setProducts(response?.data?.cartLinesUpdate?.cart?.lines?.nodes);
    setPrice(
      response?.data?.cartLinesUpdate?.cart?.cost?.subtotalAmount?.amount
    );
  };

  return (
    <Flex gap={2} alignItems="center">
      <Box
        as={Link}
        href={`/products/${product?.merchandise?.product?.handle}`}
        w={`${isMobile ? "25%" : "35%"}`}
      >
        <img
          src={product?.merchandise?.product?.featuredImage?.url}
          alt={product?.merchandise?.product?.title}
        />
      </Box>

      <Flex flexDirection="column" gap={isMobile ? 0 : 4} w="65%">
        <Text noOfLines={isMobile ? 1 : 2} fontSize="sm">
          {product?.merchandise?.product?.title}
          <Text fontWeight={600}>
            {" "}
            {product?.merchandise?.selectedOptions?.[0].value}
          </Text>
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          fontSize="sm"
          fontWeight={500}
          color="#00AA4F"
        >
          <span>${product?.merchandise?.price?.amount}</span>
          <Button
            onClick={handleRemoveFromCart}
            bg="#00AA4F"
            size="sm"
            color="white"
          >
            <TbTrash />
          </Button>
        </Flex>

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
      </Flex>
    </Flex>
  );
};

export default CartProductCard;
