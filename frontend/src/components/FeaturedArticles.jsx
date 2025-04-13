import React from 'react'
import { Box, HStack, Image, Stack, Text, Divider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ArticleStats from './ArticleStats'

const FeaturedArticles = ({ articles, title, display = 10 }) => {
    const navigate = useNavigate()

    const handleDetailsArticle = (articleId) => {
        navigate(`/article/details/${articleId}`)
    }

    const sortByUpdatedAt = (articles) => {
        return articles?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    }

    return (
        <>
            <Text as="b" fontSize='2xl' textTransform="uppercase" color='teal'>
                {title}
            </Text>
            {sortByUpdatedAt(articles)?.slice(0, display).map((article, index) => (
                <Box key={article._id} w="100%">
                    <Box
                        onClick={() => handleDetailsArticle(article._id)}
                        _hover={{ textDecoration: "none" }}
                        cursor="pointer"
                    >
                        <HStack alignItems="start" _hover={{ color: "teal" }}>
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                objectFit="cover"
                                minH="100px"
                                maxH="100px"
                                minW="100px"
                                maxW="100px"
                                borderRadius="5px"
                                transition="opacity 0.1s ease-in-out"
                                _hover={{ opacity: 0.7 }}
                            />
                            <Stack spacing={1}>
                                <Text fontSize="lg" noOfLines={3} _hover={{ textDecoration: "underline" }}>
                                    {article.title}
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    {article.source} -{" "}
                                    {new Date(article.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </Stack>
                        </HStack>
                        <ArticleStats read={article.read} commentCount={article.commentCount} />
                    </Box>
                    {index < display - 1 && (
                        <Box py={2} w="100%">
                            <Divider borderColor="gray.300" />
                        </Box>
                    )}
                </Box>
            ))}
        </>
    )
}

export default FeaturedArticles 