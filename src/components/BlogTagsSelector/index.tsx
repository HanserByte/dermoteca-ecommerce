import { useAllSanityBlogTags } from "@/hooks/sanity";
import { COLORS } from "@/utils/constants";
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

const BlogTagsSelector = () => {
  const allSanityBlogTags = useAllSanityBlogTags();
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);

  const handleCheckboxSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

    router.push(router, undefined, { shallow: true });
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          variant="ghost"
          _hover={{
            bg: COLORS.GREEN,
            color: "white",
          }}
        >
          Etiquetas <GoChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Grid templateColumns="repeat(2, 1fr)">
            {allSanityBlogTags?.data?.alltags?.map(
              (tag: string, idx: number) => {
                return (
                  <Checkbox
                    colorScheme="green"
                    size="md"
                    value={tag}
                    onChange={handleCheckboxSelect}
                    key={idx}
                    isChecked={queryTags?.includes(tag)}
                    fontWeight={600}
                  >
                    {tag}
                  </Checkbox>
                );
              }
            )}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default BlogTagsSelector;
