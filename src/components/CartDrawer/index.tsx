import { useCart } from '@/hooks/cart'
import { useCartDrawer, useCartProducts } from '@/store'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import CartProductCard from '../CartProductCard'

interface ICartDrawerProps {
  button?: React.ReactElement
}

export default function CartDrawer({ button }: ICartDrawerProps) {
  const router = useRouter()
  const { open, setOpen } = useCartDrawer()
  const { checkoutUrl, cartId, getCart } = useCart()
  const { products, setProducts } = useCartProducts()
  const btnRef = React.useRef()

  const handleCheckout = () => {
    checkoutUrl && router.push(checkoutUrl)
  }

  useEffect(() => {
    ;(async function () {
      if (cartId && products?.length === 0) {
        const response = await getCart(cartId)
        setProducts(response?.data?.cart?.lines?.nodes)
      }
    })()
  }, [cartId])

  return (
    <>
      {button && React.cloneElement(button, { ref: btnRef, onClick: () => setOpen(!open) })}

      <Drawer size='sm' isOpen={open} placement='right' onClose={() => setOpen(!open)} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu carrito</DrawerHeader>

          <DrawerBody>
            <Flex direction='column' gap={4}>
              {products?.map(product => (
                <CartProductCard key={product?.merchandise?.id} product={product} />
              ))}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={handleCheckout} bg='#00AA4F' color='white' w='full'>
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
