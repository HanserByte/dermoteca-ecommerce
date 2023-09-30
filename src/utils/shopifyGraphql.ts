export const SingleProductQuery = `#graphql
  query SingleProductQuery($handle: String!) {
    product(handle: $handle) {
      title
      handle
      collections(first: 10) {
        nodes {
          handle
          title
        }
      }
      images(first: 10)  {
        nodes {
          url 
        }
      }
      variants (first: 10) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

export const CreateCustomerMutation = `#graphql
  query CreateCustomerMutation($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        firstName
      }
    }
  }
`;

export const CustomerLoginMutation = `#graphql
  query CustomerLoginMutation($input: CustomerAccessTokenCreateInput!) {
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

export const CustomerQuery = `#graphql
  query CustomerQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
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
`;
