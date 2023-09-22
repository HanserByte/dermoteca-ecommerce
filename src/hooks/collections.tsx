import { useQuery } from "@tanstack/react-query";

export const useAllCollections = () => {
  const allCollectionsData = useQuery(["collections"], () =>
    fetch("/api/collections").then((res) => res.json())
  )?.data;

  return allCollectionsData;
};

export const useCollection = (
  collectionHandle: string,
  sortKey: string,
  reverse: boolean
) => {
  const collectionData = useQuery(["collections", collectionHandle], () =>
    fetch(`/api/collections?collectionHandle=${collectionHandle}`).then((res) =>
      res.json()
    )
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
