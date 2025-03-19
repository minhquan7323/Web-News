import React, { useEffect, useState } from "react"
import { Text, Image, Stack, Grid, Box, Link, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import * as ArticleService from '../services/ArticleService'
import { useNavigate, useParams } from 'react-router-dom'
import { sortByDate } from "../utils"
const ArticleList = () => {
    const { id: typeId } = useParams()
    const [articleList, setArticleList] = useState([])
    const navigate = useNavigate()

    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }

    const fetchGetArticleByType = async () => {
        const res = await ArticleService.getArticleByType(typeId)
        setArticleList(res.data)
    }

    useEffect(() => {
        fetchGetArticleByType()
    }, [typeId])

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr",
    })

    return (
        <Box pt={10}>
            <Grid templateColumns={gridTemplate} gap={4} mt={6} px={4}>
                {sortByDate(articleList)?.map((article) => (
                    <Box p={2} backgroundColor={useColorModeValue("gray.50", "gray.700")} borderRadius='5px'>
                        <Link key={article._id} onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }}>
                            <Image src={article.imageUrl} alt={article.title} objectFit="cover" h="200px" w="100%" transition="opacity 0.2s ease-in-out" _hover={{ opacity: 0.7 }} />
                            <Stack spacing={3}>
                                <Text fontSize='2xl' _hover={{ textDecoration: "underline" }}>{article.title}</Text>
                                <Stack spacing={1}>
                                    <Text fontSize="sm" color="gray.400">
                                        {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </Text>
                                </Stack>
                                <Text noOfLines={2}>{article.description}</Text>
                            </Stack>
                        </Link>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default ArticleList
