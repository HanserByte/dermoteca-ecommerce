import { useQuery } from "@tanstack/react-query";

export const useCalendar = (date: string) => {
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
