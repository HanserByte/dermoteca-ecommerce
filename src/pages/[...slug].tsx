import { client } from "@/lib/sanity.client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      if (slug != undefined && slug != "") {
        const query = `
            *[_type == "pages" && slug.current == "${slug}"] {
              _id,
              title,
              isBlackNavBar,
              "slug": slug.current,
              componentes[]-> {
                ...
              }
            }[0]
          `;
        const dataHome = await client.fetch(query);
        setData(dataHome);
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data && <NavBar dataN={data} />}
      {data &&
        data.componentes.map((componente: any) => (
          <ComponentRenderer
            key={componente._id}
            component={componente._type}
            data={componente}
          />
        ))}
      {data && <Footer />}
    </>
  );
};

const ComponentRenderer = ({
  component,
  data,
}: {
  component: string;
  data: any;
}) => {
  const Component =
    require(`../components/componentsSanity/${component}`).default;
  return <Component data={data} />;
};

export default Page;
