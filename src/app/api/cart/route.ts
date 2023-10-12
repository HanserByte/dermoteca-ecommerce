import {
  addProductToCart,
  createCart,
  createCartLegacy,
  getCart,
  removeProductFromCart,
  updateCartProducts,
} from "@/utils/shopifyFunctions";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  let response;
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const cartId = url.searchParams.get("cartId");
  const quantity = url.searchParams.get("quantity");
  const merchandiseId = url.searchParams.get("productId");
  let lines;

  switch (action) {
    case "create-cart":
      // response = await createCartLegacy();
      response = await createCart();
      break;
    case "get-cart":
      // @ts-ignore
      response = await getCart(cartId);
      break;
    case "remove-from-cart":
      const lineIds = [merchandiseId];
      // @ts-ignore
      response = await removeProductFromCart(cartId, lineIds);
      break;
    case "update-product":
      lines = [{ id: merchandiseId, quantity: Number(quantity) }];
      // @ts-ignore
      response = await updateCartProducts(cartId, lines);
      break;
    default:
      break;
  }

  return new Response(JSON.stringify(response));
}

export async function POST(request: NextRequest) {
  let response;
  const url = new URL(request.url);
  const data = await request.json();

  const cartId = url.searchParams.get("cartId") as string;
  response = await addProductToCart(cartId, data?.lines);

  return new Response(JSON.stringify(response));
}
