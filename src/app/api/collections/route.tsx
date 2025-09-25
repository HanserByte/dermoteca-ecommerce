import { getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const tags = url.searchParams.get("tags");
  const vendors = url.searchParams.get("vendors");

  const safeParse = (val: string | null) => {
    try {
      if (!val || val === "undefined" || val === "null") return [];
      return JSON.parse(val);
    } catch {
      return [];
    }
  };

  const parsedTags = safeParse(tags);
  const parsedVendors = safeParse(vendors);

  const response =
    sortKey !== "undefined"
      ? await getCollection(
          collectionHandle,
          sortKey as any,
          reverse,
          parsedTags,
          parsedVendors
        )
      : await getCollection(
          collectionHandle,
          "BEST_SELLING",
          false,
          parsedTags,
          parsedVendors
        );

  return new Response(JSON.stringify(response));
}
