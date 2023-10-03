import React from "react";
import ContainerDermo from "../Common/ContainerDermo";
import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import PortableText from "../PortableText";
import { COLORS } from "@/utils/constants";
import Link from "next/link";

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
  return (
    <ContainerDermo pt="37px" pb="37px">
      <HStack gap={5} alignItems="start">
        <VStack alignItems="start" w="40%">
          <Text fontWeight={700} fontSize="xl">
            {data?.title}
          </Text>
          <PortableText blocks={data?.subtitle} />
        </VStack>

        <Grid w="full" templateColumns={"repeat(2, 1fr)"} gap={5}>
          {data?.cards?.map((card) => (
            <VStack alignItems="start" borderRadius={10} p={50} bg="#F8F9FA">
              <Text fontWeight={500} fontSize="lg">
                {card?.title}
              </Text>

              <Text
                _hover={{ textDecoration: "underline" }}
                as={Link}
                href={card?.url}
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
      </HStack>
    </ContainerDermo>
  );
};

export default ConsultorioCards;
