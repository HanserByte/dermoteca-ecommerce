export const useCreateCart = () => {
  async function createCart() {
    const res = await fetch('/api/cart?action=create-cart')
    const data = await res.json()
    return data
  }

  return { createCart }
}
