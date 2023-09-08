import { addProductToCart, createCart } from '@/utils/shopifyFunctions'

export async function GET(request: Request) {
  let response
  const url = new URL(request.url)
  const action = url.searchParams.get('action')

  switch (action) {
    case 'create-cart':
      response = await createCart()
      break
    case 'add-to-cart':
      const cartId = url.searchParams.get('cartId')
      const merchandiseId = url.searchParams.get('productId')
      const quantity = url.searchParams.get('quantity')
      const lines = [{ merchandiseId, quantity: Number(quantity) }]
      // @ts-ignore
      response = await addProductToCart(cartId, lines)
      break
    default:
      break
  }

  return new Response(JSON.stringify(response))
}
