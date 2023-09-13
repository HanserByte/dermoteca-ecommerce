import { getRecommendedProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  if (productId !== "undefined") {
    const response = await getRecommendedProducts(productId);
    return new Response(JSON.stringify(response));
  }

  return new Response("No product id provided", { status: 400 });
}
