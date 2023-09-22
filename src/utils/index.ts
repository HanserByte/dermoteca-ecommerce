import { SORT_OPTIONS } from "./constants";

export const getOrderTag = (
  sortString: string | string[] | undefined,
  sortOrder: string | string[] | undefined
) => {
  return SORT_OPTIONS.find(
    (option) => option.value === `${sortString},${sortOrder}`
  );
};
