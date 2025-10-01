import {
  Box,
  Grid,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";

export default function BrandsMenu() {
  const [brands, setBrands] = useState<{ name: string; link: string }[]>([]);
  const [search, setSearch] = useState("");
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const filtered = brands.filter((b) =>
    normalize(b.name).includes(normalize(search))
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/brands", { cache: "no-store" });
        const data: { title: string; handle: string }[] = await res.json();
        const items = data.map((c) => ({
          name: c.title,
          link: `/colecciones/${c.handle}`,
        }));
        setBrands(items);
      } catch (e) {
        console.error("Error fetching brands:", e);
      }
    };
    load();
  }, []);

  return (
    <Box
      left="0"
      width="100%"
      bg="white"
      boxShadow="lg"
      zIndex={999}
      mt={2}
      padding={4}
    >
      <Box padding={8}>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none">
            <TfiSearch />
          </InputLeftElement>
          <Input
            placeholder="Buscar marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="gray.50"
            _placeholder={{ color: "gray.500" }}
          />
        </InputGroup>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={4}
        >
          {filtered.map((brand) => (
            <VStack align="left" key={brand.link}>
              <Text
                as={Link}
                href={brand.link}
                fontSize="2xl"
                _hover={{ textDecoration: "underline" }}
              >
                {brand.name}
              </Text>
            </VStack>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
