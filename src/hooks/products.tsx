import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useProductRecommendations = (productId: string) => {
  const [productRecommendations, setProductRecommendations] = useState([]);

  useEffect(() => {
    getProductRecommendations(productId);
  }, [productId]);

  async function getProductRecommendations(productId: string) {
    const res = await fetch(
      `/api/product-recommendations?productId=${productId}`
    );

    const data = await res.json();
    setProductRecommendations(data?.data.productRecommendations);
  }

  return { productRecommendations };
};

export const useAllTags = () => {
  const allTagsData = useQuery(["tags"], () =>
    fetch("/api/products/tags").then((res) => res.json())
  )?.data;

  return allTagsData;
};
