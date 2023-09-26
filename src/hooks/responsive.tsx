import { useStore } from "@/store";
import { useMediaQuery } from "@chakra-ui/react";

export const useMobileView = () => {
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return { isMobile };
};
