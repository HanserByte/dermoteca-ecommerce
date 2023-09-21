import {
  ICartLineInput,
  IUpdateCartLineInput,
  SortKey as ProductSortKey,
} from "@/typesSanity/shopify";

const API_ENDPOINT = "https://6a8516-2.myshopify.com/api/2023-07/graphql.json";
const HEADERS = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_ACCESS_TOKEN,
};

/**
 * Creates a cart by making a POST request to the API_ENDPOINT.
 * @returns {Promise<Object>} A Promise that resolves to the cart data returned by the API.
 */
export const createCart = async (): Promise<object> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
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
    });

    if (!response.ok) {
      // Handle non-successful HTTP responses (e.g., 4xx or 5xx errors)
      throw new Error("Failed to create a cart.");
    }

    const data = await response.json();
    return data.data.cartCreate.cart;
  } catch (error) {
    // @ts-ignore
    return { error: error.message };
  }
};

/**
 * Retrieves cart information by making a POST request to the API_ENDPOINT.
 * @param {string} cartId - The ID of the cart to retrieve.
 * @returns {Promise<object>} A Promise that resolves to the cart data returned by the API.
 */
export const getCart = async (cartId: string): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
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
  });

  const data = await response.json();
  return data;
};

/**
 * Adds a product to the cart by making a POST request to the API_ENDPOINT.
 * @param {string | null} cartId - The ID of the cart to which the product will be added.
 * @param {ICartLineInput[]} lines - An array of cart line inputs representing the product(s) to add.
 * @returns {Promise<Object>} A Promise that resolves to the cart data returned by the API.
 */
export const addProductToCart = async (
  cartId: string | null,
  lines: ICartLineInput[]
): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
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
  });
  const data = await response.json();
  return data;
};

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
export const removeProductFromCart = async (
  cartId: string | null,
  lineIds: string[]
): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
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
  });
  const data = await response.json();
  return data;
};

/**
 * Updates the product lines in a user's shopping cart.
 * @param {string | null} cartId - The ID of the user's shopping cart, or null if no cart is available.
 * @param {IUpdateCartLineInput[]} lines - An array of objects representing the updated product lines to be applied to the cart.
 * @returns {Promise<object>} A Promise that resolves to an object containing the result of the cart update operation.
 * The object typically includes information about the updated cart, such as checkout URL and cart lines.
 *
 * @throws {Error} Throws an error if there is a network issue or if the response from the API is not in JSON format.
 */
export const updateProduct = async (
  cartId: string | null,
  lines: IUpdateCartLineInput[]
): Promise<object> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
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
  });
  const data = await response.json();
  return data;
};

/**
 * Fetches a collection of products from a GraphQL API.
 * @param {string} collectionHandle - The handle of the collection to retrieve.
 * @returns {Promise<Object>} A Promise that resolves to the collection data fetched from the API.
 * @throws {Error} If there is an issue with the API request or response.
 */
export const getCollection = async (collectionHandle: string | null) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query SingleCollection($handle: String) {
        collection(handle: $handle) {
            products(first: 30) {
                nodes {
                    featuredImage {
                        url
                    }
                    handle
                    title
                    priceRange {
                        maxVariantPrice{
                            amount
                        }
                    }
                }
            }
        }
    }
      `,
      variables: {
        handle: collectionHandle,
      },
    }),
  });
  return await response.json();
};

/**
 * Fetches recommended products based on a given product ID.
 * @async
 * @param {string | null} productId - The ID of the product for which recommendations are requested.
 * @returns {Promise<Object>} - A Promise that resolves to the recommended product data.
 * @throws {Error} - If there's an issue with the network request or response.
 */
export const getRecommendedProducts = async (productId: string | null) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query RecommendedProducts ($productId: ID!) {
        productRecommendations(productId: $productId) {
            id
            title
            handle
            featuredImage {
              url
            }
            priceRange {
                maxVariantPrice {
                    amount
                }
            }
        }
       }
      `,
      variables: {
        productId,
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Creates a new customer using the specified user information.
 * @param {string} email - The email address of the customer.
 * @param {string} firstName - The first name of the customer.
 * @param {string} lastName - The last name of the customer.
 * @param {string} password - The password for the customer's account.
 * @returns {Promise<object>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the network request fails or if the response is not in JSON format.
 */
export const createCustomer = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
        mutation CustomerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              firstName
            }
          }
        }
      `,
      variables: {
        input: {
          email,
          firstName,
          lastName,
          password,
        },
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Creates a customer access token using the provided email and password for authentication.
 * @param {string} email - The email address of the customer.
 * @param {string} password - The password for the customer's account.
 * @returns {Promise<object>} A promise that resolves to the response data from the server, including the access token and expiration information.
 * @throws {Error} Throws an error if the network request fails or if the response is not in JSON format.
 */
export const customerAccesTokenCreate = async (
  email: string,
  password: string
) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
              accessToken
              expiresAt
          }
          customerUserErrors {
              message
          }
        }
      }
      `,
      variables: {
        input: {
          email,
          password,
        },
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Retrieves customer information using a customer access token.
 * @param {string} customerAccessToken - The customer access token used for authentication and identification.
 * @returns {Promise<object>} A promise that resolves to the customer's information fetched from the server.
 * @throws {Error} Throws an error if the network request fails or if the response is not in JSON format.
 */
export const getCustomerByAccessToken = async (customerAccesToken: string) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query GetCustomer() {
        customer(customerAccessToken: ${customerAccesToken}) {
          id
          firstName
          lastName
          acceptsMarketing
          email
          phone
          defaultAddress {
              address1
              address1
              city
              country
              province
              zip
          }
          metafield(namespace: "wishlist", key: "wishlist_ids") {
              id
              value
          }
        }
      }
      `,
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Reset a customer's password using a reset URL.
 * @param {string} password - The new password to set for the customer.
 * @param {string} resetUrl - The URL containing the reset token for the customer.
 * @returns {Promise<Object>} A promise that resolves to the response data from the API.
 * @throws {Error} If there is an issue with the fetch request or the response.
 */
export const resetCustomerPasswordByUrl = async (
  password: string,
  resetUrl: any
) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CustomerResetByUrl($password: String!, $resetUrl: URL!) {
        customerResetByUrl(password: $password, resetUrl: $resetUrl) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
      `,
      variables: {
        password,
        resetUrl,
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Initiates the account recovery process for a customer using their email address.
 * @param {string} email - The email address of the customer requesting account recovery.
 * @returns {Promise<object>} A promise that resolves to the response data from the server, including potential error messages.
 * @throws {Error} Throws an error if the network request fails or if the response is not in JSON format.
 */
export const customerRecover = async (email: string) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      mutation CustomerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            message
          }
        }
      }
      `,
      variables: {
        email,
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Fetches information about all products from the API.
 * @returns {Promise<Object>} A promise that resolves to the response data containing product information.
 * @throws {Error} If there is an issue with the fetch request or the response.
 */

export const getAllProducts = async (
  sortKey: ProductSortKey = "BEST_SELLING",
  reverse: boolean = false
) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query AllProducts($sortKey: ProductSortKeys, $reverse: Boolean) {
        products (first: 40, sortKey: $sortKey, reverse: $reverse) {
          nodes {
            id
            title
            featuredImage {
              url
            }
            handle
            title
            priceRange {
              maxVariantPrice {
                    amount
              }
            }  
          }
        }
      }
    `,
      variables: {
        sortKey,
        reverse,
      },
    }),
  });
  const data = await response.json();
  return data;
};
