import { getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const tags = url.searchParams.get("tags");
  const vendors = url.searchParams.get("vendors");

  console.log(vendors, "vendors>>>>>>>>>>>");

  const response =
    sortKey !== "undefined"
      ? await getCollection(
          collectionHandle,
          sortKey,
          reverse,
          JSON.parse(String(tags)),
          JSON.parse(String(vendors))
        )
      : await getCollection(
          collectionHandle,
          "BEST_SELLING",
          false,
          JSON.parse(String(tags)),
          JSON.parse(String(vendors))
        );

  return new Response(JSON.stringify(response));
}
