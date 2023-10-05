import React from "react";
import { AspectRatio, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useStore } from "@/store";
import { usePrefetch } from "@/hooks/products";

interface ProductCardProps {
  imageSrc: string | undefined;
  title: string;
  price: number;
  handle: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const { prefetchProductPage } = usePrefetch();

  return (
    <Link href={`/productos/${props.handle}`} style={{ width: "100%" }}>
      <Flex direction="column">
        <AspectRatio
          ratio={1 / 1}
          onMouseEnter={() => prefetchProductPage(props.handle)}
        >
          {/* TODO: change img to next Image component when rendering final product image */}
          <img src={props.imageSrc} alt={props.title} />
        </AspectRatio>
        <Text fontSize={isMobile ? "md" : "lg"} pt="6px">
          {props.title}
        </Text>
        <Text fontSize={isMobile ? "lg" : "xl"} fontWeight={700}>
          ${props.price}
        </Text>
      </Flex>
    </Link>
  );
};

export default ProductCard;
