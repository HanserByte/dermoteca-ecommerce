import type {
  ProductSortKeys,
  CartLineUpdateInput,
  CartLineInput,
  CustomerCreateInput,
  CustomerAccessTokenCreateInput,
  CustomerUpdateInput,
} from "@shopify/hydrogen-react/storefront-api-types";
import {
  CartCreateMutation,
  CartLinesAddMutation,
  CartQuery,
  CreateCustomerMutation,
  CustomerLoginMutation,
  CustomerLogoutMutation,
  CustomerQuery,
  CustomerUpdateMutation,
  RemoveCartLinesMutation,
  SingleProductQuery,
  UpdateCartLinesMutation,
  WishlistProductsQuery,
  SearchQuery,
  CustomerRecoverMutation,
  AdminCustomerQuery,
  CustomerUpdateStorefrontMutation,
  BestSellingProductsQuery,
  TaggedProductsQuery,
  BundleProductAdminQuery,
} from "./shopifyGraphql";

const API_ENDPOINT = "https://6a8516-2.myshopify.com/api/2023-07/graphql.json";
const HEADERS = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_ACCESS_TOKEN,
};

/**
 * Fetches a collection of products from a GraphQL API.
 * @param {string} collectionHandle - The handle of the collection to retrieve.
 * @returns {Promise<Object>} A Promise that resolves to the collection data fetched from the API.
 * @throws {Error} If there is an issue with the API request or response.
 */
export const getCollection = async (
  collectionHandle: string | null,
  sortKey: ProductSortKeys = "BEST_SELLING",
  reverse: boolean = false,
  tags: string | null,
  vendors: string | null
) => {
  console.log(vendors, " <<<<<<<<<<<<<<<<<<");

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query SingleCollection($handle: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $vendors: [ProductFilter!]) {
        collection(handle: $handle) {
            products(first: 40, sortKey: $sortKey, reverse: $reverse, filters: $vendors) {
                nodes {
                    tags
                    createdAt
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
        sortKey,
        reverse,
        vendors,
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
 * Fetches information about all products from the API.
 * @returns {Promise<Object>} A promise that resolves to the response data containing product information.
 * @throws {Error} If there is an issue with the fetch request or the response.
 */

export const getAllProducts = async (
  sortKey: ProductSortKeys = "BEST_SELLING",
  reverse: boolean = false,
  tags: string | null,
  vendors: string | null
) => {
  const fullQuery = `status:active${tags ? ` AND (${tags})` : ""}${
    tags && vendors ? " AND " : ""
  }${vendors ? `(${vendors})` : ""}`;

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query AllProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
        products(first: 250, sortKey: $sortKey, reverse: $reverse, query: $query) {
          nodes {
            id
            title
            featuredImage {
              url
            }
            productType
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
        query: fullQuery,
      },
    }),
  });
  const data = await response.json();
  return data;
};

/**
 * Fetches a list of all product tags from the specified API endpoint.
 * @function
 * @returns {Promise<object>} A Promise that resolves to an object containing the fetched data.
 * @throws {Error} Throws an error if the fetch request fails or the response cannot be parsed as JSON.
 */
export const getAllTags = async () => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query AllTags {
        productTags(first: 100) {
            edges {
                node
            }
        }
    }
    `,
    }),
  });
  const data = await response.json();
  return data;
};

export const getAllVendors = async () => {
  let hasNextPage = true;
  let endCursor = null;
  const allVendors = new Set<string>();

  while (hasNextPage) {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      // @ts-ignore
      headers: HEADERS,
      body: JSON.stringify({
        query: `
        query AllVendors($cursor: String) {
          products(
            first: 250,
            after: $cursor,
            sortKey: VENDOR,
            query: "status:active"
          ) {
            edges {
              node {
                vendor
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
        `,
        variables: {
          cursor: endCursor,
        },
      }),
    });

    const data = await response.json();

    if (!data.data?.products) {
      console.error("Error fetching vendors:", data);
      break;
    }

    const products = data.data.products;

    // Agregar vendors al Set y asegurar que no haya espacios extras
    products.edges.forEach((edge: any) => {
      if (edge.node.vendor) {
        allVendors.add(edge.node.vendor.trim());
      }
    });

    // Actualizar paginación
    hasNextPage = products.pageInfo.hasNextPage;
    endCursor = products.pageInfo.endCursor;

    // Agregar un log para debugging
    console.log(
      "Vendors encontrados en esta página:",
      products.edges.map((edge: any) => edge.node.vendor)
    );
    console.log("Total vendors únicos hasta ahora:", allVendors.size);
  }

  const sortedVendors = Array.from(allVendors).sort();
  console.log("Total vendors finales:", sortedVendors.length);
  console.log("Lista completa de vendors:", sortedVendors);

  return sortedVendors;
};

/**
 * Fetches all collections from a GraphQL API.
 * @function getAllCollections
 * @returns {Promise<object>} A Promise that resolves to the response data from the API.
 * @throws {Error} If there is an issue with the API request or response.
 */
export const getAllCollections = async () => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    // @ts-ignore
    headers: HEADERS,
    body: JSON.stringify({
      query: `
      query AllCollections {
        collections(first: 100) {
            nodes {
                title
                handle
            }
        }
    }
    `,
    }),
  });
  const data = await response.json();
  return data;
};

export const makeShopifyRequest = async (
  query: string,
  variables: Record<string, unknown> = {}
) => {
  const HEADERS = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": process.env.STOREFRONT_ACCESS_TOKEN,
  };

  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  };

  // @ts-ignore
  const response = await fetch(API_ENDPOINT, options);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${body}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }

  return json.data;
};

export const makeShopifyAdminRequest = async (
  query: string,
  variables: Record<string, unknown> = {}
) => {
  const ADMIN_ENDPOINT =
    "https://6a8516-2.myshopify.com/admin/api/2025-01/graphql.json";
  const HEADERS = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": process.env.ADMIN_ACCESS_TOKEN,
  };

  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
  };

  // @ts-ignore
  const response = await fetch(ADMIN_ENDPOINT, options);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${body}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }

  return json.data;
};

export async function createCart() {
  const { cartCreate } = await makeShopifyRequest(CartCreateMutation);
  return cartCreate;
}

export async function getCart(cartId: string) {
  const { cart } = await makeShopifyRequest(CartQuery, { cartId });
  return cart;
}

export async function addProductToCart(cartId: string, lines: CartLineInput[]) {
  const { cartLinesAdd } = await makeShopifyRequest(CartLinesAddMutation, {
    cartId,
    lines,
  });

  return cartLinesAdd;
}

export async function removeProductFromCart(cartId: string, lineIds: string[]) {
  const { cartLinesRemove } = await makeShopifyRequest(
    RemoveCartLinesMutation,
    { cartId, lineIds }
  );

  return cartLinesRemove;
}

export async function updateCartProducts(
  cartId: string,
  lines: CartLineUpdateInput[]
) {
  const { cartLinesUpdate } = await makeShopifyRequest(
    UpdateCartLinesMutation,
    { cartId, lines }
  );

  return cartLinesUpdate;
}

export async function getShopifyProduct(handle: string) {
  const data = await makeShopifyRequest(SingleProductQuery, { handle });
  return data;
}

export async function createCustomer(input: CustomerCreateInput) {
  const data = await makeShopifyRequest(CreateCustomerMutation, { input });
  return data;
}

export async function customerLogin(input: CustomerAccessTokenCreateInput) {
  const { customerAccessTokenCreate } = await makeShopifyRequest(
    CustomerLoginMutation,
    { input }
  );

  return customerAccessTokenCreate;
}

export async function customerLogout(customerAccessToken: string) {
  const { customerAccessTokenDelete } = await makeShopifyRequest(
    CustomerLogoutMutation,
    { customerAccessToken }
  );
  return customerAccessTokenDelete;
}

export async function getCustomer(customerAccessToken: string) {
  const data = await makeShopifyRequest(CustomerQuery, {
    customerAccessToken,
  });

  return data;
}

export async function recoverPassword(email: string) {
  const data = await makeShopifyRequest(CustomerRecoverMutation, {
    email,
  });
  return data;
}

export async function getWishlistProducts(query: string) {
  const { products } = await makeShopifyRequest(WishlistProductsQuery, {
    query,
  });

  return products;
}

export async function updateStorefrontCustomer(
  customerInput: CustomerUpdateInput,
  customerAccessToken: string
) {
  const { customerUpdate } = await makeShopifyRequest(
    CustomerUpdateStorefrontMutation,
    {
      customer: customerInput,
      customerAccessToken,
    }
  );
  return customerUpdate;
}

export async function updateCustomer(input: any) {
  const { customerUpdate } = await makeShopifyAdminRequest(
    CustomerUpdateMutation,
    {
      input,
    }
  );

  return customerUpdate;
}

export async function getAdminCustomer(id: string) {
  const { customer } = await makeShopifyAdminRequest(AdminCustomerQuery, {
    id,
  });
  return customer;
}

export async function search(query: string) {
  const { search } = await makeShopifyRequest(SearchQuery, { query });
  return search;
}

export async function getBestSellingProducts() {
  const { products } = await makeShopifyRequest(BestSellingProductsQuery);
  return products;
}

export async function getAllTaggedProducts(tags: string) {
  const { products } = await makeShopifyRequest(TaggedProductsQuery, { tags });
  return products;
}

export async function getBundleProduct(id: string) {
  const data = await makeShopifyAdminRequest(BundleProductAdminQuery, { id });
  return data;
}
