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
  const tags = data.tags || [];
  const vendors = data.vendors || [];

  // Construir query para tags
  const tagsQuery =
    tags.length > 0
      ? tags.map((tag: string) => `(tag:${tag})`).join(" OR ")
      : "";

  // Construir query para vendors
  const vendorsQuery =
    vendors.length > 0
      ? vendors.map((vendor: string) => `(vendor:${vendor})`).join(" OR ")
      : "";

  // Combinar queries
  let combinedQuery = "";
  if (tagsQuery && vendorsQuery) {
    combinedQuery = `(${tagsQuery}) OR (${vendorsQuery})`;
  } else if (tagsQuery) {
    combinedQuery = tagsQuery;
  } else if (vendorsQuery) {
    combinedQuery = vendorsQuery;
  }

  const response = await getAllTaggedProducts(combinedQuery);
  return new Response(JSON.stringify(response));
}
