import { LogoArrowRightCI } from "@/components/Icons";
import { ICategorySelect } from "@/typesSanity/docs/categorySelect";
import { Box, Button, Grid, HStack, Spacer, Text } from "@chakra-ui/react";

interface ContainerProps {
  data: any;
  isMobile: boolean;
}

const TitleWithDescription = (props: ContainerProps) => {
  const { data, isMobile } = props;
  return (
    <Box mb="25px">
      <HStack justifyContent="space-between">
        <Text
          textTransform="uppercase"
          fontSize="22px"
          fontWeight="700"
          mb="5px"
        >
          {data?.titulo}
        </Text>
        {isMobile && (
          <>
            <Spacer />
            <Button
              variant="outline"
              borderRadius="35px"
              border="1px solid black"
              minW={data?.text_button.length > 9 ? "170px" : "120px"}
              mb="5px"
            >
              <Text textTransform="uppercase" color="black" noOfLines={1}>
                {data?.text_button}
              </Text>
            </Button>
          </>
        )}
      </HStack>
      <Box flex={100}>
        <Grid templateColumns={isMobile ? "100%" : "70% 30%"} gap={4}>
          <Text textAlign="justify">{data?.descripcion}</Text>
          {!isMobile && (
            <div style={{ justifySelf: "right", marginRight: "15px" }}>
              <Button
                rightIcon={<LogoArrowRightCI />}
                variant="outline"
                borderRadius="35px"
                border="1px solid black"
                width="150px"
              >
                <Text textTransform="uppercase" color="black" noOfLines={1}>
                  {data?.text_button}
                </Text>
              </Button>
            </div>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

const TitleNoDescription = (props: ContainerProps) => {
  const { data, isMobile } = props;
  return (
    <Box mb="25px">
      <HStack justifyContent="space-between">
        <Text
          textTransform="uppercase"
          fontSize="22px"
          fontWeight="700"
          mb="5px"
        >
          {data?.titulo}
        </Text>
        <>
          <Spacer />
          {isMobile && (
            <Button
              variant="outline"
              borderRadius="35px"
              border="1px solid black"
              minW={data?.text_button.length > 9 ? "170px" : "110px"}
              mb="5px"
            >
              <Text textTransform="uppercase" color="black" noOfLines={1}>
                {data?.text_button}
              </Text>
            </Button>
          )}
          {!isMobile && (
            <Button
              rightIcon={<LogoArrowRightCI />}
              variant="outline"
              borderRadius="35px"
              border="1px solid black"
              minW="110px"
            >
              <Text textTransform="uppercase" color="black">
                {data?.text_button}
              </Text>
            </Button>
          )}
        </>
      </HStack>
    </Box>
  );
};

const HeadTitle = (props: ContainerProps) => {
  const { data, isMobile } = props;
  return (
    <>
      {data.descripcion && data.descripcion.length > 0 && (
        <TitleWithDescription data={data} isMobile={isMobile} />
      )}
      {!data.descripcion && (
        <TitleNoDescription data={data} isMobile={isMobile} />
      )}
    </>
  );
};

export default HeadTitle;
