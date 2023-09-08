import { client } from '@/lib/sanity.client'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { createCart } from '@/utils/shopifyFunctions'
import { useCreateCart } from '@/hooks/cart'

const Home = () => {
  const [data, setData] = useState<any>()
  const { createCart } = useCreateCart()

  const query = `
    *[_type == "homeDoc"] {
      _id,
      title,
      "slug": slug.current,
      componentes[]-> {
        ...,
        'linkDetail': link{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_uno': link_uno{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_dos': link_dos{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_url_uno': link_url_uno{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'link_url_dos': link_url_dos{ ... ,
          'dataUrl': *[_id == ^.url._ref]{
            'url': slug.current
          }[0]
        },
        'tips': tips[]-> {
          ...
        }
      }
    }[0]
  `

  useEffect(() => {
    async function fetchData() {
      const dataHome = await client.fetch(query)
      setData(dataHome)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box maxW='2560px' m='0 auto' id='main-container'>
      <NavBar dataN={{}} />

      {data &&
        data.componentes.map((componente: any) => (
          <ComponentRenderer key={componente._id} component={componente._type} data={componente} />
        ))}
      {data && <Footer />}
    </Box>
  )
}

const ComponentRenderer = ({ component, data }: { component: string; data: any }) => {
  const Component = require(`../components/componentsSanity/${component}`).default
  return <Component data={data} />
}

export default Home
