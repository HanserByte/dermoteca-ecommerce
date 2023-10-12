import { useSessionVariables } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useCartLegacy = () => {
  const [cartId, setCartId] = useState<string | null>();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>();

  useEffect(() => {
    setCartId(localStorage?.getItem("cartId"));
    setCheckoutUrl(localStorage?.getItem("checkoutUrl"));
    if (!localStorage?.getItem("cartId")) createCart();
  }, []);

  async function createCart() {
    const res = await fetch("/api/cart?action=create-cart");
    const data = await res.json();
    localStorage.setItem("cartId", data.id);
    localStorage.setItem("checkoutUrl", data.checkoutUrl);
    setCartId(data.id);
    setCheckoutUrl(data.checkoutUrl);
    return data;
  }

  async function getCart(cartId: string | null | undefined) {
    const res = await fetch(`/api/cart?action=get-cart&cartId=${cartId}`);
    const data = await res.json();
    return data;
  }

  async function addToCart(
    cartId: string | null | undefined,
    productId: string,
    quantity: number
  ) {
    const res = await fetch(
      `/api/cart?action=add-to-cart&cartId=${cartId}&productId=${productId}&quantity=${quantity}`
    );
    const data = await res.json();
    return data;
  }

  async function removeFromCart(
    cartId: string | null | undefined,
    productId: string
  ) {
    const res = await fetch(
      `/api/cart?action=remove-from-cart&cartId=${cartId}&productId=${productId}`
    );
    const data = await res.json();
    return data;
  }

  async function updateProduct(
    cartId: string | null | undefined,
    productId: string,
    quantity: number
  ) {
    const res = await fetch(
      `/api/cart?action=update-product&cartId=${cartId}&productId=${productId}&quantity=${quantity}`
    );
    const data = await res.json();
    return data;
  }

  return {
    cartId,
    checkoutUrl,
    addToCart,
    createCart,
    getCart,
    removeFromCart,
    updateProduct,
  };
};

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
