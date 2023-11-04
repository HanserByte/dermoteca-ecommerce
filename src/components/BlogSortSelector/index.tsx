import { usePrefetchOrderedBlogs } from "@/hooks/sanity";
import { getBlogOrderTag } from "@/utils";
import { BLOGS_SORT_OPTIONS, COLORS } from "@/utils/constants";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const BlogSortSelector = () => {
  const router = useRouter();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const activeOrder = getBlogOrderTag(
    router?.query?.sort,
    router?.query?.order
  );
  const SORT_OPTIONS = BLOGS_SORT_OPTIONS;

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Button p="0px" bg="transparent" _hover={{ bg: "transparent" }}>
          Ordenar <GoChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="min-content">
        <PopoverArrow />
        <PopoverBody>
          <VStack w="min-content" align="start">
            {SORT_OPTIONS.map((option) => (
              <ButtonSort
                key={option.name}
                activeOrder={activeOrder}
                option={option}
                onClose={onClose}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BlogSortSelector;

const ButtonSort = ({ activeOrder, option, onClose }: IButtonSort) => {
  const [prefetchDone, setPrefetchDone] = useState(false);
  const router = useRouter();
  const { prefetchOrderedBlogs } = usePrefetchOrderedBlogs();

  const handleOrderChange = (e: MouseEvent) => {
    // Add query params and remove them if sort is inactive
    // @ts-ignore
    const targetValue = e.target?.value;
    if (targetValue.length > 1) {
      router.query.sort = targetValue.split(",")?.[0];
      router.query.order = targetValue.split(",")?.[1];
      router.push(router, undefined, { shallow: true });
    } else {
      router.replace("/blogs", undefined, { shallow: true });
    }
    onClose();
  };

  const handlePrefetch = (e: MouseEvent) => {
    if (!prefetchDone) {
      const targetValue = e.target?.value;
      prefetchOrderedBlogs(
        targetValue.split(",")?.[0],
        targetValue.split(",")?.[1]
      );
      setPrefetchDone(true);
    }
  };

  return (
    <Button
      bg={activeOrder?.name === option.name ? COLORS.GREEN : "transparent"}
      onClick={handleOrderChange}
      onMouseEnter={handlePrefetch}
      variant="ghost"
      color={activeOrder?.name === option.name ? "white" : "black"}
      _hover={{
        bg: COLORS.GREEN,
        color: "white",
      }}
      value={option.value}
      key={option.name}
    >
      {option.name}
    </Button>
  );
};

interface IButtonSort {
  activeOrder:
    | {
        name: string;
        value: string;
      }
    | undefined;
  option: {
    name: string;
    value: string;
  };
  onClose: () => void;
}
