import { COLORS } from "@/utils/constants";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/router";
import { useMobileView } from "@/hooks/responsive";

interface IProductVariantSelectorProps {
  variants: IVariant[];
}

interface IVariant {
  id: string;
  title: string;
}

const ProductVariantSelector = ({ variants }: IProductVariantSelectorProps) => {
  const { isMobile } = useMobileView();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const router = useRouter();
  // @ts-ignore
  const queryVariant = decodeURIComponent(router.query.variant);

  const handleVariantSelection = (variant: IVariant) => {
    const variantParam = encodeURIComponent(variant.title);
    router.query.variant = variantParam;
    router.push(router);
    onClose();
  };

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          w={isMobile ? "full" : "auto"}
          rounded="full"
          pr={2}
          color="white"
          bg={COLORS.GREEN}
          _hover={{ opacity: 0.8 }}
        >
          {queryVariant !== "undefined" ? queryVariant : variants[0].title}
          <ChevronDownIcon ml={2} boxSize={6} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w="min-content">
        <PopoverArrow />
        <PopoverBody w="min-content">
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={2}>
            {variants.map((variant) => (
              <Button
                rounded="full"
                bg={queryVariant === variant.title ? COLORS.GREEN : "white"}
                color={queryVariant === variant.title ? "white" : "black"}
                onClick={() => handleVariantSelection(variant)}
                key={variant.id}
                _hover={{ opacity: 0.8 }}
              >
                {variant.title}
              </Button>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProductVariantSelector;
