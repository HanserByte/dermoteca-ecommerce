import { useAllTags, useAllVendors } from "@/hooks/products";
import { useStore } from "@/store";
import { COLORS } from "@/utils/constants";
import {
  Button,
  Checkbox,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const VendorSelector = () => {
  const allVendorData = useAllVendors();
  const [vendors, setVendors] = useState([]);
  const router = useRouter();
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);
  // @ts-ignore
  const queryVendors = decodeURIComponent(router?.query?.vendors || "");

  const handleCheckboxSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vendor = encodeURIComponent(e.target.value);
    const queryVendorsArray = queryVendors
      ?.split(",")
      .filter((vendor: string) => vendor !== "undefined" && vendor !== "");
    // Add vendor to query params
    if (!queryVendorsArray?.includes(e.target.value)) {
      router.query.vendors =
        queryVendorsArray.length > 0
          ? [encodeURIComponent(queryVendorsArray.join(",")), vendor].join(",")
          : vendor;
    } else {
      // Remove vendor from query params
      router.query.vendors = encodeURIComponent(
        queryVendorsArray
          ?.filter((vendorItem: string) => vendorItem !== e.target.value)
          .join(",")
      );
    }

    router.push(router);
  };

  useEffect(() => {
    if (allVendorData && vendors.length === 0) {
      console.log(allVendorData);
      // let arr: any = [];
      // allVendorData.data.products.edges.map((vendor: any) => {
      //   arr.push(vendor.node.vendor);
      // });
      // arr = arr.filter(
      //   (item: string, index: number) => arr.indexOf(item) === index
      // );
      setVendors(allVendorData);
    }
  }, [allVendorData, vendors]);

  return (
    <>
      {isMobile ? (
        <VStack mt={8} alignItems="start" gap={1}>
          <Text fontSize="lg" color={COLORS.GREEN} fontWeight={600}>
            Marcas
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" columnGap={4}>
            {vendors.length !== 0 &&
              vendors.map((vendor: any) => {
                return (
                  <Checkbox
                    colorScheme="green"
                    size="md"
                    value={vendor}
                    onChange={handleCheckboxSelect}
                    key={vendor}
                    isChecked={queryVendors?.includes(vendor)}
                    fontWeight={600}
                  >
                    {vendor}
                  </Checkbox>
                );
              })}
          </Grid>
        </VStack>
      ) : (
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              variant="ghost"
              _hover={{
                bg: "#E7D4C7",
              }}
            >
              Marcas <GoChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Grid templateColumns="repeat(2, 1fr)">
                {vendors.length !== 0 &&
                  vendors.map((vendor: any) => {
                    return (
                      <Checkbox
                        colorScheme="green"
                        size="md"
                        value={vendor}
                        onChange={handleCheckboxSelect}
                        key={vendor}
                        isChecked={queryVendors?.includes(vendor)}
                        fontWeight={600}
                      >
                        {vendor}
                      </Checkbox>
                    );
                  })}
              </Grid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default VendorSelector;
