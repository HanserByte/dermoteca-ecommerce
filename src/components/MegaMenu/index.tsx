import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export const megaMenuData = {
  "Tipo de Piel": [
    { name: "Piel Grasa", link: "/colecciones/piel-grasa" },
    { name: "Piel Madura", link: "/colecciones/piel-madura" },
    { name: "Piel Seca", link: "/colecciones/piel-seca" },
    { name: "Piel Sensible", link: "/colecciones/piel-sensible" },
    { name: "Todo Tipo de Piel", link: "/colecciones/todo-tipo-de-piel" },
  ],
  Usos: [
    { name: "Acné", link: "/colecciones/acne" },
    { name: "Anti Aging", link: "/colecciones/anti-aging" },
    { name: "Calmante", link: "/colecciones/calmante" },
    { name: "Caspa", link: "/colecciones/caspa" },
    { name: "Despigmentante", link: "/colecciones/despigmentante" },
    { name: "Desmaquillante", link: "/colecciones/desmaquillante" },
    { name: "Exfoliante", link: "/colecciones/exfoliante" },
    { name: "Fortalecedor", link: "/colecciones/fortalecedor" },
    { name: "Hidratante", link: "/colecciones/hidratante" },
    { name: "Protector", link: "/colecciones/protector" },
    { name: "Protector Solar", link: "/colecciones/protector-solar" },
    { name: "Reparador", link: "/colecciones/reparador" },
    { name: "Roseace", link: "/colecciones/roseace" },
    { name: "Limpieza", link: "/colecciones/limpieza" },
  ],
  "Área de Aplicación": [
    { name: "Cabello", link: "/colecciones/cabello" },
    { name: "Cejas", link: "/colecciones/cejar" },
    { name: "Cuello", link: "/colecciones/cuello" },
    { name: "Cuero Cabelludo", link: "/colecciones/cuero-cabelludo" },
    { name: "Cuerpo", link: "/colecciones/cuerpo" },
    { name: "Labios", link: "/colecciones/labios" },
    { name: "Manos", link: "/colecciones/manos" },
    { name: "Ojos", link: "/colecciones/ojos" },
    { name: "Oral", link: "/colecciones/oral" },
    { name: "Pestañas", link: "/colecciones/pestenas" },
    { name: "Pies", link: "/colecciones/pies" },
    { name: "Rostro", link: "/colecciones/rostro" },
  ],
  "Tipo de Producto": [
    { name: "Bálsamo", link: "/colecciones/balsamo" },
    { name: "Crema", link: "/colecciones/crema" },
    { name: "Dermocosmético", link: "/colecciones/dermocosmetico" },
    { name: "Gel", link: "/colecciones/gel" },
    { name: "Jabón en Barra", link: "/colecciones/jabon-en-barra" },
    { name: "Limpiador Líquido", link: "/colecciones/limpiador-liquido" },
    { name: "Mascarilla", link: "/colecciones/mascarilla" },
    { name: "Serum", link: "/colecciones/serum" },
    { name: "Shampoo", link: "/colecciones/shampoo" },
    { name: "Spray", link: "/colecciones/spray" },
    { name: "Suplemento", link: "/colecciones/suplemento" },
    { name: "Tonico", link: "/colecciones/tonico" },
  ],
};

export default function MegaMenu() {
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
        <Grid templateColumns="repeat(4, 1fr)">
          {Object.entries(megaMenuData).map(([category, items]) => (
            <VStack align={"left"} key={category}>
              <Text fontSize="xl" fontWeight="bold">
                {category}
              </Text>
              {items.map((item) => (
                <Link
                  key={item.link}
                  style={{ fontSize: "18px" }}
                  href={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
