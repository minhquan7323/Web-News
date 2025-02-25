import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Button, HStack } from '@chakra-ui/react'
const Admin = () => {
    const navigate = useNavigate()

    const handleClickNav = (type) => {
        if (type === 'add-article') {
            navigate('/system/admin/add-article')
        }
    }
    return (
        <Box pt={16}>
            <Box p={4}>
                <Button onClick={() => handleClickNav('add-article')}>Add Article</Button>
                <TableContainer>
                    <Table variant="striped" colorScheme="gray">
                        <Thead>
                            <Tr>
                                <Th color="black">To convert</Th>
                                <Th color="black">into</Th>
                                <Th isNumeric color="black">Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric gap={2}>
                                    <HStack spacing={2} justifyContent="flex-end" >
                                        <Button colorScheme="blue" size="sm" p={2}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button colorScheme="orange" size="sm" p={2}>
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric gap={2}>
                                    <HStack spacing={2} justifyContent="flex-end" >
                                        <Button colorScheme="blue" size="sm" p={2}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button colorScheme="orange" size="sm" p={2}>
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric gap={2}>
                                    <HStack spacing={2} justifyContent="flex-end" >
                                        <Button colorScheme="blue" size="sm" p={2}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button colorScheme="orange" size="sm" p={2}>
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Admin
