import { Box, IconButton } from "@chakra-ui/react";
import { client } from "@/lib/sanity.client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const query = `*[_type == "whatsapp"]`;
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setData(data);
    }

    fetchData();
  }, [query]);

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="10">
      {data && data.length > 0 && (
        <IconButton
          _hover={{ opacity: 0.7 }}
          aria-label="WhatsApp"
          icon={<FaWhatsapp />}
          size="lg"
          zIndex=""
          bg={data[0].color}
          color={data[0].color_icono}
          borderRadius="30px"
          onClick={() =>
            window.open(`https://api.whatsapp.com/send?phone=${data[0].phone}`)
          }
        />
      )}
    </Box>
  );
};

export default WhatsAppButton;
