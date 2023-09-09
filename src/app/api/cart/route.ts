import { addProductToCart, createCart, getCart } from '@/utils/shopifyFunctions'

export async function GET(request: Request) {
  let response
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  let cartId

  switch (action) {
    case 'create-cart':
      response = await createCart()
      break
    case 'add-to-cart':
      cartId = url.searchParams.get('cartId')
      const merchandiseId = url.searchParams.get('productId')
      const quantity = url.searchParams.get('quantity')
      const lines = [{ merchandiseId, quantity: Number(quantity) }]
      // @ts-ignore
      response = await addProductToCart(cartId, lines)
      break
    case 'get-cart':
      cartId = url.searchParams.get('cartId')
      // @ts-ignore
      response = await getCart(cartId)
      break
    default:
      break
  }

  return new Response(JSON.stringify(response))
}
