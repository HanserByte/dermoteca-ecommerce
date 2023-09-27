import { useAllTags } from "@/hooks/products";
import {
  Button,
  Checkbox,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GoChevronDown } from "react-icons/go";
import customTheme from "./theme";

const TagSelector = () => {
  const allTagsData = useAllTags();
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);

  const handleCheckboxSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = encodeURIComponent(e.target.value);
    const queryTagsArray = queryTags
      ?.split(",")
      .filter((tag: string) => tag != "undefined");

    //  Add tag to query params
    if (!queryTagsArray?.includes(e.target.value)) {
      router.query.tags =
        queryTagsArray.length > 0
          ? [encodeURIComponent(queryTagsArray.join(",")), tag].join(",")
          : tag;
    } else {
      // Remove tag from query params
      router.query.tags = encodeURIComponent(
        queryTagsArray
          ?.filter((tagItem: string) => tagItem !== e.target.value)
          .join(",")
      );
    }

    router.push(router);
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          variant="ghost"
          _hover={{
            bg: "#E7D4C7",
          }}
        >
          Etiquetas <GoChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Grid templateColumns="repeat(2, 1fr)">
            {allTagsData?.data?.productTags?.edges?.map((tag: any) => {
              return (
                <Checkbox
                  colorScheme="green"
                  size="md"
                  value={tag.node}
                  onChange={handleCheckboxSelect}
                  key={tag.node}
                  isChecked={queryTags?.includes(tag.node)}
                  fontWeight={600}
                >
                  {tag.node}
                </Checkbox>
              );
            })}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default TagSelector;
