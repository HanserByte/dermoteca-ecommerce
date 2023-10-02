import {
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  CustomerResetInput,
} from "@shopify/hydrogen-react/storefront-api-types";
import { useMutation, useQuery } from "@tanstack/react-query";

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
