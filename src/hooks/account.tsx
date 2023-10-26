import {
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  CustomerResetInput,
  CustomerUpdateInput,
} from "@shopify/hydrogen-react/storefront-api-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const createAccountMutation = useMutation((input: CustomerCreateInput) => {
    // @ts-ignore
    const queryParamsStr = new URLSearchParams(input).toString();
    return fetch(`/api/account/create-account?${queryParamsStr}`, {
      method: "POST",
    }).then((res) => res.json());
  });

  return createAccountMutation;
};

export const useRecoverAccount = () => {
  const recoverAccountMutation = useMutation((email: string) => {
    return fetch(`/api/account/recover-account?email=${email}`, {
      method: "POST",
    }).then((res) => res.json());
  });

  return recoverAccountMutation;
};

export const useResetAccount = () => {
  const resetAccountMutation = useMutation(
    // @ts-ignore
    (id: string, input: CustomerResetInput) => {
      const queryParamsStr = new URLSearchParams(input).toString();
      return fetch(`/api/account/userId=${id}&reset?${queryParamsStr}`, {
        method: "POST",
      }).then((res) => res.json());
    }
  );

  return resetAccountMutation;
};

export const useCustomer = (customerAccessToken: string) => {
  const customerData = useQuery(
    ["customer"],
    () => {
      return fetch(`/api/account/customer?token=${customerAccessToken}`, {
        method: "GET",
      }).then((res) => res.json());
    },
    { enabled: !!customerAccessToken }
  );

  return customerData;
};

export const useAdminCustomer = (id: string) => {
  const adminCustomerData = useQuery(
    ["adminCustomer"],
    () => {
      return fetch(`/api/account/admin-customer?id=${id}`, {
        method: "GET",
      }).then((res) => res.json());
    },
    { enabled: !!id }
  );

  return adminCustomerData;
};

export const useCustomerAccessTokenCreate = () => {
  const customerAccessTokenMutation = useMutation(
    (input: CustomerAccessTokenCreateInput) => {
      const queryParamsStr = new URLSearchParams(input).toString();
      return fetch(`/api/account/customer-access-token?${queryParamsStr}`, {
        method: "POST",
      }).then((res) => res.json());
    }
  );

  return customerAccessTokenMutation;
};

export const useUserWishlist = (wishlistProducts: string) => {
  const productWishlistData = useQuery(
    ["wishlist"],
    () => {
      return fetch(
        `/api/account/wishlist?products=${encodeURIComponent(
          wishlistProducts
        )}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
    },
    {
      enabled: !!wishlistProducts,
    }
  );

  return productWishlistData;
};

export const useUpdateProductWishlistMutation = () => {
  const queryClient = useQueryClient();

  // @ts-ignore
  const updateProductWishlistMutation = useMutation(
    // @ts-ignore
    ({ id, metafield }) => {
      return fetch(`/api/account/customer`, {
        method: "POST",
        body: JSON.stringify({
          id,
          metafieldId: metafield.id,
          updatedWishlist: metafield.value,
        }),
      }).then((res) => res.json());
    },
    {
      // @ts-ignore
      onMutate: (data: any) => {
        queryClient.cancelQueries(["wishlist"]);
        const node = data?.shopifyProductData;

        if (data.action === "remove") {
          queryClient.setQueryData(["wishlist"], (products: any) => {
            const productsArrayCopy = { ...products };

            productsArrayCopy.nodes = productsArrayCopy.nodes.filter(
              (product: any) => product.id !== node.id
            );
            return productsArrayCopy;
          });
        }

        if (data.action !== "remove") {
          queryClient.setQueryData(["wishlist"], (products: any) => {
            const productsArrayCopy = { ...products };

            productsArrayCopy?.nodes?.push(node);
            return productsArrayCopy;
          });
        }
      },
    }
  );

  return updateProductWishlistMutation;
};

export const useUpdateCustomerMutation = () => {
  const updateCustomerMutation = useMutation(
    // @ts-ignore
    ({ customer, customerAccessToken }) => {
      return fetch(`/api/account/customer?token=${customerAccessToken}`, {
        method: "PATCH",
        body: JSON.stringify(customer),
      }).then((res) => res.json());
    }
  );

  return updateCustomerMutation;
};
