import { useEffect, useState } from 'react'

export const useCart = () => {
  const [cartId, setCartId] = useState<string | null>()
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCartId(localStorage?.getItem('cartId'))
    setCheckoutUrl(localStorage?.getItem('checkoutUrl'))
    if (!localStorage?.getItem('cartId')) createCart()
  }, [])

  async function createCart() {
    const res = await fetch('/api/cart?action=create-cart')
    const data = await res.json()
    localStorage.setItem('cartId', data.id)
    localStorage.setItem('checkoutUrl', data.checkoutUrl)
    setCartId(data.id)
    setCheckoutUrl(data.checkoutUrl)
    return data
  }

  async function getCart(cartId: string | null | undefined) {
    const res = await fetch(`/api/cart?action=get-cart&cartId=${cartId}`)
    const data = await res.json()
    return data
  }

  async function addToCart(cartId: string | null | undefined, productId: string, quantity: number) {
    const res = await fetch(`/api/cart?action=add-to-cart&cartId=${cartId}&productId=${productId}&quantity=${quantity}`)
    const data = await res.json()
    return data
  }

  async function removeFromCart(cartId: string | null | undefined, productId: string) {
    const res = await fetch(`/api/cart?action=remove-from-cart&cartId=${cartId}&productId=${productId}`)
    const data = await res.json()
    return data
  }

  return { cartId, checkoutUrl, addToCart, createCart, getCart, removeFromCart }
}
