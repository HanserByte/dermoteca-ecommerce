import { getCollection } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const collectionHandle = url.searchParams.get("collectionHandle");
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const tags = url.searchParams.get("tags");

  const response =
    sortKey !== "undefined"
      ? await getCollection(
          collectionHandle,
          sortKey,
          reverse,
          JSON.parse(String(tags))
        )
      : await getCollection(
          collectionHandle,
          "BEST_SELLING",
          false,
          JSON.parse(String(tags))
        );

  return new Response(JSON.stringify(response));
}
