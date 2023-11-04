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
import React, { MouseEvent } from "react";
import { GoChevronDown } from "react-icons/go";

const BlogSortSelector = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const router = useRouter();
  const activeOrder = getBlogOrderTag(
    router?.query?.sort,
    router?.query?.order
  );
  const SORT_OPTIONS = BLOGS_SORT_OPTIONS;

  const handleOrderChange = (e: MouseEvent) => {
    // Add query params and remove them if sort is inactive
    // @ts-ignore
    const targetValue = e.target?.value;
    if (targetValue.length > 1) {
      router.query.sort = targetValue.split(",")?.[0];
      router.query.order = targetValue.split(",")?.[1];
      router.push(router, undefined, { shallow: true });
    } else {
      router.replace("/collections", undefined, { shallow: true });
    }
    onClose();
  };

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
              <Button
                bg={
                  activeOrder?.name === option.name
                    ? COLORS.GREEN
                    : "transparent"
                }
                onClick={handleOrderChange}
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
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BlogSortSelector;
