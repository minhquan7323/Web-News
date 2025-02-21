import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardBody, Text, Image, Heading, Stack, Grid, GridItem, Box, Link, useBreakpointValue, Flex, Divider, } from "@chakra-ui/react"

const Home = () => {
    const [news, setNews] = useState([])

    const fetchNews = async () => {
        const urlSearch = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-21&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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
        md: "5fr 4fr",
        lg: "5fr 4fr 3fr",
    })

    return (
        <Box p={4} paddingTop={10}>
            <Grid templateColumns={gridTemplate} gap={6} mt={6}>
                {/* Cột 1 (5fr) */}
                <GridItem>
                    {news.length > 0 && (
                        <>
                            {/* Card lớn (tràn cột) */}
                            <Link href={news[0].url} isExternal _hover={{ textDecoration: "none" }}>
                                <Card w="100%" boxShadow="lg" cursor="pointer" _hover={{ transform: "scale(1.02)", transition: "0.2s" }}>
                                    <Image src={news[0].urlToImage || "https://via.placeholder.com/150"} alt={news[0].title} borderTopRadius="5px" objectFit="cover" h="auto" maxH="300px" w="100%" />
                                    <CardBody padding={3}>
                                        <Stack spacing={3}>
                                            <Heading size="lg">{news[0].title}</Heading>
                                            <Text fontSize="md" color="gray.600">
                                                {news[0].source.name} - {new Date(news[0].publishedAt).toLocaleDateString()}
                                            </Text>
                                            <Text noOfLines={3}>{news[0].description}</Text>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            </Link>

                            {/* Danh sách 5 card nhỏ */}
                            <Grid templateColumns="1fr 2fr" gap={4} mt={4}>
                                {news.slice(1, 6).map((article, index) => (
                                    <React.Fragment key={index}>
                                        <Link href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                                            <Box boxShadow="sm" cursor="pointer" _hover={{ transform: "scale(1.05)", transition: "0.2s" }}>
                                                <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} borderRadius="5px" objectFit="cover" h="auto" maxH="80px" w="100%" />
                                            </Box>
                                        </Link>

                                        <Box>
                                            <Link href={article.url} isExternal _hover={{ textDecoration: "none", color: "blue.500" }}>
                                                <Heading size="sm">{article.title}</Heading>
                                            </Link>
                                            <Text fontSize="xs" color="gray.600">
                                                {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                                            </Text>
                                        </Box>

                                        {index < news.slice(1, 6).length - 1 && (
                                            <GridItem colSpan={2}>
                                                <Box py={2}>
                                                    <Divider borderColor="gray.300" />
                                                </Box>
                                            </GridItem>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Grid>

                        </>
                    )}
                </GridItem>

                {/* Cột 2 (4fr) */}
                <GridItem>
                    {news.length > 6 && (
                        <>
                            {/* 2 Card lớn trên cùng */}
                            {news.slice(6, 8).map((article, index) => (
                                <Link key={index} href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                                    <Card w="100%" boxShadow="lg" mb={4} cursor="pointer" _hover={{ transform: "scale(1.02)", transition: "0.2s" }}>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/150"} alt={article.title} borderTopRadius="5px" objectFit="cover" h="auto" maxH="200px" w="100%" />
                                        <CardBody padding={3}>
                                            <Stack spacing={3}>
                                                <Heading size="md">{article.title}</Heading>
                                                <Text fontSize="sm" color="gray.600">
                                                    {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                                                </Text>
                                                <Text noOfLines={2}>{article.description}</Text>
                                            </Stack>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}

                            {/* Hàng ngang 3 card nhỏ */}
                            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                {news.slice(8, 11).map((article, index) => (
                                    <Link key={index} href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                                        <Card boxShadow="sm" cursor="pointer" _hover={{ transform: "scale(1.05)", transition: "0.2s" }} h="100%">
                                            <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} borderRadius="5px" objectFit="cover" h="auto" maxH="100px" w="100%" />
                                            <CardBody padding={3}>
                                                <Text fontSize="sm" noOfLines={2}>{article.title}</Text>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </Grid>
                        </>
                    )}
                </GridItem>

                {/* Cột 3 (3fr) */}
                <GridItem>
                    {news.length > 11 && (
                        <>
                            {news.slice(11, 15).map((article, index) => (
                                <Link key={index} href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                                    <Card w="100%" boxShadow="lg" mb={4} cursor="pointer" _hover={{ transform: "scale(1.02)", transition: "0.2s" }}>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/150"} alt={article.title} borderTopRadius="5px" objectFit="cover" h="150px" w="100%" />
                                        <CardBody padding={3}>
                                            <Heading size="sm">{article.title}</Heading>
                                            <Text fontSize="xs" color="gray.600">
                                                {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                                            </Text>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </>
                    )}
                </GridItem>
            </Grid>
            <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6} mt={10}>
                {news.slice(15, 23).map((article, index) => (
                    <Link key={index} href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                        <Card boxShadow="lg" cursor="pointer" _hover={{ transform: "scale(1.02)", transition: "0.2s" }} h="100%">
                            <Image
                                src={article.urlToImage || "https://via.placeholder.com/150"}
                                alt={article.title}
                                borderTopRadius="5px"
                                objectFit="cover"
                                h="150px"
                                w="100%"
                            />
                            <CardBody padding={3} display="flex" flexDirection="column" h="100%">
                                <Stack spacing={3} flex="1">
                                    <Heading size="sm">{article.title}</Heading>
                                    <Text fontSize="xs" color="gray.600">
                                        {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                                    </Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </Grid>
        </Box>
    )
}

export default Home
