import { getAllProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const tags = url.searchParams.get("tags");

  const response =
    sortKey !== "undefined"
      ? await getAllProducts(sortKey, reverse, tags)
      : await getAllProducts("BEST_SELLING", false, tags);

  return new Response(JSON.stringify(response));
}
