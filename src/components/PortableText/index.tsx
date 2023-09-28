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
    },
  };

  return (
    <PortableTextToReact value={blocks} components={myPortableTextComponents} />
  );
};

export default PortableText;
