export const useCollections = () => {
  async function getCollection(collectionHandle: string) {
    const res = await fetch(
      `/api/collections?collectionHandle=${collectionHandle}`
    );
    const data = await res.json();
    return data;
  }

  return { getCollection };
};
