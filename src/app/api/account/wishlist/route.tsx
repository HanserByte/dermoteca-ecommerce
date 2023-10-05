import { getWishlistProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const products = url.searchParams.get("products") as string;
  const decodedProductsString = decodeURIComponent(products);
  const reformatedString = decodedProductsString
    .split("-,-")
    .map((productString) => `(title:${productString})`)
    .join(" OR ");

  const response = await getWishlistProducts(reformatedString);

  return new Response(JSON.stringify(response));
}
