import { useCart } from '@/hooks/cart'
import { useCartProducts } from '@/store'
import { ICartProductLine } from '@/typesSanity/shopify'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { TbTrash } from 'react-icons/tb'

interface ICartProductCardProps {
  product: ICartProductLine
}

const CartProductCard = ({ product }: ICartProductCardProps) => {
  const { cartId, removeFromCart } = useCart()
  const { setProducts } = useCartProducts()

  const handleRemoveFromCart = async () => {
    const response = await removeFromCart(cartId, product.id)
    setProducts(response?.data?.cartLinesRemove?.cart?.lines?.nodes)
  }

  return (
    <Flex gap={2}>
      <Box w='35%'>
        <img src={product?.merchandise?.product?.featuredImage?.url} alt={product?.merchandise?.product?.title} />
      </Box>

      <Flex flexDirection='column' gap={4} w='65%'>
        <Text fontSize='sm'>{product?.merchandise?.product?.title}</Text>
        <Flex justifyContent='space-between' alignItems='center' fontSize='sm' fontWeight={500} color='#00AA4F'>
          <span>${product?.merchandise?.price?.amount}</span>
          <Button onClick={handleRemoveFromCart} bg='#00AA4F' size='sm' color='white'>
            <TbTrash />
          </Button>
        </Flex>

        <Flex alignItems='center' gap={3}>
          <Button bg='#00AA4F' size='sm' color='white' rounded='full'>
            -
          </Button>
          <Text>{product?.quantity}</Text>
          <Button bg='#00AA4F' size='sm' color='white' rounded='full'>
            +
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CartProductCard
