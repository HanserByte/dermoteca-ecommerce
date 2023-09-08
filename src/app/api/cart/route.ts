import { createCart } from '@/utils/shopifyFunctions'

export async function GET(request: Request) {
  let response
  const url = new URL(request.url)
  const action = url.searchParams.get('action')

  switch (action) {
    case 'create-cart':
      response = await createCart()
      break
    default:
      break
  }

  console.log(response)

  return new Response(JSON.stringify(response))
}
