import { search } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") as string;
  const products = await search(query);
  return new Response(JSON.stringify(products));
}
