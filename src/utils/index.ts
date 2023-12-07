import { NextRouter } from "next/router";
import {
  ALL_PRODUCTS_SORT_OPTIONS,
  BLOGS_SORT_OPTIONS,
  COLLECTION_PRODUCTS_SORT_OPTIONS,
} from "./constants";

export const getCollectionOrderTag = (
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

export const getBlogOrderTag = (
  sortString: string | string[] | undefined,
  sortOrder: string | string[] | undefined
) => {
  const SORT_OPTIONS = BLOGS_SORT_OPTIONS;

  return SORT_OPTIONS.find(
    (option) => option.value === `${sortString},${sortOrder}`
  );
};

export const formatDate = (inputDateString: string) => {
  // Step 1: Parse the input date string
  const inputDate = new Date(inputDateString);

  // Step 2: Create a new date in the desired format
  const year = inputDate.getUTCFullYear();
  const month = inputDate.toLocaleString("es-ES", { month: "long" });
  const day = inputDate.getUTCDate();

  // Step 3: Format the new date as "Month Day, Year"
  const formattedDate = `${month} ${day}, ${year}`;

  const formattedDateWithUppercase = formattedDate.replace(
    formattedDate.charAt(0),
    formattedDate.charAt(0).toUpperCase()
  );

  return formattedDateWithUppercase; // Output: "October 12, 2023"
};

export const getFulfillmentStatus = (status: string) => {
  const statusMap = {
    FULFILLED: "Entregado",
    IN_PROGRESS: "En progreso",
    ON_HOLD: "En pausa",
    PARTIALLY_FULFILLED: "Parcialmente entregado",
    PENDING_FULFILLMENT: "Pendiente de entrega",
    SCHEDULED: "Agendado",
    UNFULFILLED: "Sin entregar",
  };

  return statusMap[status];
};

export const handleRemoveTag = (
  tag: string,
  queryTagsArray: string[],
  router: NextRouter
) => {
  // Remove tag from query params
  router.query.tags = encodeURIComponent(
    queryTagsArray?.filter((tagItem: string) => tagItem !== tag).join(",")
  );
  router.push(router, undefined, { shallow: true });
};

export const removeQueryParam = (param: string, router: NextRouter) => {
  const { pathname, query } = router;
  const params = new URLSearchParams(query);
  params.delete(param);
  router.replace({ pathname, query: params.toString() }, undefined, {
    shallow: true,
  });
};

export const generateFormattedOutput = (dateString, timeString) => {
  // Parse the input date
  const inputDate = new Date(dateString);

  // Extract year, month, and day from the input date
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = inputDate.getDate().toString().padStart(2, "0");

  // Extract hours and minutes from the input time
  const [startHour, startMinute] = timeString
    .split("-")[0]
    .trim()
    .split(":")
    .map(Number);

  // Calculate the end time (30 minutes later)
  const endHour = startHour;
  const endMinute = startMinute + 30;

  // Format the output date and time strings
  const formattedStartDate = `${year}-${month}-${day}T${startHour
    .toString()
    .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}:00-07:00`;
  const formattedEndDate = `${year}-${month}-${day}T${endHour
    .toString()
    .padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}:00-07:00`;

  // Output the formatted result

  // Output the formatted result
  const output = [
    { key: "start", value: formattedStartDate },
    { key: "end", value: formattedEndDate },
  ];

  return output;
};
