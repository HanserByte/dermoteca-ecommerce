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
  tags: any = [],
  vendors: any = []
) => {
  const collectionData = useQuery(
    ["collections", collectionHandle, { sortKey, reverse, tags, vendors }],
    () =>
      fetch(
        `/api/collections?collectionHandle=${collectionHandle}&sortKey=${sortKey}&reverse=${reverse}&tags=${JSON.stringify(
          tags
        )}&vendors=${JSON.stringify(vendors)}`
      ).then((res) => res.json()),
    { enabled: !!collectionHandle, keepPreviousData: true }
  );

  return collectionData;
};

export const useAllProducts = (
  activeSortKey: string,
  reverse: boolean = false,
  tags: string = "",
  vendors: string = ""
) => {
  const sortKey = activeSortKey !== "0" ? activeSortKey : "BEST_SELLING";
  const allProductsData = useQuery(
    ["products", { sortKey, reverse, tags, vendors }],
    () =>
      fetch(
        `/api/products?sortKey=${sortKey}&reverse=${reverse}&tags=${tags}&vendors=${vendors}`
      ).then((res) => res.json()),
    { keepPreviousData: true }
  );

  return allProductsData;
};

export const useAllTaggedProducts = (tags: string[]) => {
  const allTaggedProductsData = useQuery(
    ["allTaggedProducts", tags?.join(",")],
    () =>
      fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify({ tags }),
      }).then((res) => res.json()),
    { enabled: tags?.length > 0 }
  );

  return allTaggedProductsData;
};
