import { ICartLineInput } from '@/typesSanity/shopify'

const API_ENDPOINT = 'https://6a8516-2.myshopify.com/api/2023-07/graphql.json'
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': process.env.NEXT_STOREFRONT_ACCESS_TOKEN,
}

/**
 * Creates a cart by making a POST request to the API_ENDPOINT.
 * @returns {Promise<Object>} A Promise that resolves to the cart data returned by the API.
 */
export const createCart = async (): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
        mutation cartCreate {
          cartCreate {
            cart {
              id
              checkoutUrl
            }
          }
        }
      `,
    }),
  })
  const data = await response.json()
  return data
}

/**
 * Adds a product to the cart by making a POST request to the API_ENDPOINT.
 * @param {string} cartId - The ID of the cart to which the product will be added.
 * @param {ICartLineInput[]} lines - An array of cart line inputs representing the product(s) to add.
 * @returns {Promise<Object>} A Promise that resolves to the cart data returned by the API.
 */
export const addProductToCart = async (cartId: string, lines: ICartLineInput[]): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CartLinesAdd($cartId: ID!, $lines:[CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines){
            cart {
                checkoutUrl
            }
        }
      }
      `,
      variables: {
        cartId,
        lines,
      },
    }),
  })
  const data = await response.json()
  return data
}

/**
 * Retrieves cart information by making a POST request to the API_ENDPOINT.
 * @param {string} cartId - The ID of the cart to retrieve.
 * @returns {Promise<object>} A Promise that resolves to the cart data returned by the API.
 */
export const getCart = async (cartId: string): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
        query Cart {
          cart(id:  "gid://shopify/Cart/c1-b4823c6929ba1e24356b8490d64ff04c") {
            id
            checkoutUrl
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id  
                      product {
                        title
                        vendor
                        productType
                        id
                        handle
                      }
                      title
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                        id
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  })

  const data = await response.json()
  return data
}
