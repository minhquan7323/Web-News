import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as CategoryService from '../../services/CategoryService'
import { useQuery } from '@tanstack/react-query'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Button, HStack, Image, Checkbox, Text, useDisclosure, ScaleFade } from '@chakra-ui/react'
const CategoryManagement = () => {
    const navigate = useNavigate()
    const [selectedCategories, setSelectedCategories] = useState([])
    const { isOpen, onToggle } = useDisclosure()

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
    }
    const queryCategory = useQuery({
        queryKey: ['categories'],
        queryFn: fetchAllCategory,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingCategories, data: categories } = queryCategory

    const handleCheckboxChange = (categoryId) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter(id => id !== categoryId)
                : [...prevSelected, categoryId]
        )
    }

    return (
        <Box>
            <Button onClick={onToggle}>Click Me</Button>
            <ScaleFade initialScale={0.9} in={isOpen}>
                <Box
                    p={4}
                    color='white'
                    mt='4'
                    bg='teal.500'
                    rounded='md'
                    shadow='md'
                >
                    Fade
                </Box>
            </ScaleFade>
            <TableContainer pt={8}>
                <Table variant="striped" colorScheme="gray">
                    <Thead>
                        <Tr>
                            <Th color="black" w="10%"></Th>
                            <Th color="black" w="20%">Image</Th>
                            <Th color="black" w="50%">Title</Th>
                            <Th color="black" w="20%" isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <Tr key={category._id}>
                                    <Td>
                                        <Checkbox
                                            isChecked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCheckboxChange(category._id)}
                                            borderColor="teal"
                                        />
                                    </Td>
                                    <Td><Image src={category.imageUrl || "https://via.placeholder.com/100"} alt={category.title} objectFit="cover" h='80px' w='auto' minW='100px' /></Td>
                                    <Td>{category.title}</Td>
                                    <Td isNumeric>
                                        <HStack spacing={2} justifyContent="flex-end">
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                p={2}
                                                onClick={() => handleClickNav('update-category', category._id)}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                            <Button colorScheme="orange" size="sm" p={2}>
                                                <i className="fa-solid fa-trash"></i>
                                            </Button>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={4} textAlign="center">No articles found.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CategoryManagement
