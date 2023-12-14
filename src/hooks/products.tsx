import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

export const useSanityProduct = (handle: string) => {
  const query = groq`
  *[_type == "product" && store.slug.current == "${handle}"][0]{
      ...,
      store {
        ...,
        variants[]->
      },
      componentes[]->
  }
  `;
  const sanityProductData = useQuery(
    ["sanityProduct", handle],
    () => client.fetch(query),
    { enabled: !!handle }
  );

  return sanityProductData;
};

export const useShopifyProduct = (handle: string) => {
  const shopifyProductData = useQuery(
    ["shopifyProduct", handle],
    () => fetch(`/api/products/${handle}`).then((res) => res.json()),
    { enabled: !!handle }
  );

  return shopifyProductData;
};

export const useProductRecommendations = (productId: string) => {
  const productRecommendationsData = useQuery(
    ["productRecommendations", productId],
    () =>
      fetch(`/api/product-recommendations?productId=${productId}`).then((res) =>
        res.json()
      ),
    { enabled: !!productId }
  );

  return productRecommendationsData;
};

export const useBestSellingProducts = () => {
  const bestSellingProductsData = useQuery(["bestSellingProducts"], () =>
    fetch("/api/products/popular").then((res) => res.json())
  );

  return bestSellingProductsData;
};

export const useAllTags = () => {
  const allTagsData = useQuery(["tags"], () =>
    fetch("/api/products/tags").then((res) => res.json())
  )?.data;

  return allTagsData;
};

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchProductPage = (handle: string) => {
    const query = groq`*[_type == "product" && store.slug.current == "${handle}"][0]{
      ...,
      store {
        ...,
        variants[]->
      },
      componentes[]->
  }
    `;

    queryClient.prefetchQuery(["sanityProduct", handle], () =>
      client.fetch(query)
    );
    queryClient.prefetchQuery(["shopifyProduct", handle], () =>
      fetch(`/api/products/${handle}`).then((res) => res.json())
    );
  };

  return { prefetchProductPage };
};
