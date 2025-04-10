import React from 'react'
import { HStack, Text } from '@chakra-ui/react'

const ArticleStats = ({ read, commentCount, align = 'right' }) => {
    return (
        <HStack justifyContent={align}>
            <Text fontSize='sm' opacity='0.5'>{read} 👁️</Text>
            <Text fontSize='sm' color='gray.400'>{commentCount} <i className="fa-regular fa-comment"></i></Text>
        </HStack>
    )
}

export default ArticleStats 