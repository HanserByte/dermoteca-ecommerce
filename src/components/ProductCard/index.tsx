import React from "react";
import { AspectRatio, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/sanity.client";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  handle: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const queryClient = useQueryClient();

  const preFetchProductPage = (handle: string) => {
    const query = `*[_type == "product" && store.slug.current == "${handle}"][0]{
      ...,
      store {
        ...,
        variants[]->
      }
    }
    `;

    queryClient.prefetchQuery(["sanityProduct", handle], () =>
      client.fetch(query)
    );
    queryClient.prefetchQuery(["shopifyProduct", handle], () =>
      fetch(`/api/products/${handle}`).then((res) => res.json())
    );
  };

  return (
    <Link href={`/products/${props.handle}`} style={{ width: "100%" }}>
      <Flex direction="column">
        <AspectRatio
          ratio={1 / 1}
          onMouseEnter={() => preFetchProductPage(props.handle)}
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
