import React, { useEffect, useState } from "react"
import { Text, Image, Stack, Grid, Box, Link, useBreakpointValue, Divider, HStack, VStack, } from "@chakra-ui/react"
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
            <Grid templateColumns={gridTemplate} gap={6} mt={6}>
                {sortByDate(articleList)?.map((article) => (
                    <Link key={article._id} onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }}>
                        <Image src={article.imageUrl || "https://via.placeholder.com/150"} alt={article.title} borderRadius="5px" objectFit="cover" h="100%" maxH="500px" w="100%" transition="opacity 0.2s ease-in-out" _hover={{ opacity: 0.7 }} />
                        <Stack spacing={3}>
                            <Text fontSize='3xl' _hover={{ textDecoration: "underline" }}>{article.title}</Text>
                            <Stack spacing={1}>
                                <Text fontSize="sm" color="gray.400">
                                    {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </Stack>
                            <Text noOfLines={2}>{article.description}</Text>
                        </Stack>
                    </Link>
                ))}
            </Grid>
        </Box>
    )
}

export default ArticleList
