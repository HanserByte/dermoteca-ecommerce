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

export const handleRemoveVendor = (
  tag: string,
  queryTagsArray: string[],
  router: NextRouter
) => {
  // Remove vendor from query params
  router.query.vendors = encodeURIComponent(
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

export const generateFormattedOutput = (
  dateString,
  timeString,
  appointmentDuration
) => {
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
  let endHour = startHour;
  let endMinute = startMinute + appointmentDuration;

  // Adjust the end time if it exceeds 59 minutes
  if (endMinute >= 60) {
    endHour += Math.floor(endMinute / 60);
    endMinute %= 60;
  }

  // Format the output date and time strings
  const formattedStartDate = `${year}-${month}-${day}T${startHour
    .toString()
    .padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}:00-06:00`;
  const formattedEndDate = `${year}-${month}-${day}T${endHour
    .toString()
    .padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}:00-06:00`;

  // Output the formatted result
  const output = [
    { key: "_start", value: formattedStartDate },
    { key: "_end", value: formattedEndDate },
    { key: "Fecha", value: `${day}/${month}/${year}` },
    { key: "Horario", value: timeString },
  ];

  return output;
};

export function getTimeRange(inputA, inputB) {
  const dateTimeA = new Date(inputA?.dateTime);
  const dateTimeB = new Date(inputB?.dateTime);

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const timeStringA = dateTimeA.toLocaleTimeString("en-US", timeOptions);
  const timeStringB = dateTimeB.toLocaleTimeString("en-US", timeOptions);

  return `${timeStringA} - ${timeStringB}`;
}

export function generateTimeSlots(appointmentDuration, startTime, endTime) {
  if (!startTime || !endTime) return;
  const timeSlots = [];
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  let currentTime = new Date();
  currentTime.setHours(startHour);
  currentTime.setMinutes(startMinute);

  const endTimeObj = new Date();
  endTimeObj.setHours(endHour);
  endTimeObj.setMinutes(endMinute);

  while (currentTime < endTimeObj) {
    const timeStringA = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    currentTime.setMinutes(currentTime.getMinutes() + appointmentDuration);

    const timeStringB = currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const timeSlot = `${timeStringA} - ${timeStringB}`;
    timeSlots.push(timeSlot);
  }

  return timeSlots;
}

export function getDayOfWeek(date) {
  if (!date) return;
  const options = { weekday: "long" };
  const dayOfWeek = date.toLocaleDateString("en-US", options);
  return dayOfWeek;
}

export function formatMetafieldDate(date: string) {
  if (!date) return;
  // Parse the input date string
  const inputDate = new Date(date);

  // Get the time zone offset in minutes (positive for time zones behind UTC, negative for time zones ahead)
  const timeZoneOffset = -480; // For Pacific Standard Time (PST), which is UTC-8

  // Apply the time zone offset to the Date object
  inputDate.setMinutes(inputDate.getMinutes() - timeZoneOffset);

  // Define the options for formatting
  const options = { day: "numeric", month: "long" };

  // Format the date in the desired output format
  const outputDateStr = new Intl.DateTimeFormat("es-ES", options)
    .format(inputDate)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Print the result
  return outputDateStr;
}

export function cleanObject(obj) {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

// Currency helpers
export function normalizeShopifyAmount(amount: any, currencyCode?: string) {
  const n = Number(amount);
  if (!isFinite(n)) return undefined;
  // Some Shopify MoneyV2 amounts may come in cents for MXN; heuristically normalize
  return n >= 10000 ? n / 100 : n;
}

export function formatCurrencyMXN(amount?: number, currencyCode?: string) {
  if (amount == null || isNaN(amount as any)) return "";
  // Desired: 1.929,00 $ (comma decimals, trailing $)
  if (!currencyCode || currencyCode === "MXN") {
    const formatted = new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount as number);
    return `${formatted} $`;
  }
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currencyCode,
  }).format(amount as number);
}
