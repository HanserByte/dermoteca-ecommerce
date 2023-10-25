const CART_FRAGMENT = `#graphql
  fragment cartFragment on Cart {
    id
    totalQuantity
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
        merchandise {
          ...on ProductVariant {
            id
            title
            selectedOptions { 
              value
            }
            price {
              amount
            }
            image {
              url
              altText
              width
              height
            }
            product {
              handle
              title
            }
          }
        }
        cost {
          amountPerQuantity{
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
fragment productFragment on Product {
  id
  title
  totalInventory
  handle
  images (first: 10) {
    nodes {
      url
      width
      height
      altText
    }
  }
  priceRange {
    maxVariantPrice{
      amount
    }
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price {
        amount
        currencyCode
      }
    }
  }
  collections(first:1) {
    nodes {
      handle
      title
    }
  }
  featuredImage {
    url
    width
    height
    altText
  }
}
`;

export const CartCreateMutation = `#graphql
  mutation CartCreateMutation {
    cartCreate {
      cart {
        totalQuantity
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
`;

export const CartQuery = `#graphql
  query CartQuery($cartId: ID!) {
    cart(id: $cartId) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CartLinesAddMutation = `#graphql
  mutation CartLinesAddMutation($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const RemoveCartLinesMutation = `#graphql
  mutation RemoveCartLinesMutation($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove (cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UpdateCartLinesMutation = `#graphql
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const SingleProductQuery = `#graphql
  query SingleProductQuery($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const WishlistProductsQuery = `#graphql
  query AllProductsQuery($query: String) {
    products (first: 50, query: $query) {
      nodes {
        ...productFragment
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const CreateCustomerMutation = `#graphql
  mutation CreateCustomerMutation($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CustomerLoginMutation = `#graphql
  mutation CustomerLoginMutation($input: CustomerAccessTokenCreateInput!) {
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
`;

export const CustomerLogoutMutation = `#graphql
  mutation CustomerLogoutMutation($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
    }
  }
`;

export const CustomerQuery = `#graphql
  query CustomerQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      displayName
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
`;

export const CustomerRecoverMutation = `#graphql
  mutation CustomerRecoverMutation($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        message
      }
    }
  }
`;

export const CustomerResetMutation = `#graphql
  mutation CustomerResetMutation($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
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
`;

export const CollectionQuery = `#graphql
  query SingleCollection($handle: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $tags: [ProductFilter!]) {
    collection(handle: $handle) {
      products(first: 40, sortKey: $sortKey, reverse: $reverse, filters: $tags) {
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
`;

export const RecommendedProductsQuery = `#graphql
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
`;

export const SearchQuery = `#graphql
  query Search($query: String!){
    search(first: 30, query: $query) {
      nodes {
        ... on Product {
          ...productFragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Admin graphql

export const CustomerUpdateMutation = `#graphql
  mutation CustomerUpdateMutation($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        metafield(namespace: "wishlist", key: "wishlist_ids") {
          id
          value
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`;

export const AdminCustomerQuery = `#graphql
  query GetAdminCustomer($id: ID!) {
    customer (id: $id) {
      firstName
      lastName
      displayName
      email
      addresses (first: 10) {
        formatted
        formattedArea
        address1
        address2
        city
        company
        country
        firstName
        lastName
        id
      }
      orders(first: 20) {
        nodes {
          id
          name
          processedAt
          paymentGatewayNames
          displayFulfillmentStatus
          totalPriceSet {
            shopMoney {
              amount
            }
          }
        }
      }
    }
  }
`;
