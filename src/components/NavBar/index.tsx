import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
} from '@chakra-ui/react'

import { LiaShoppingBagSolid } from 'react-icons/lia'
import { CiHeart, CiUser } from 'react-icons/ci'
import { TfiSearch } from 'react-icons/tfi'
import { LogoCI, LogoHamburguerCI } from '../Icons'
import { useStore } from '@/store'
import { IDataNav } from '@/typesSanity/docs/nav'
import { client } from '@/lib/sanity.client'
import React from 'react'
import { useRouter } from 'next/router'
import CartDrawer from '../CartDrawer'

interface IContainerProps {
  dataN: any
}

const iconArray: any = {
  LiaShoppingBagSolid: LiaShoppingBagSolid,
  CiHeart: CiHeart,
  CiUser: CiUser,
  TfiSearch: TfiSearch,
}

const NavBar = (props: IContainerProps) => {
  const query = `
    *[_type == "settings"]{
      'logo': navbar.logo,
      'links_izquierda': navbar.links_izquierda[]{ ... ,
      'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      },
      'links_derecha': navbar.links_derecha[]{ ... ,
        'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      },
      'links_derecha_mobile': navbar.links_derecha_mobile[]{ ... ,
        'dataUrl': *[_id == ^.link.url._ref]{
          'url': slug.current
        }[0]
      }
    }
  `

  const { dataN } = props
  const [data, setData] = useState<IDataNav>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value } = useStore()
  const router = useRouter()

  const [isMobile] = useMediaQuery(`(max-width: ${value})`)
  // se utiliza para cuando la pantalla es muy pequeña hacer un "margin right" a los iconos de la derecha
  const [isPhone] = useMediaQuery(`(max-width: 400px)`)
  const [showDrawer, setShowDrawer] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [linksLeft, setLinksLeft] = useState<{ title: string; url?: string; dataUrl: { url: string } }[]>([])
  const cartBtnRef = React.useRef()

  const goHome = () => {
    router.push('/')
  }

  const goToLink = (param: any) => {
    if (param.dataUrl) {
      const url = param.dataUrl.url
      router.push(`/${url}`)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query)
      setData(data[0])
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data && data.links_izquierda && data.links_izquierda.length > 0) {
      const result = data.links_izquierda.map((item: any) => {
        return { title: item.title, dataUrl: item.dataUrl }
      })

      setLinksLeft(result)
    }
  }, [data])

  return (
    <Flex
      px={4}
      h='86px'
      bg={isMobile ? '#fff' : ''}
      alignItems='center'
      justifyContent='space-between'
      pt='20px'
      pb='20px'
      position='fixed'
      top={0}
      width='100%'
      maxW='2560px'
      zIndex={1000}
    >
      {/* Lado izquierdo */}
      <Flex flex={1} pl={isMobile ? '' : '10px'}>
        {isMobile ? (
          <IconButton
            aria-label='Open Menu'
            icon={<LogoHamburguerCI />}
            onClick={() => setShowDrawer(true)}
            colorScheme='black'
          />
        ) : (
          <Box>
            <HStack>
              {linksLeft.length > 0 &&
                linksLeft.map((link: { title: string; url?: string; dataUrl?: { url: string } }) => (
                  <Box key={link.title} mr={4}>
                    <Text
                      fontSize='14px'
                      fontWeight={400}
                      lineHeight='normal'
                      color={isScrolled || dataN?.isBlackNavBar ? 'black' : 'white'}
                      cursor='pointer'
                      onClick={() => goToLink(link)}
                    >
                      {link.title}
                    </Text>
                  </Box>
                ))}
            </HStack>
          </Box>
        )}
      </Flex>

      {/* Centro */}
      <Flex
        alignItems='center'
        justifyContent='center'
        flex={2}
        mr={isPhone ? '15px' : ''}
        onClick={goHome}
        cursor='pointer'
      >
        <LogoCI
          color={isMobile || isScrolled || dataN?.isBlackNavBar ? 'black' : 'white'}
          width={isMobile ? '190px' : '250px'}
          height={isMobile ? '27px' : '33px'}
        />
      </Flex>

      {/* Lado derecho */}
      {!isMobile && (
        <Flex alignItems='center' flex={1} gap={4} justifyContent='flex-end'>
          {data?.links_derecha &&
            data.links_derecha.length > 0 &&
            data.links_derecha.map((item, index) => {
              const BtnComponent = (
                <button key={index}>
                  {iconArray[item.icono]({
                    style: {
                      width: item.icono === 'TfiSearch' ? '25px' : '30px',
                      height: item.icono === 'TfiSearch' ? '25px' : '30px',
                      cursor: 'pointer',
                      color: isScrolled || dataN?.isBlackNavBar ? 'black' : 'white',
                    },
                  })}
                  {index !== data.links_derecha.length - 1 && <Box mx='8px' />}
                </button>
              )
              if (item.title === 'Carrito de compras') {
                return <CartDrawer key={index} button={BtnComponent} />
              }

              return BtnComponent
            })}
        </Flex>
      )}

      {/* Lado derecho mobile */}
      {isMobile && (
        <Flex alignItems='center' flex={1} justifyContent='flex-end' id='mobile'>
          {data?.links_derecha_mobile.map((item, index) => (
            <React.Fragment key={index}>
              {iconArray[item.icono]({
                style: {
                  width: item.icono === 'TfiSearch' ? '25px' : '30px',
                  height: item.icono === 'TfiSearch' ? '25px' : '30px',
                  cursor: 'pointer',
                  color: 'black',
                },
              })}
              {index !== data.links_derecha_mobile.length - 1 && <Box mx='3px' />}
            </React.Fragment>
          ))}
        </Flex>
      )}

      {/* Drawer para pantallas móviles */}
      <Drawer isOpen={showDrawer} placement='left' onClose={() => setShowDrawer(false)}>
        <DrawerOverlay zIndex={9999999999999}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <LogoCI
                color={isMobile ? 'black' : 'white'}
                width={isMobile ? '150px' : '250px'}
                height={isMobile ? '20px' : '33px'}
              />
            </DrawerHeader>
            <DrawerBody>
              {linksLeft.length > 0 &&
                linksLeft.map((link: { title: string; url?: string; dataUrl: { url: string } }) => (
                  <Box key={link.title} mb={4}>
                    <Text
                      fontSize='14px'
                      fontWeight={400}
                      lineHeight='normal'
                      color='black'
                      onClick={() => goToLink(link)}
                    >
                      {link.title}
                    </Text>
                  </Box>
                ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <CartDrawer cartBtnRef={cartBtnRef} />
    </Flex>
  )
}

export default NavBar
