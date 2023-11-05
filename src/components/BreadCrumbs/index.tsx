import { useMobileView } from "@/hooks/responsive";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IBreadCrumbsProps {
  pageTitle: string;
  pageCategory: {
    handle: string;
    title: string;
  };
  mainPage: string;
}

const BreadCrumbs = ({
  pageTitle,
  pageCategory,
  mainPage,
}: IBreadCrumbsProps) => {
  const { isMobile } = useMobileView();
  const url =
    mainPage === "colecciones"
      ? `/${mainPage}/${pageCategory?.handle}`
      : `/${mainPage}/?tags=${encodeURIComponent(pageCategory.handle)}`;

  return (
    <Breadcrumb
      textAlign="center"
      listProps={{ flexWrap: "wrap", justifyContent: "center" }}
      fontSize={isMobile ? "sm" : "base"}
      fontWeight={600}
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/">
          Inicio
        </BreadcrumbLink>
      </BreadcrumbItem>

      {mainPage === "colecciones" && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/colecciones/todas">
            Colecciones
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      {mainPage === "blogs" && (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/blogs">
            Blogs
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}

      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href={`${url}`}>
          {pageCategory?.title}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">{pageTitle}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
