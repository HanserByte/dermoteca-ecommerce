import { useQuery } from "@tanstack/react-query";

export const useAllCollections = () => {
  const allCollectionsData = useQuery(["collections"], () =>
    fetch("/api/collections/tags").then((res) => res.json())
  )?.data;

  return allCollectionsData;
};

export const useCollection = (
  collectionHandle: string | string[] | undefined,
  sortKey: string,
  reverse: boolean,
  tags: any = []
) => {
  const collectionData = useQuery(
    ["collections", collectionHandle, { sortKey, reverse, tags }],
    () =>
      fetch(
        `/api/collections?collectionHandle=${collectionHandle}&sortKey=${sortKey}&reverse=${reverse}&tags=${JSON.stringify(
          tags
        )}`
      ).then((res) => res.json()),
    { enabled: !!collectionHandle, keepPreviousData: true }
  )?.data;

  return collectionData;
};

export const useAllProducts = (
  activeSortKey: string,
  reverse: boolean = false,
  tags: string = ""
) => {
  const sortKey = activeSortKey !== "0" ? activeSortKey : "BEST_SELLING";
  const allProductsData = useQuery(
    ["products", { sortKey, reverse, tags }],
    () =>
      fetch(
        `/api/products?sortKey=${sortKey}&reverse=${reverse}&tags=${tags}`
      ).then((res) => res.json()),
    { keepPreviousData: true }
  )?.data;

  return allProductsData;
};
