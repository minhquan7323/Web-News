import React from "react"
import { Text, Image, Stack, Grid, Box, Link, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { sortByDate } from "../utils"

const ArticleGrid = ({ articles, title }) => {
    const navigate = useNavigate()

    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr",
    })

    const bgColor = useColorModeValue("gray.50", "gray.700")

    return (
        <Box pt={16}>
            {title && (
                <Text fontSize="2xl" fontWeight="bold" mb={4} px={4}>
                    {title}
                </Text>
            )}
            <Grid templateColumns={gridTemplate} gap={4} mt={6} px={4}>
                {sortByDate(articles)?.map((article) => (
                    <Box key={article._id} p={2} backgroundColor={bgColor} borderRadius='5px'>
                        <Link onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }}>
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

export default ArticleGrid 