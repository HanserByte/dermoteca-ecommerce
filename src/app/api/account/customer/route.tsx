import { getCustomer } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") as string;

  const response = await getCustomer(token);
  return new Response(JSON.stringify(response));
}
