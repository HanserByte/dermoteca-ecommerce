import { useSanityProduct, useShopifyProduct } from "@/hooks/products";
import { useMobileView } from "@/hooks/responsive";
import { useCartDrawer, useSessionVariables } from "@/store";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ScheduleModal from "../ScheduleModal";
import { useCartActions } from "@/hooks/cart";
import { useQueryClient } from "@tanstack/react-query";

const Appointment = ({ data: { cita } }) => {
  const { isMobile } = useMobileView();
  const [datepickerModalOpen, setDatepickerModalOpen] = useState(false);
  const { cartId } = useSessionVariables();
  const { setOpen } = useCartDrawer();
  const { addToCartMutation } = useCartActions();
  const sanityProductData = useSanityProduct(cita.store.slug.current);
  const queryClient = useQueryClient();

  const handleAddToCart = async (e, attributes) => {
    e.preventDefault();
    const productId = sanityProductData?.data.store?.variants[0]?.store?.gid;

    // @ts-ignore
    addToCartMutation.mutate({
      cartId,
      lines: [{ merchandiseId: productId, quantity: 1, attributes }],
    });
    setOpen(true);
    setDatepickerModalOpen(false);
  };

  useEffect(() => {
    if (addToCartMutation?.isLoading) return;
    queryClient.refetchQueries(["cart", cartId]);
  }, [addToCartMutation?.isLoading]);

  return (
    <Box
      my="6"
      pl={isMobile ? "20px" : "145px"}
      pr={isMobile ? "20px" : "145px"}
    >
      <Flex margin="auto" maxW={1000} gap={3} direction="column">
        <Text
          as="h1"
          margin={0}
          fontSize={isMobile ? "xl" : "2xl"}
          fontWeight={700}
        >
          {sanityProductData?.data?.store?.title} - $
          {sanityProductData?.data?.store?.variants[0]?.store?.price}
        </Text>

        <Text
          fontSize={isMobile ? "md" : "lg"}
          fontWeight="400"
          dangerouslySetInnerHTML={{
            __html: sanityProductData?.data?.store?.descriptionHtml,
          }}
          style={{ listStylePosition: "inside" }}
        />

        <Flex
          gap={isMobile ? 1 : 8}
          justifyContent={isMobile ? "space-between" : "flex-start"}
          alignItems="center"
        >
          <Button
            onClick={() => setDatepickerModalOpen(true)}
            bg="#00AA4F"
            color="white"
            rounded="full"
            _hover={{ opacity: 0.8 }}
          >
            AGENDAR CITA
          </Button>
          <ScheduleModal
            handleAddToCart={handleAddToCart}
            isOpen={datepickerModalOpen}
            onClose={() => setDatepickerModalOpen(false)}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Appointment;
