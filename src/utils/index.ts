import { ALL_PRODUCTS_SORT_OPTIONS } from "./constants";

export const getOrderTag = (
  sortString: string | string[] | undefined,
  sortOrder: string | string[] | undefined
) => {
  return ALL_PRODUCTS_SORT_OPTIONS.find(
    (option) => option.value === `${sortString},${sortOrder}`
  );
};
