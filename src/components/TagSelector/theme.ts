import { COLORS } from "@/utils/constants";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Checkbox: {
      // Customize the checkbox when checked
      baseStyle: {
        control: {
          _checked: {
            // Change the background color when checked
            bg: COLORS.GREEN,
            borderColor: COLORS.GREEN, // You can also change the border color if desired
          },
        },
      },
    },
  },
});

export default theme;
