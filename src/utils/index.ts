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
