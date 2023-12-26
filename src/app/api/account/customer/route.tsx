import { cleanObject } from "@/utils/index";
import {
  getCustomer,
  updateCustomer,
  updateStorefrontCustomer,
} from "@/utils/shopifyFunctions";

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
    metafields: [
      {
        ...(data?.metafieldId && { id: data?.metafieldId }),
        key: "wishlist_ids",
        namespace: "wishlist",
        value: data?.updatedWishlist || undefined,
      },
    ],
  };
  const response = await updateCustomer(updatedCustomerInput);

  return new Response(JSON.stringify(response));
}

export async function PATCH(request: Request) {
  const data = await request.json();
  const formattedData = {
    ...cleanObject(data),
    metafields: [
      {
        ...(data?.metafieldId && { id: data?.metafieldId }),
        key: "birth_date",
        namespace: "facts",
        value: data?.updatedWishlist || undefined,
      },
    ],
  };

  // if(data?.day && data?.month && data?.year) {
  //   formattedData.metafields
  // }

  const response = await updateCustomer(cleanObject(data));

  return new Response(JSON.stringify(response));
}

// "metafields": [
//   {
//     "description": "",
//     "id": "",
//     "key": "",
//     "namespace": "",
//     "type": "",
//     "value": ""
//   }
// ],
