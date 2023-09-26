import { getShopifyProduct } from "@/utils/shopifyFunctions";

export async function GET(request: Request, { params }) {
  const response = await getShopifyProduct(params.handle);

  return new Response(JSON.stringify(response));
}
