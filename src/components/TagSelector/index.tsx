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

const TagSelector = () => {
  const allTagsData = useAllTags();
  const router = useRouter();
  // @ts-ignore
  const queryTags = decodeURIComponent(router?.query?.tags);

  const handleCheckboxSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = encodeURIComponent(e.target.value);

    //  Add tag to query params
    if (!queryTags?.includes(e.target.value)) {
      router.query.tags = router.query.tags
        ? `${router.query.tags},${tag}`
        : `${tag}`;
      router.push(router);
    } else {
      // Remove tag from query params
      router.query.tags = router?.query?.tags?.replace(tag, "");
      router.query.tags?.[0] === "," &&
        (router.query.tags = router.query.tags?.slice(1));
      router.push(router);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
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
                  value={tag.node}
                  onChange={handleCheckboxSelect}
                  key={tag.node}
                  isChecked={queryTags?.includes(tag.node)}
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
