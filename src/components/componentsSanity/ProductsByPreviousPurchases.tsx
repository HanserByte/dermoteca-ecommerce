import { useCustomer } from "@/hooks/account";
import React, { useState } from "react";
import TaggedProducts from "./TaggedProducts";

const ProductsByPreviousPurchases = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("userAccessToken")
  );
  const customerData = useCustomer(accessToken as string);

  const filteredLines = customerData?.data?.customer?.orders?.nodes.filter(
    (order) =>
      order?.lineItems?.nodes?.[0]?.variant?.product?.tags?.[0] !== undefined
  );

  const previousPurchasesTags = filteredLines?.map((order) => {
    return {
      label: order?.lineItems?.nodes?.[0]?.variant?.product?.tags?.[0],
    };
  });

  return (
    <TaggedProducts
      data={{
        tags: previousPurchasesTags,
        titulo: "Basado en compras previas",
      }}
    />
  );
};

export default ProductsByPreviousPurchases;
