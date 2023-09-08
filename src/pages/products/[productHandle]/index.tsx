import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { client } from '@/lib/sanity.client'
import { useNavbar, useStore } from '@/store'

const ProductPage = () => {
  const [productData, setProductData] = useState<any>()
  const { value } = useStore()
  const [isMobile] = useMediaQuery(`(max-width: ${value})`)
  const { height } = useNavbar()
  const router = useRouter()

  const query = `*[_type == "product" && store.slug.current == "${router.query.productHandle}"][0]{
    ...,
    store {
      ...,
      variants[]->
    }
  }
  `

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query)
      console.log(data)
      setProductData(data)
    }

    fetchData()
  }, [router.query.productHandle])

  console.log(productData)

  return (
    <Box maxW='2560px' m='0 auto'>
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg='white' w='100%' />
      <Flex
        alignItems='center'
        pl={isMobile ? '20px' : '145px'}
        pr={isMobile ? '20px' : '145px'}
        h='50px'
        bg='#E7D4C7'
        w='100%'
      >
        Breadcrums
      </Flex>
      <Box my='6' pl={isMobile ? '20px' : '145px'} pr={isMobile ? '20px' : '145px'}>
        <Flex gap={6}>
          <Box w='50%'>
            <img src={productData?.store?.previewImageUrl} alt={productData?.store?.title} />
          </Box>
          <Flex w='50%' gap={2} direction='column'>
            <Text fontSize='2xl' fontWeight={700}>
              {productData?.store?.title}
            </Text>
            <Text fontSize='xl' fontWeight='400'>
              ${productData?.store?.variants[0]?.store?.price}
            </Text>
            <div
              dangerouslySetInnerHTML={{ __html: productData?.store?.descriptionHtml }}
              style={{ listStylePosition: 'inside' }}
            />
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Box>
  )
}

export default ProductPage
