"use client";
import React from "react";
import { PortableText as PortableTextToReact } from "@portabletext/react";
import { Text, useMediaQuery } from "@chakra-ui/react";
import { useStore } from "@/store";

const PortableText = ({ blocks }) => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  const myPortableTextComponents = {
    types: {
      image: ({ value }) => <img src={value.imageUrl} />,
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a href={value.url}>{value.text}</a>
        ) : (
          <div className="callToAction">{value.text}</div>
        ),
    },

    marks: {
      AlignCenter: ({ children }: { children: React.ReactNode }) => (
        <Text align="center" display="inherit">
          {children}
        </Text>
      ),
      AlignJustify: ({ children }: { children: React.ReactNode }) => (
        <Text align="justify">{children}</Text>
      ),
      AlignLeft: ({ children }: { children: React.ReactNode }) => (
        <Text align="left">{children}</Text>
      ),
      AlignRight: ({ children }: { children: React.ReactNode }) => (
        <Text align="right">{children}</Text>
      ),
      link: ({ children, value }) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <a href={value.href} rel={rel}>
            {children}
          </a>
        );
      },
      strong: ({ children }: { children: React.ReactNode }) => (
        <Text as={"span"} fontWeight={600} fontSize="md">
          {children}
        </Text>
      ),
    },
    block: {
      h5: ({ children }: { children: React.ReactNode }) => {
        return (
          <Text fontWeight={700} fontSize={"md"}>
            {children[0].props.text}
          </Text>
        );
      },
      normal: ({ children }: { children: React.ReactNode }) => {
        return <Text mb={2}>{children}</Text>;
      },
    },
  };

  return (
    <PortableTextToReact value={blocks} components={myPortableTextComponents} />
  );
};

export default PortableText;
