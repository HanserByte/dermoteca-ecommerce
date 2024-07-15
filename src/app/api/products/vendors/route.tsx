import { getAllVendors } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const response = await getAllVendors();

  return new Response(JSON.stringify(response));
}
