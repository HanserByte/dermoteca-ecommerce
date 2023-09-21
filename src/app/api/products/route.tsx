import { getAllProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sortKey = url.searchParams.get("sortKey");
  const reverse = url.searchParams.get("reverse") === "true";
  const response =
    sortKey !== "undefined"
      ? await getAllProducts(sortKey, reverse)
      : await getAllProducts();

  return new Response(JSON.stringify(response));
}
