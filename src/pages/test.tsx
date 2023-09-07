import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store";
import { Grid, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const test = () => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  return (
    <>
      <Grid
        templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
        gap={3}
      >
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={1070}
        />
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
      </Grid>

      <Grid
        templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)"}
        gap={3}
      >
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
        <ProductCard
          imageSrc="https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          title="Physiopure Dúo"
          price={470}
        />
      </Grid>
    </>
  );
};

export default test;
