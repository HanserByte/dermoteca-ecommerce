import React from "react";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  handle: string;
}

const ProductCard = (props: ProductCardProps) => {
  return (
    <Link href={`/products/${props.handle}`}>
      <Flex direction="column">
        <AspectRatio ratio={1 / 1}>
          {/* TODO: change img to next Image component when rendering final product image */}
          <img src={props.imageSrc} alt={props.title} />
        </AspectRatio>
        <Text pt="6px">{props.title}</Text>
        <Text fontWeight={700} fontSize="xl">
          ${props.price}
        </Text>
      </Flex>
    </Link>
  );
};

export default ProductCard;
