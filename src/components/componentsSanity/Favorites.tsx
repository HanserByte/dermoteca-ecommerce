import {
  useCustomer,
  useCustomerAccessTokenCreate,
  useUserWishlist,
} from "@/hooks/account";
import { useMobileView } from "@/hooks/responsive";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { useRouter } from "next/router";

const Favorites = () => {
  const router = useRouter();
  const { isMobile } = useMobileView();
  const customerAccessTokenMutation = useCustomerAccessTokenCreate();
  const accessToken =
    customerAccessTokenMutation?.data?.customerAccessToken?.accessToken;
  const customerData = useCustomer(accessToken);
  const productWishlistData = useUserWishlist(
    customerData?.data?.customer?.metafield?.value
  );

  useEffect(() => {
    if (!customerData?.data) router.push("/cuenta/iniciar-sesion");
  }, []);

  return (
    <Box
      my="6"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <Text textTransform="uppercase" fontSize="22px" fontWeight="700" mb="5px">
        Favoritos
      </Text>

      <Grid
        gap={5}
        py={5}
        templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
      >
        {productWishlistData?.data?.nodes?.map((product: Product) => (
          <ProductCard
            handle={product.handle}
            imageSrc={product?.featuredImage?.url}
            title={product.title}
            // @ts-ignore
            price={product?.priceRange?.maxVariantPrice?.amount}
            key={product?.id}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
