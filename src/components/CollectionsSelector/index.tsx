import { useAllCollections } from "@/hooks/collections";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GoChevronDown } from "react-icons/go";

const CollectionsSelector = () => {
  const allCollectionsData = useAllCollections();
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          variant="ghost"
          _hover={{
            bg: "#E7D4C7",
          }}
        >
          Collecciones <GoChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="min-content">
        <PopoverArrow />
        <PopoverBody>
          <VStack w="min-content" align="start">
            {allCollectionsData?.data?.collections?.nodes?.map(
              (collection: any) => {
                return (
                  <Button
                    _hover={{
                      bg: "#E7D4C7",
                    }}
                    fontSize="16px"
                    variant="ghost"
                    size="sm"
                    as={Link}
                    href={`/collections/${collection.handle}`}
                  >
                    {collection.title}
                  </Button>
                );
              }
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CollectionsSelector;
