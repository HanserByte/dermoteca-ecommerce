import { getAdminCustomer } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  const response = await getAdminCustomer(id);
  return new Response(JSON.stringify(response));
}
