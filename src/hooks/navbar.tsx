import { RefObject, useEffect, useState } from 'react'

export const useNavbar = () => {
  const [height, setHeight] = useState<number>()

  const setNavbarHeight = (height: number) => {
    setHeight(height)
  }

  return { height, setNavbarHeight }
}
