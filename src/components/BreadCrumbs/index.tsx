import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const BreadCrumbs = ({ productTitle }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/" fontWeight={600}>
          Inicio
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/collections/all" fontWeight={600}>
          Colecciones
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#" fontWeight={600}>
          {productTitle}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
