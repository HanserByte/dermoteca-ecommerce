import { getAllProduct, getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  const response = collectionHandle
    ? await getCollection(collectionHandle)
    : await getAllProduct();

  return new Response(JSON.stringify(response));
}
