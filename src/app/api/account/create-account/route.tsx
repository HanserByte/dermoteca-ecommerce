import { createCustomer, customerLogin } from "@/utils/shopifyFunctions";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const firstName = url.searchParams.get("firstName") as string;
  const lastName = url.searchParams.get("lastName") as string;
  const email = url.searchParams.get("email") as string;
  const password = url.searchParams.get("password") as string;

  const input = {
    firstName,
    lastName,
    email,
    password,
  };

  await createCustomer(input);
  const response = await customerLogin({ email, password });

  return new Response(JSON.stringify(response));
}
