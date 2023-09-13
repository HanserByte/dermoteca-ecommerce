import React from "react";
import { AspectRatio, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useStore } from "@/store";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  handle: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <Link href={`/products/${props.handle}`} style={{ width: "100%" }}>
      <Flex direction="column">
        <AspectRatio ratio={1 / 1}>
          {/* TODO: change img to next Image component when rendering final product image */}
          <img src={props.imageSrc} alt={props.title} />
        </AspectRatio>
        <Text fontSize={isMobile ? "sm" : "lg"} pt="6px">
          {props.title}
        </Text>
        <Text fontSize={isMobile ? "sm" : "xl"} fontWeight={700}>
          ${props.price}
        </Text>
      </Flex>
    </Link>
  );
};

export default ProductCard;
