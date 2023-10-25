import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaInstagram } from "react-icons/fa";
import { imgSample } from "../utils";

interface ContainerProps {
  openLink: (link: string) => void;
  data: any;
}

const SliderInstagram = (props: ContainerProps) => {
  const { data, openLink } = props;

  const renderSlides = () => {
    const result = data.map(
      (
        item: {
          media_type: string;
          media_url: string;
          thumbnail_url: string;
          permalink: string;
        },
        index: number
      ) => {
        return (
          <SwiperSlide
            key={index}
            style={{ width: "280px", height: "220px" }}
            onClick={() => {
              openLink(item.permalink);
            }}
          >
            <Image
              src={item.thumbnail_url ? item.thumbnail_url : item.media_url}
              alt={item.media_type}
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.5)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FaInstagram color="white" size={30} />
            </Box>
          </SwiperSlide>
        );
      }
    );

    return result;
  };

  return (
    <Box>
      <Swiper
        slidesPerView={1.5}
        pagination={{ clickable: true }}
        spaceBetween={16}
      >
        {renderSlides()}
      </Swiper>
    </Box>
  );
};

export default SliderInstagram;
