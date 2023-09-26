import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  IProducts,
  IRecommendedProducts,
} from "@/typesSanity/docs/recommendedProducts";
import { sanityImage } from "@/lib/sanity.image";

interface ContainerProps {
  openLink?: (link: string) => void;
  data: IRecommendedProducts;
}

const SliderInstagram = (props: ContainerProps) => {
  const { data, openLink } = props;

  const renderSlides = () => {
    const result = data.productos.map((item: IProducts, index: number) => {
      return (
        <SwiperSlide
          key={index}
          style={{ width: "280px", height: "220px" }}
          onClick={() => {
            openLink && openLink(item.titulo_producto);
          }}
        >
          <Image
            src={sanityImage(item.imagen_producto.asset._ref).url()}
            alt={item.titulo_producto}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </SwiperSlide>
      );
    });

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
