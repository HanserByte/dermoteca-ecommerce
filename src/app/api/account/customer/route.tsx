import { getCustomer, updateCustomer } from "@/utils/shopifyFunctions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") as string;

  const response = await getCustomer(token);
  return new Response(JSON.stringify(response));
}

export async function POST(request: Request) {
  const data = await request.json();

  const updatedCustomerInput = {
    id: data?.id,
    firstName: "Joaquin",
    metafields: [
      {
        id: data?.metafieldId,
        key: "wishlist_ids",
        namespace: "wishlist",
        value: data?.updatedWishlist,
      },
    ],
  };

  const response = await updateCustomer(updatedCustomerInput);

  return new Response(JSON.stringify(response));
}
