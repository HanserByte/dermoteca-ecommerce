import { getAllCollections, getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  console.log(collectionHandle);
  const response =
    collectionHandle !== "undefined"
      ? await getAllCollections()
      : await getCollection(collectionHandle);

  return new Response(JSON.stringify(response));
}
