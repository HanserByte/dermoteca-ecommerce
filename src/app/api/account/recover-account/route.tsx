import { recoverPassword } from "@/utils/shopifyFunctions";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") as string;

  const response = await recoverPassword(email);

  return new Response(JSON.stringify(response));
}
