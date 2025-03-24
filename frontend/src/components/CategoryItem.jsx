import React, { useState } from 'react'
import { Box, IconButton, Text, VStack, HStack, useDisclosure, Collapse, useColorModeValue, } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ChevronDownIcon, ChevronRightIcon, } from '@chakra-ui/icons'

const CategoryItem = ({ category, onEdit, onDelete, categories }) => {
    const { isOpen, onToggle } = useDisclosure()
    const [isHovered, setIsHovered] = useState(false)

    const getChildCategories = (parentId) => {
        return categories.filter(cat => cat.parentId === parentId)
    }

    const childCategories = getChildCategories(category._id)

    const bgColor = useColorModeValue(
        isHovered ? "gray.100" : "gray.50",
        isHovered ? "gray.600" : "gray.700"
    )

    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            p={2}
            mb={2}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            bg={bgColor}
            transition="all 0.2s"
        >
            <HStack justify="space-between">
                <HStack spacing={2}>
                    {childCategories.length > 0 && (
                        <IconButton
                            icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            onClick={onToggle}
                            variant="ghost"
                            size="sm"
                            aria-label="Toggle children"
                        />
                    )}
                    <Text fontWeight="medium">{category.name}</Text>
                </HStack>
                <HStack>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => onEdit(category)}
                        variant="ghost"
                        size="sm"
                        aria-label="Edit category"
                        colorScheme="blue"
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => onDelete(category._id)}
                        variant="ghost"
                        size="sm"
                        aria-label="Delete category"
                        colorScheme="red"
                    />
                </HStack>
            </HStack>

            <Collapse in={isOpen}>
                <Box pl={8} mt={2}>
                    <VStack spacing={2} align="stretch">
                        {childCategories.map(child => (
                            <CategoryItem
                                key={child._id}
                                category={child}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                categories={categories}
                            />
                        ))}
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    )
}

export default CategoryItem 