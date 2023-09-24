import {
  ALL_PRODUCTS_SORT_OPTIONS,
  COLLECTION_PRODUCTS_SORT_OPTIONS,
} from "./constants";

export const getOrderTag = (
  sortString: string | string[] | undefined,
  sortOrder: string | string[] | undefined,
  useCollectionSortOptions: boolean = false
) => {
  const SORT_OPTIONS = !useCollectionSortOptions
    ? ALL_PRODUCTS_SORT_OPTIONS
    : COLLECTION_PRODUCTS_SORT_OPTIONS;

  return SORT_OPTIONS.find(
    (option) => option.value === `${sortString},${sortOrder}`
  );
};
