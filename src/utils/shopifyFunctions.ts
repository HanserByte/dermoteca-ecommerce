import { ICartLineInput, IUpdateCartLineInput } from '@/typesSanity/shopify'

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
  try {
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
                cost {
                  subtotalAmount {
                    amount
                  }
                } 
              }
            }
          }
        `,
      }),
    })

    if (!response.ok) {
      // Handle non-successful HTTP responses (e.g., 4xx or 5xx errors)
      throw new Error('Failed to create a cart.')
    }

    const data = await response.json()
    return data.data.cartCreate.cart
  } catch (error) {
    // @ts-ignore
    return { error: error.message }
  }
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
          cart(id:  "${cartId}") {
            id
            cost {
              subtotalAmount {
                amount
              }
            } 
            checkoutUrl
            lines(first: 30) {
              nodes{
                id
                merchandise {
                  ... on ProductVariant {
                      id
                      product {
                        title
                        handle
                        featuredImage {
                          url
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                  quantity
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

/**
 * Adds a product to the cart by making a POST request to the API_ENDPOINT.
 * @param {string | null} cartId - The ID of the cart to which the product will be added.
 * @param {ICartLineInput[]} lines - An array of cart line inputs representing the product(s) to add.
 * @returns {Promise<Object>} A Promise that resolves to the cart data returned by the API.
 */
export const addProductToCart = async (cartId: string | null, lines: ICartLineInput[]): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CartLinesAdd($cartId: ID!, $lines:[CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines){
          cart {
            cost {
              subtotalAmount {
                amount
              }
            } 
            checkoutUrl
            lines (first: 30) {
              nodes{
                id
                merchandise {
                  ... on ProductVariant {
                      id
                      product {
                        title
                        handle
                        featuredImage {
                          url
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                  quantity
                }
              }
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
 * Removes one or more product lines from a user's shopping cart.
 * @param {string | null} cartId - The ID of the user's shopping cart, or null if no cart is available.
 * @param {string[]} lineIds - An array of line IDs representing the product lines to be removed from the cart.
 * @returns {Promise<object>} A Promise that resolves to an object containing the result of the cart update operation.
 * The object typically includes information about the updated cart, such as checkout URL and cart lines.
 *
 * @throws {Error} Throws an error if there is a network issue or if the response from the API is not in JSON format.
 *
 */
export const removeProductFromCart = async (cartId: string | null, lineIds: string[]): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CartLinesRemove($cartId: ID!, $lineIds:[ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds){
          cart {
            cost {
              subtotalAmount {
                amount
              }
            } 
            checkoutUrl
            lines (first: 30) {
              nodes{
                merchandise {
                  ... on ProductVariant {
                      id
                      product {
                        title
                        handle
                        featuredImage {
                          url
                        }
                      }
                      price {
                        amount
                      }
                    }
                  }
                  quantity
                }
              }
            }
        }
    }
      `,
      variables: {
        cartId,
        lineIds,
      },
    }),
  })
  const data = await response.json()
  return data
}

/**
 * Updates the product lines in a user's shopping cart.
 * @param {string | null} cartId - The ID of the user's shopping cart, or null if no cart is available.
 * @param {IUpdateCartLineInput[]} lines - An array of objects representing the updated product lines to be applied to the cart.
 * @returns {Promise<object>} A Promise that resolves to an object containing the result of the cart update operation.
 * The object typically includes information about the updated cart, such as checkout URL and cart lines.
 *
 * @throws {Error} Throws an error if there is a network issue or if the response from the API is not in JSON format.
 */
export const updateProduct = async (cartId: string | null, lines: IUpdateCartLineInput[]): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CartLinesUpdate($cartId: ID!, $lines:[CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            cost {
              subtotalAmount {
                amount
              }
            } 
            checkoutUrl
            lines (first: 30) {
              nodes{
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                      handle
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                    }
                  }
                }
                quantity
              }
            }
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
