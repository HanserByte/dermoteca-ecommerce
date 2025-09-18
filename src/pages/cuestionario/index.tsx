import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Divider,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { keyframes } from "@emotion/react";
import { useCartActions } from "@/hooks/cart";
import { useCartDrawer, useSessionVariables } from "@/store";
import { formatCurrencyMXN, normalizeShopifyAmount } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
// import { makeShopifyRequest } from "@/utils/shopifyFunctions";

// Animaciones simples para entrada
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Query para obtener componentes de un bundle (Shopify)

// Definición de preguntas y opciones
type SkinType = "seca" | "normal" | "mixta" | "grasa";

interface QuestionOption {
  label: string;
  value: SkinType;
}

interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "Sensación general después de limpiar tu rostro",
    options: [
      { label: "Tirantez o resequedad inmediata", value: "seca" },
      { label: "Sensación cómoda, equilibrada", value: "normal" },
      {
        label: "Brillo en frente y nariz, pero mejillas normales",
        value: "mixta",
      },
      { label: "Brillo en todo el rostro y sensación grasa", value: "grasa" },
    ],
  },
  {
    id: "q2",
    title: "Apariencia de los poros",
    options: [
      { label: "Muy pequeños o casi invisibles", value: "seca" },
      { label: "Pequeños y poco visibles", value: "normal" },
      { label: "Ligeramente visibles en zona T", value: "mixta" },
      { label: "Grandes y visibles en todo el rostro", value: "grasa" },
    ],
  },
  {
    id: "q3",
    title: "Frecuencia de aparición de brillo",
    options: [
      { label: "Rara vez, incluso con calor", value: "seca" },
      { label: "Moderada, solo después de muchas horas", value: "normal" },
      { label: "En zona T a lo largo del día", value: "mixta" },
      {
        label: "En todo el rostro pocas horas después de lavarlo",
        value: "grasa",
      },
    ],
  },
  {
    id: "q4",
    title: "Tendencia a imperfecciones (granitos, puntos negros)",
    options: [
      { label: "Casi nunca", value: "seca" },
      { label: "Muy ocasional", value: "normal" },
      { label: "En zona T con frecuencia", value: "mixta" },
      { label: "Con regularidad en todo el rostro", value: "grasa" },
    ],
  },
  {
    id: "q5",
    title: "Sensibilidad a productos nuevos",
    options: [
      {
        label: "Muy sensible: enrojece, arde o reseca con facilidad",
        value: "seca",
      },
      { label: "Poca sensibilidad", value: "normal" },
      { label: "Sensible solo en mejillas", value: "mixta" },
      { label: "Casi nunca presenta reacción", value: "grasa" },
    ],
  },
  {
    id: "q6",
    title: "Textura al tacto",
    options: [
      { label: "Áspera, con descamación en algunas zonas", value: "seca" },
      { label: "Suave y uniforme", value: "normal" },
      { label: "Suave en mejillas pero grasa en frente/nariz", value: "mixta" },
      { label: "Grasa o pegajosa", value: "grasa" },
    ],
  },
];

const RECOMMENDATIONS: Record<
  SkinType,
  {
    title: string;
    description: string;
    collections: { label: string; handle: string }[];
  }
> = {
  seca: {
    title: "Piel seca",
    description:
      "Tu piel requiere hidratación intensa, barrera reparadora y limpieza suave.",
    collections: [
      { label: "Hidratante", handle: "hidratante" },
      { label: "Reparador", handle: "reparador" },
      { label: "Limpieza", handle: "limpieza" },
    ],
  },
  normal: {
    title: "Piel normal",
    description:
      "Tu piel se siente equilibrada. Mantén una rutina simple y constante.",
    collections: [
      { label: "Limpieza", handle: "limpieza" },
      { label: "Hidratante", handle: "hidratante" },
      { label: "Protector Solar", handle: "protector-solar" },
    ],
  },
  mixta: {
    title: "Piel mixta",
    description:
      "Zonas grasas en frente y nariz, y normales en mejillas. Equilibra y protege.",
    collections: [
      { label: "Limpieza", handle: "limpieza" },
      { label: "Serum", handle: "serum" },
      { label: "Protector Solar", handle: "protector-solar" },
    ],
  },
  grasa: {
    title: "Piel grasa",
    description:
      "Controla el sebo, previene imperfecciones y protege diariamente.",
    collections: [
      { label: "Acné", handle: "acne" },
      { label: "Limpieza", handle: "limpieza" },
      { label: "Protector Solar", handle: "protector-solar" },
    ],
  },
};

export default function CuestionarioPage() {
  const [answers, setAnswers] = useState<Record<string, SkinType>>({});
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState<number>(-1); // -1 = pantalla de bienvenida
  const [bundle, setBundle] = useState<null | {
    title: string;
    image?: string;
    price?: number;
    currencyCode?: string;
    items: Array<{
      id: string;
      title: string;
      quantity: number;
      variantId?: string;
    }>;
  }>(null);

  // Loading intermedio antes de mostrar resultado
  const tips = [
    "Analizando tus respuestas...",
    "Seleccionando los mejores productos...",
    "Personalizando tu rutina...",
    "Casi listo...",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const toast = useToast();

  const [preparing, setPreparing] = useState(false);

  // Cart hooks
  const { addToCartMutation } = useCartActions();
  const { cartId } = useSessionVariables();
  const queryClient = useQueryClient();

  const { setOpen } = useCartDrawer();
  // Rotar mensajes durante la pantalla de preparación
  useEffect(() => {
    if (!preparing) return;
    setTipIndex(0);
    const id = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000);
    return () => clearInterval(id);
  }, [preparing]);

  const handleAddBundleToCart = async () => {
    try {
      if (!bundle) return;
      const lines = bundle.items
        .map((it: any) => {
          const variantId = it?.variantId || it?.merchandiseId || it?.id;
          if (!variantId) return null;
          return { merchandiseId: variantId, quantity: it.quantity || 1 };
        })
        .filter(Boolean) as Array<{ merchandiseId: string; quantity: number }>;

      if (!cartId) {
        toast({
          duration: 2500,
          status: "error",
          isClosable: true,
          description:
            "No se encontró el carrito. Intenta actualizar la página.",
        });
        return;
      }
      // @ts-ignore
      const res = await addToCartMutation.mutateAsync({ cartId, lines });
      const errors = res?.userErrors || res?.cartLinesAdd?.userErrors;
      if (errors && errors.length) {
        toast({
          duration: 3000,
          status: "error",
          isClosable: true,
          description: errors.map((e: any) => e?.message).join(". "),
        });
        return;
      }
      setOpen(true);
    } catch (e) {
      console.error("Error agregando bundle al carrito", e);
    }
  };

  // Refrescar carrito cuando termina la mutación (misma lógica que otras pantallas)
  useEffect(() => {
    if (!addToCartMutation?.isSuccess) return;
    if (!cartId) return;
    queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
  }, [addToCartMutation?.isSuccess, cartId]);

  const allAnswered = useMemo(
    () => QUESTIONS.every((q) => !!answers[q.id]),
    [answers]
  );

  const skinType: SkinType | null = useMemo(() => {
    if (!allAnswered) return null;
    const counts: Record<SkinType, number> = {
      seca: 0,
      normal: 0,
      mixta: 0,
      grasa: 0,
    };

    Object.values(answers).forEach((v) => (counts[v] += 1));

    let winner: SkinType = "seca";
    (Object.keys(counts) as SkinType[]).forEach((k) => {
      if (counts[k] > counts[winner]) winner = k;
    });

    return winner;
  }, [answers, allAnswered]);

  const handleReset = () => {
    setAnswers({});
    setStep(-1);
    setCompleted(false);
  };

  // Cargar bundle de ejemplo cuando se completa el cuestionario
  useEffect(() => {
    if (!completed) return;

    const loadBundle = async () => {
      try {
        const res = await fetch(
          `/api/bundle?id=${encodeURIComponent(
            "gid://shopify/Product/10167336010040"
          )}`
        );
        const data = await res.json();
        console.log(data, "bundle data");
        const p = data?.product;
        const nodes = p?.bundleComponents?.nodes || [];
        const image =
          p?.media?.nodes?.[0]?.preview?.image?.url ||
          p?.media?.nodes?.[0]?.image?.url;
        const price = normalizeShopifyAmount(
          p?.priceRange?.minVariantPrice?.amount ??
            p?.priceRange?.maxVariantPrice?.amount
        );
        const currencyCode =
          p?.priceRange?.minVariantPrice?.currencyCode ??
          p?.priceRange?.maxVariantPrice?.currencyCode;
        setBundle({
          title: p?.title || "Bundle sugerido",
          image,
          price: price ?? undefined,
          currencyCode,
          items: nodes.map((n: any) => ({
            id: n?.componentProduct?.id,
            title: n?.componentProduct?.title,
            quantity: n?.quantity || 1,
            variantId: n?.componentProduct?.variants?.nodes?.[0]?.id,
          })),
        });
      } catch (e) {
        console.error("Error cargando bundle:", e);
      }
    };

    loadBundle();
  }, [completed]);

  return (
    <Box maxW="2560px" m="0 auto" id="main-container-cuestionario">
      <NavBar dataN={{ isBlackNavBar: true }} />

      <Container maxW="container.lg">
        {/* Intro/Hero */}
        {step === -1 && !completed && (
          <Box
            overflow="hidden"
            bgImage="url('https://assets.octaneai.com/4651courpto4gui2/quizimg/13fb24c3-c118-4f93-a074-d33944814b8e')"
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
            w="100vw"
            position="relative"
            left="50%"
            transform="translateX(-50%)"
          >
            <Flex
              minH={{ base: "100dvh", md: "100vh" }}
              align="center"
              justify="center"
              px={{ base: 4, md: 8 }}
            >
              <Box
                bg="rgba(255,255,255,0.92)"
                p={{ base: 6, md: 10 }}
                rounded="md"
                shadow="md"
                maxW="900px"
                w="full"
                textAlign="center"
              >
                <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} mb={3}>
                  Crea Tu Rutina con Dermoteca
                </Heading>
                <Text
                  color="gray.700"
                  maxW="720px"
                  mx="auto"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  ¿No sabes qué productos son los más adecuados para ti? Te
                  ayudaremos a encontrar los productos adecuados para tu piel
                  con tu propio tratamiento Dermoteca personalizado, ¡todo en
                  menos de 60 segundos! Con sólo 8 clics...
                </Text>
                <Button
                  mt={6}
                  onClick={() => setStep(0)}
                  bg="#2F2F2F"
                  _hover={{ bg: "#1f1f1f" }}
                  color="white"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  borderRadius="md"
                  px={8}
                >
                  ¿Empezamos?
                </Button>
              </Box>
            </Flex>
          </Box>
        )}

        {/* Paso a paso */}
        {preparing && (
          <Flex
            minH={{ base: "100dvh", md: "100vh" }}
            align="center"
            justify="center"
            py={10}
          >
            <Box textAlign="center">
              <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} mb={3}>
                Estamos preparando tu rutina
              </Heading>
              <Text color="gray.700" fontSize={{ base: "md", md: "lg" }}>
                {tips[tipIndex]}
              </Text>
            </Box>
          </Flex>
        )}
        {!preparing && step >= 0 && step < QUESTIONS.length && !completed && (
          <Flex
            minH={{ base: "100dvh", md: "100vh" }}
            align="center"
            justify="center"
            py={10}
          >
            <Box
              key={step}
              w="full"
              maxW="lg"
              textAlign="center"
              animation={`${fadeInUp} 300ms ease-out both`}
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="semibold"
                lineHeight="1.2"
                color="gray.900"
                mb={8}
                animation={`${fadeInUp} 400ms ease-out both`}
                sx={{ animationDelay: "40ms" }}
              >
                {QUESTIONS[step].title}
              </Heading>
              <Stack spacing={3}>
                {QUESTIONS[step].options.map((opt, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    borderRadius="full"
                    size="md"
                    transition="background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease"
                    _hover={{
                      bg: "#00AA4F",
                      color: "white",
                      borderColor: "#00AA4F",
                    }}
                    animation={`${fadeInUp} 420ms ease-out both`}
                    sx={{ animationDelay: `${80 + i * 60}ms` }}
                    onClick={() =>
                      (function () {
                        const q = QUESTIONS[step];
                        const val = opt.value as SkinType;
                        setAnswers((prev) => ({ ...prev, [q.id]: val }));
                        const next = step + 1;
                        if (next < QUESTIONS.length) {
                          setStep(next);
                        } else {
                          setStep(QUESTIONS.length);
                          // loading intermedio de 6s
                          setPreparing(true);
                          setTimeout(() => {
                            setCompleted(true);
                            setPreparing(false);
                          }, 6000);
                          try {
                            localStorage.setItem(
                              "cuestionarioDermoteca",
                              JSON.stringify({
                                answers: {
                                  ...answers,
                                  [QUESTIONS[step].id]: val,
                                },
                              })
                            );
                          } catch (e) {}
                        }
                      })()
                    }
                  >
                    {opt.label}
                  </Button>
                ))}
              </Stack>
              <Button
                variant="link"
                mt={8}
                onClick={() => setStep(step <= 0 ? -1 : step - 1)}
              >
                ← Volver
              </Button>
            </Box>
          </Flex>
        )}

        {/* Resultado */}
        {completed && (
          <Box
            id="result-cuestionario"
            minH={{ base: "auto", md: "100vh" }}
            w={{ base: "100%", md: "100vw" }}
            position="relative"
            left={{ base: "auto", md: "50%" }}
            transform={{ base: "none", md: "translateX(-50%)" }}
            bgGradient="linear(to-b, #F7FFF9, #F0FFF5)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={{ base: 8, md: 16 }}
            px={{ base: 4, md: 0 }}
            overflowX="hidden"
            mt={{ base: 4, md: "10%" }}
          >
            {skinType && (
              <Box
                maxW="6xl"
                mx="auto"
                p={{ base: 6, md: 12 }}
                borderRadius="2xl"
                bg="white"
                boxShadow="xl"
                textAlign="center"
              >
                <Heading
                  as="h2"
                  fontSize={{ base: "xl", md: "4xl" }}
                  mb={{ base: 2, md: 3 }}
                  color="gray.900"
                >
                  Bienvenido a tu rutina personalizada de Dermoteca
                </Heading>
                <Text
                  color="gray.700"
                  maxW={{ base: "100%", md: "3xl" }}
                  mx="auto"
                >
                  Una experiencia de cuidado diseñada a tu medida. En Dermoteca
                  creemos en la simplicidad de lujo: fórmulas eficaces, pasos
                  claros y resultados reales.
                </Text>
                <Text
                  color="gray.700"
                  maxW={{ base: "100%", md: "3xl" }}
                  mx="auto"
                  mt={2}
                >
                  A continuación te mostramos cómo aplicar por capas tus
                  productos recomendados. Si quieres profundizar en la técnica
                  de layering, nuestra Guía de Capas está aquí para ayudarte.
                </Text>
                <Divider my={8} />
                <Text
                  fontSize="xs"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  color="gray.500"
                  mb={2}
                >
                  Tu piel
                </Text>
                <Heading
                  as="h3"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  mb={2}
                  color="gray.900"
                >
                  {RECOMMENDATIONS[skinType].title}
                </Heading>
                <Text color="gray.700">
                  {RECOMMENDATIONS[skinType].description}
                </Text>

                {/* Sección de pasos por capas (AM) */}
                <Stack spacing={{ base: 6, md: 8 }} textAlign="left" mt={6}>
                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      LIMPIEZA
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Gel limpiador suave
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Comienza eliminando impurezas sin resecar. Prepara la piel
                      para recibir el resto de tu rutina.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: primer paso, mañana y noche, sobre
                      piel húmeda. Enjuaga con agua tibia.
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      TRATAMIENTO
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Sérum antioxidante (Vitamina C)
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Ilumina, unifica el tono y protege frente a los radicales
                      libres.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: tras la limpieza, 3–5 gotas en rostro
                      y cuello. Deja absorber 60 segundos.
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      HIDRATACIÓN
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Crema hidratante barrera
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Rellena, calma y sella la humedad para una piel suave y
                      flexible.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: después del sérum, una cantidad del
                      tamaño de una avellana. Masajea hasta absorber.
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      PROTECCIÓN SOLAR
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Protector solar de amplio espectro
                    </Heading>
                    <Text mt={2} color="gray.700">
                      El paso imprescindible cada mañana para proteger y
                      potenciar resultados.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: último paso AM. Reaplica cada 2–3
                      horas si estás al exterior.
                    </Text>
                  </Box>
                </Stack>

                <Divider my={10} />

                <Heading
                  as="h4"
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="gray.900"
                >
                  Rutina de Noche (PM)
                </Heading>
                <Divider my={6} />
                <Stack spacing={{ base: 6, md: 8 }} textAlign="left">
                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      LIMPIEZA
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Doble limpieza (opcional)
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Desmaquilla y elimina residuos del día sin agredir la
                      barrera cutánea.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: aceite/bálsamo + gel suave. Enjuaga
                      entre pasos.
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      TRATAMIENTO
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Activos de renovación (retinoides o exfoliantes suaves)
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Ayudan a mejorar textura, tono e imperfecciones mientras
                      duermes.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: según tolerancia, 2–4 noches por
                      semana. Evita contorno de ojos y labios.
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="xs"
                      letterSpacing="widest"
                      color="gray.500"
                      mb={2}
                    >
                      NUTRICIÓN Y REPARACIÓN
                    </Text>
                    <Heading as="h5" size="sm" color="gray.900">
                      Crema nutritiva
                    </Heading>
                    <Text mt={2} color="gray.700">
                      Repara la barrera y recupera la comodidad de la piel para
                      amanecer luminosa.
                    </Text>
                    <Text mt={2} color="gray.600" fontSize="sm">
                      Aplicación en capas: último paso PM. Puedes sellar con
                      unas gotas de aceite si tu piel lo necesita.
                    </Text>
                  </Box>
                </Stack>

                <Divider my={10} />

                <Heading
                  as="h4"
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="gray.900"
                >
                  Tu paquete Dermoteca
                </Heading>
                <Text color="gray.700" maxW="3xl" mx="auto" mt={2}>
                  Seleccionamos esta combinación para acompañarte en tu
                  objetivo. Puedes añadir el paquete completo al carrito o
                  explorar cada producto.
                </Text>

                {bundle && (
                  <Box mt={8}>
                    <Flex
                      direction={{ base: "column", md: "row" }}
                      gap={6}
                      p={5}
                      borderRadius="2xl"
                      bg="#F9F6F3"
                      boxShadow="0 10px 25px rgba(0,0,0,0.08)"
                      border="1px solid #E7D4C7"
                      align={{ base: "stretch", md: "center" }}
                    >
                      {/* Imagen */}
                      {bundle.image && (
                        <Box
                          flexShrink={0}
                          overflow="hidden"
                          borderRadius="xl"
                          w={{ base: "100%", md: "280px" }}
                        >
                          <img
                            src={bundle.image}
                            alt={bundle.title}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        </Box>
                      )}

                      {/* Info */}
                      <Box flex="1">
                        <Text
                          fontSize="xs"
                          textTransform="uppercase"
                          letterSpacing="widest"
                          color="#7A5E4C"
                        >
                          Bundle sugerido
                        </Text>
                        <Heading as="h4" size="md" mt={1} color="#2F2F2F">
                          {bundle.title}
                        </Heading>
                        {bundle.price && (
                          <Text mt={1} fontWeight="bold" color="#2F2F2F">
                            {formatCurrencyMXN(
                              bundle.price,
                              bundle.currencyCode
                            )}
                          </Text>
                        )}

                        <Stack spacing={2} mt={4}>
                          {bundle.items.map((it) => (
                            <Flex
                              key={it.id}
                              direction={{ base: "column", sm: "row" }}
                              gap={{ base: 1, sm: 0 }}
                              justify="space-between"
                              align={{ base: "flex-start", sm: "center" }}
                              bg="white"
                              borderRadius="lg"
                              px={4}
                              py={3}
                              border="1px solid #EFE7E2"
                            >
                              <Text fontWeight={500} color="#2F2F2F" w="full">
                                {it.title}
                              </Text>
                              <Text color="#8A8A8A">x{it.quantity}</Text>
                            </Flex>
                          ))}
                        </Stack>

                        <Flex
                          gap={3}
                          mt={5}
                          direction={{ base: "column", md: "row" }}
                        >
                          <Button
                            bg="#00AA4F"
                            _hover={{ bg: "#009344" }}
                            color="white"
                            borderRadius="full"
                            onClick={handleAddBundleToCart}
                            w={{ base: "full", md: "auto" }}
                          >
                            Agregar bundle al carrito
                          </Button>
                          <Button
                            variant="ghost"
                            borderRadius="full"
                            as={Link}
                            href="/bundle"
                            w={{ base: "full", md: "auto" }}
                          >
                            Ver todos los bundles
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                )}

                <Divider my={8} />

                <Text
                  fontWeight="semibold"
                  color="gray.800"
                  mb={4}
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Paquete recomendado
                </Text>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={3}
                  justify="center"
                >
                  {RECOMMENDATIONS[skinType].collections.map((c) => (
                    <Button
                      as={Link}
                      key={c.handle}
                      href={`/colecciones/${c.handle}`}
                      bg="#00AA4F"
                      color="white"
                      _hover={{ bg: "#009344" }}
                      borderRadius="full"
                      w={{ base: "full", md: "auto" }}
                    >
                      {c.label}
                    </Button>
                  ))}
                </Stack>

                <Button
                  as={Link}
                  href={`/colecciones/todas`}
                  mt={6}
                  size="sm"
                  variant="link"
                  color="#00AA4F"
                >
                  Ver todas las colecciones
                </Button>

                <Flex justify="center" mt={6}>
                  <Button size="sm" variant="link" onClick={handleReset}>
                    ← Volver al inicio
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
