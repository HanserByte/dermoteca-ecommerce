import { useQuery } from "@tanstack/react-query";

export const useSearch = (query?: string) => {
  const searchData = useQuery(
    ["search", query],
    () => fetch(`/api/search?query=${query}`).then((res) => res.json()),
    { enabled: !!query }
  );

  return searchData;
};
