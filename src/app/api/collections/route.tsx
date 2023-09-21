import { getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  const response = await getCollection(collectionHandle);

  return new Response(JSON.stringify(response));
}
