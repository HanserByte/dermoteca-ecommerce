import { useMobileView } from "@/hooks/responsive";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IBreadCrumbsProps {
  productTitle: string;
  productCollection: {
    handle: string;
    title: string;
  };
}

const BreadCrumbs = ({
  productTitle,
  productCollection,
}: IBreadCrumbsProps) => {
  const { isMobile } = useMobileView();

  return (
    <Breadcrumb
      listProps={{ flexWrap: "wrap", justifyContent: "center" }}
      fontSize={isMobile ? "sm" : "base"}
      fontWeight={600}
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/">
          Inicio
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/collections/all">
          Colecciones
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          href={`/collections/${productCollection?.handle}`}
        >
          {productCollection?.title}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{productTitle}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
