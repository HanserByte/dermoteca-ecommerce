import { getAllCollections, getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const response = await getAllCollections();

  return new Response(JSON.stringify(response));
}
