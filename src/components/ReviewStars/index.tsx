import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface ReviewStarProps {
  rating: number
}

const ReviewStars = ({ rating }: ReviewStarProps) => {
  return (
    <Flex>
      {Array.from({ length: 5 }, (_, i) => {
        if (i > rating - 1) return <AiOutlineStar key={i} color='black' size={20} />
        return <AiFillStar key={i} color='black' size={20} />
      })}
    </Flex>
  )
}

export default ReviewStars
