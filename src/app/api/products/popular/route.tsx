import { getBestSellingProducts } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const response = await getBestSellingProducts();

  return new Response(JSON.stringify(response));
}
