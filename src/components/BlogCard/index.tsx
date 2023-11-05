import React from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useStore } from "@/store";
import { usePrefetch } from "@/hooks/products";
import { IImg } from "@/typesSanity/docs/default";
import { sanityImage } from "@/lib/sanity.image";
import { formatDate } from "@/utils";

interface BlogCardProps {
  image: IImg;
  title: string;
  handle: string;
  createdAt: string;
}

const BlogCard = (props: BlogCardProps) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  const { prefetchProductPage } = usePrefetch();

  return (
    <Link href={`/blogs/${props.handle}`} style={{ width: "100%" }}>
      <Flex direction="column" position="relative">
        <AspectRatio
          ratio={isMobile ? 2 / 1 : 1 / 1}
          onMouseEnter={() => prefetchProductPage(props.handle)}
        >
          <Image
            objectPosition="top"
            src={sanityImage(props.image.asset._ref).url()}
            alt={props.title}
            w="500"
            height="500"
          />
        </AspectRatio>

        <Box position="absolute" bottom="0" p={4}>
          <Text color="white" fontSize="md">
            {formatDate(props?.createdAt)}
          </Text>
          <Text color="white" fontWeight={500} fontSize="xl">
            {props.title}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default BlogCard;
