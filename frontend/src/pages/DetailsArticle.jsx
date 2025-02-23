import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardBody, Text, Image, Heading, Stack, Grid, GridItem, Box, Link, useBreakpointValue, Flex, Divider } from "@chakra-ui/react"

const DetailsArticle = () => {
    const [news, setNews] = useState([])

    const fetchNews = async () => {
        const urlSearch = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-22&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        try {
            const res = await axios.get(urlSearch)
            setNews(res.data.articles)
        } catch (error) {
            console.error("Error fetching news:", error)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr",
        md: "1fr",
        lg: "9fr 3fr",
    })
    return (
        <>
            {news.slice(3, 4).map((article, index) => (
                <Box p={12}>
                    <Grid templateColumns={gridTemplate} gap={6}>
                        <Box>
                            <Text Text as='b' fontSize='5xl'>
                                {article.title}
                            </Text>
                            <Box p={8} color="gray">
                                <Box>
                                    <Text>
                                        By <u>{article.author}</u>
                                    </Text>
                                </Box>
                                <Box>
                                    Updated at {article.publishedAt}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid templateColumns={gridTemplate} gap={6}>
                        <GridItem>
                            <Box>
                                <Box>
                                    <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    {article.content}
                                    <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    {article.content}
                                    <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    {article.content}
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem>
                            <Box>
                                <Text as="b" borderLeft="6px solid teal" p={1} textTransform="uppercase">
                                    More from <Box as="span" color="teal">NEWS</Box>
                                </Text>
                                {news.slice(3, 6).map((article, index) => (
                                    <Grid templateColumns="2fr 2fr" gap={4} mt={4}>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                        <Text
                                            fontSize="xs"
                                            maxW="200px"
                                            lineHeight="24px"
                                            height="96px"
                                            overflow="hidden"
                                            display="-webkit-box"
                                            style={{
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {article.description}
                                        </Text>
                                        {index < news.slice(1, 5).length - 2 && (
                                            <GridItem colSpan={2}>
                                                <Box py={2}>
                                                    <Divider borderColor="gray.300" />
                                                </Box>
                                            </GridItem>
                                        )}
                                    </Grid>
                                ))}
                            </Box>
                            <Box pt={12}>
                                <Text as="b" borderLeft="6px solid teal" p={1} textTransform="uppercase">
                                    More from <Box as="span" color="teal">NEWS</Box>
                                </Text>
                                {news.slice(3, 6).map((article, index) => (
                                    <Grid templateColumns="2fr 2fr" gap={4} mt={4}>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                        <Text
                                            fontSize="xs"
                                            maxW="200px"
                                            lineHeight="24px"
                                            height="96px"
                                            overflow="hidden"
                                            display="-webkit-box"
                                            style={{
                                                WebkitLineClamp: 4,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {article.description}
                                        </Text>
                                        {index < news.slice(1, 5).length - 2 && (
                                            <GridItem colSpan={2}>
                                                <Box py={2}>
                                                    <Divider borderColor="gray.300" />
                                                </Box>
                                            </GridItem>
                                        )}
                                    </Grid>
                                ))}
                            </Box>
                        </GridItem>
                    </Grid>
                </Box>
            ))}
        </>
    )
}

export default DetailsArticle
