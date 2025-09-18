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
  const collections = data.collections || [];

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

  // Construir query para collections
  const collectionsQuery =
    collections.length > 0
      ? collections
          .map((collection: string) => `(collection:${collection})`)
          .join(" OR ")
      : "";

  // Combinar queries
  const queries = [tagsQuery, vendorsQuery, collectionsQuery].filter(
    (q) => q !== ""
  );
  const combinedQuery = queries.length > 0 ? queries.join(" OR ") : "";

  const response = await getAllTaggedProducts(combinedQuery);
  return new Response(JSON.stringify(response));
}
