import { Box, Container, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import SliderInstagram from "./SliderInstagram";
import GridInstagram from "./GridInstagram";
import { client } from "@/lib/sanity.client";
import { useMobileView } from "@/hooks/responsive";

const NEXT_PUBLIC_ID_INSTAGRAM = process.env.NEXT_PUBLIC_ID_INSTAGRAM;
const NEXT_PUBLIC_ID_PROJECT = process.env.NEXT_PUBLIC_ID_PROJECT;
const URI_FACEBOOK = "https://graph.facebook.com/v16.0";
const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET;
const QUERY_FACEBOOK =
  "media?fields=media_url,media_type,thumbnail_url,permalink&access_token=";

const Instagram = ({ data }: { data: any }) => {
  const { isMobile } = useMobileView();
  const [dataInstagram, setDataInstagram] = useState([]);
  const toast = useToast();

  const query = "*[_type == 'settings']";

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const updateTokenApi = async (_id: string, apiExtendValue: string) => {
    console.log("// before EXTEND TOKEN");
    const documentId = _id;
    await client
      .patch(documentId)
      .set({
        "instagramApi.apiExtend": apiExtendValue,
        "instagramApi.needLoad": false,
      })
      .commit();
    console.log("// after EXTEND TOKEN");
    return true;
  };

  const loadInstagram = useCallback(async (token: string) => {
    const URI = `${URI_FACEBOOK}/${NEXT_PUBLIC_ID_INSTAGRAM}/${QUERY_FACEBOOK}${token}`;
    const result = await fetch(URI);
    console.log(result);
    // setDataInstagram(result.data.data);
  }, []);

  const extendToken = useCallback(async () => {
    const data = await client.fetch(query);
    if (
      data.length > 0 &&
      data[0].instagramApi &&
      data[0].instagramApi.needLoad
    ) {
      console.log("// OPEN EXTEND TOKEN");
      const url = `${URI_FACEBOOK}/oauth/access_token?grant_type=fb_exchange_token&client_id=${NEXT_PUBLIC_ID_PROJECT}&client_secret=${APP_SECRET}&fb_exchange_token=${data[0].instagramApi.apiOriginal}`;
      try {
        const response = await fetch(url);
        // const extendedToken = response.data.access_token;
        // console.log(extendedToken, "extendedToken");
        // await updateTokenApi(data[0]._id, extendedToken);
        // await loadInstagram(extendedToken);
      } catch (error) {
        console.log("Error al extender el token:", error);
        return null;
      }
    } else {
      try {
        await loadInstagram(data[0].instagramApi.apiExtend);
      } catch (error) {
        console.log("ERROR INSTAGRAM", error);
      }
    }
  }, [loadInstagram]);

  useEffect(() => {
    extendToken();
  }, [extendToken]);

  return (
    <Container w={"100%"} maxW={"1400px"}>
      <Box>
        <Text
          textAlign="center"
          fontSize="30px"
          fontFamily="Castoro Titling"
          color="#836a59"
          fontWeight="semibold"
          mb="40px"
        >
          FORMA PARTE DE NUESTRA COMUNIDAD EN INSTAGRAM
        </Text>
        {isMobile && (
          <SliderInstagram data={dataInstagram} openLink={openLink} />
        )}
        {!isMobile && dataInstagram.length > 0 && (
          <GridInstagram openLink={openLink} data={dataInstagram} />
        )}
      </Box>
    </Container>
  );
};

export default Instagram;
