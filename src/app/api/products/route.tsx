import { getAllProducts, getAllTaggedProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const tags = url.searchParams.get("tags");
  const vendors = url.searchParams.get("vendors");

  const response =
    sortKey !== "undefined"
      ? await getAllProducts(sortKey, reverse, tags, vendors)
      : await getAllProducts("BEST_SELLING", false, tags, vendors);

  return new Response(JSON.stringify(response));
}
export async function POST(request: Request) {
  const data = await request.json();
  const tags = data.tags.map((tag: string) => `(tag:${tag})`).join(" OR ");
  const response = await getAllTaggedProducts(tags);
  return new Response(JSON.stringify(response));
}
