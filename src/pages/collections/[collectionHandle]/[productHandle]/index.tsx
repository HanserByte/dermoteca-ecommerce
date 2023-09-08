import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Box } from '@chakra-ui/react'
import { client } from '@/lib/sanity.client'
import { useNavbar } from '@/store'

const ProductPage = () => {
  const [data, setData] = useState<any>()
  const { height } = useNavbar()
  const router = useRouter()

  return (
    <Box maxW='2560px' m='0 auto'>
      <NavBar dataN={{ isBlackNavBar: true }} />
      <Box h={`${height}px`} bg='white' w='100%' />
      Hello
    </Box>
  )
}

export default ProductPage
