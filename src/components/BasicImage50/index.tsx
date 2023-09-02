import { Grid, GridItem, useMediaQuery, Image } from "@chakra-ui/react";
import ContainerDermo from "../Common/ContainerDermo";
import { useStore } from "@/store";
import { IImage50 } from "@/typesSanity/docs/image50";
import { sanityImage } from "@/lib/sanity.image";

interface IContainerProps {
  data: IImage50;
}

const BasicImage50 = (props: IContainerProps) => {
  const { data } = props;
  const { value } = useStore();
  const [isMobile] = useMediaQuery(`(max-width: ${value})`);

  return (
    <ContainerDermo
      pt={data.isPaddingTop ? "37px" : "0px"}
      pb={data.isPaddingBottom ? "37px" : "0px"}
    >
      <Grid templateColumns={"50% 50%"} gap="15px">
        <GridItem>
          <Image
            src={sanityImage(data.img_uno.asset._ref).url()}
            alt="image-uno"
            w="100%"
            height="100%"
          />
        </GridItem>
        <GridItem>
          <Image
            src={sanityImage(data.img_dos.asset._ref).url()}
            alt="image-dos"
            w="100%"
            height="100%"
          />
        </GridItem>
      </Grid>
    </ContainerDermo>
  );
};

export default BasicImage50;
