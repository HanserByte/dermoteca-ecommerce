import React from "react";
import ContainerDermo from "../Common/ContainerDermo";
import { Box, Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import PortableText from "../PortableText";
import { COLORS } from "@/utils/constants";
import Link from "next/link";
import { useMobileView } from "@/hooks/responsive";

interface IProps {
  data: {
    title: string;
    subtitle: any;
    cards: {
      _key: string;
      message: string;
      title: string;
      urlLabel: string;
      url: string;
    }[];
  };
}

const ConsultorioCards = ({ data }: IProps) => {
  const { isMobile } = useMobileView();
  return (
    <ContainerDermo pt="37px" pb="37px">
      <Stack
        gap={5}
        alignItems="start"
        flexDirection={isMobile ? "column" : "row"}
      >
        <VStack alignItems="start" w={isMobile ? "auto" : "40%"}>
          <Text fontWeight={700} fontSize="xl">
            {data?.title}
          </Text>
          <PortableText blocks={data?.subtitle} />
        </VStack>

        <Grid
          w="full"
          templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
          gap={5}
        >
          {data?.cards?.map((card) => (
            <VStack alignItems="start" borderRadius={10} p={50} bg="#F8F9FA">
              <Text fontWeight={500} fontSize="lg">
                {card?.title}
              </Text>

              <Text
                _hover={{ textDecoration: "underline" }}
                as={Link}
                href={`${card?.url.includes("@") ? "mailto:" : ""}${card?.url}`}
                color={COLORS.GREEN}
                fontWeight={600}
                fontSize="sm"
              >
                {card?.urlLabel}
              </Text>

              <Text fontWeight={400} fontSize="sm">
                {card?.message}
              </Text>
            </VStack>
          ))}
        </Grid>
      </Stack>
    </ContainerDermo>
  );
};

export default ConsultorioCards;
