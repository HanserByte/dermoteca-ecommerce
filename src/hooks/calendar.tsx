import { getCalendarSettings } from "@/utils/sanityFunctions";
import { useQuery } from "@tanstack/react-query";

export const useCalendar = (date: Date) => {
  const calendarData = useQuery(
    ["calendar", date],
    () => {
      return fetch(`/api/calendar`, {
        method: "POST",
        body: JSON.stringify({ date }),
      }).then((res) => res.json());
    },
    { enabled: !!date }
  );

  return calendarData;
};

export const useCalendarSettings = () => {
  const calendarSettingsData = useQuery(
    ["calendarSettings"],
    () => getCalendarSettings(),
    { staleTime: Infinity }
  );

  return calendarSettingsData;
};
