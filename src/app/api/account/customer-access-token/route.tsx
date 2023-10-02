import { customerLogin } from "@/utils/shopifyFunctions";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") as string;
  const password = url.searchParams.get("password") as string;

  const response = await customerLogin({ email, password });
  return new Response(JSON.stringify(response));
}
