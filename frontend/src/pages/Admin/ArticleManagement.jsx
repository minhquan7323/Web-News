import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as ArticleService from '../../services/ArticleService'
import { useQuery } from '@tanstack/react-query'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Button, HStack, Image, Checkbox } from '@chakra-ui/react'

const ArticleManagement = () => {
    const navigate = useNavigate()
    const [selectedArticles, setSelectedArticles] = useState([])

    const handleClickNav = (type, idArticle = '') => {
        if (type === 'add-article') {
            navigate('/system/admin/add-article')
        }
        if (type === 'update-article' && idArticle) {
            navigate(`/system/admin/update-article/${idArticle}`)
        }
    }

    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        return res.data
    }
    const queryArticle = useQuery({
        queryKey: ['articles'],
        queryFn: fetchAllArticle,
        retry: 2,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingArticles, data: articles } = queryArticle

    const handleCheckboxChange = (articleId) => {
        setSelectedArticles((prevSelected) =>
            prevSelected.includes(articleId)
                ? prevSelected.filter(id => id !== articleId)
                : [...prevSelected, articleId]
        )
    }

    const mutationDelete = useMutationHooks(
        async (data) => {
            const { id } = data
            const res = await ArticleService.deleteArticle(id)
            return res
        }
    )
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete
    const isLoadingDeleted = mutationDelete.isPending

    const mutationDeleteMany = useMutationHooks(
        async (data) => {
            const { ...ids } = data
            const res = await ArticleService.deleteManyArticles(ids)
            return res
        }
    )
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany
    const isLoadingDeletedMany = mutationDeleteMany.isPending

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            success()
        } else if (isErrorDeleted) {
            error()
        }
    }, [dataDeleted, isSuccessDeleted, isErrorDeleted])
    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            success()
        } else if (isErrorDeletedMany) {
            error()
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany])

    const deleteArticle = () => {
        mutationDelete.mutate({ id: selectedArticles }, {
            onSettled: () => {
                queryArticle.refetch()
            }
        })
    }
    const deleteManyArticles = (ids) => {
        mutationDeleteMany.mutate({ ids: ids }, {
            onSettled: () => {
                queryArticle.refetch()
            }
        })
    }
    return (
        <Box>
            <Button colorScheme='blue' onClick={() => handleClickNav('add-article')}>Add Article</Button>
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
                        {articles && articles.length > 0 ? (
                            articles.map((article) => (
                                <Tr key={article._id}>
                                    <Td>
                                        <Checkbox
                                            isChecked={selectedArticles.includes(article._id)}
                                            onChange={() => handleCheckboxChange(article._id)}
                                            borderColor="teal"
                                        />
                                    </Td>
                                    <Td><Image src={article.imageUrl || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h='80px' w='auto' minW='100px' /></Td>
                                    <Td>{article.title}</Td>
                                    <Td isNumeric>
                                        <HStack spacing={2} justifyContent="flex-end">
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                p={2}
                                                onClick={() => handleClickNav('update-article', article._id)}
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

export default ArticleManagement
