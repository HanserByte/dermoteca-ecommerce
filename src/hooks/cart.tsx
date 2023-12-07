import { useSessionVariables } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCartActions = () => {
  const createCartMutation = useMutation(
    // @ts-ignore
    () => {
      return fetch(`/api/cart?action=create-cart`).then((res) => res.json());
    }
  );

  const addToCartMutation = useMutation(
    // @ts-ignore
    ({ cartId, lines }) => {
      return fetch(`/api/cart?action=add-to-cart&cartId=${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lines: lines }),
      }).then((res) => res.json());
    }
  );

  const removeFromCartMutation = useMutation(
    // @ts-ignore
    ({ cartId, productId }) => {
      return fetch(
        `/api/cart?action=remove-from-cart&cartId=${cartId}&productId=${productId}`
      ).then((res) => res.json());
    }
  );

  const updateCartProductMutation = useMutation(
    // @ts-ignore
    ({ cartId, productId, quantity }) => {
      return fetch(
        `/api/cart?action=update-product&cartId=${cartId}&productId=${productId}&quantity=${quantity}`
      ).then((res) => res.json());
    }
  );

  return {
    addToCartMutation,
    removeFromCartMutation,
    updateCartProductMutation,
    createCartMutation,
  };
};

export const useCart = (cartId?: string) => {
  const { cartId: sessionsCartId } = useSessionVariables();

  const id = cartId || sessionsCartId;
  const cartData = useQuery(
    ["cart", id],
    () =>
      fetch(`/api/cart?action=get-cart&cartId=${id}`).then((res) => res.json()),
    { enabled: !!id }
  );

  return cartData;
};
