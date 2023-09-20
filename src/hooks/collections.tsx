import { useQuery } from "@tanstack/react-query";

export const useCollectionData = (collectionHandle?: string) => {
  const collectionData = useQuery(["collections", collectionHandle], () =>
    fetch(`/api/collections?collectionHandle=${collectionHandle}`).then((res) =>
      res.json()
    )
  )?.data;

  const allCollectionsData = useQuery(["collections"], () =>
    fetch(`/api/collections`).then((res) => res.json())
  )?.data;

  return { collectionData, allCollectionsData };
};
