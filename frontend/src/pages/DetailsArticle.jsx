import React, { useEffect, useState } from "react"
import axios from "axios"
import { Text, Image, Grid, GridItem, Box, Link, useBreakpointValue, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'

const DetailsArticle = () => {
    const [news, setNews] = useState([])

    const fetchNews = async () => {
        const urlSearch = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-24&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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
            {news.slice(3, 4).map((article) => (
                <Box p={[4, 6, 8, 12]}>
                    <Breadcrumb spacing='8px' py={4} separator={<ChevronRightIcon color='gray.500' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>Category here</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
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
                                    Updated at {new Date(article.publishedAt).toLocaleString()}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid templateColumns={gridTemplate} gap={6}>
                        <GridItem>
                            <Box>
                                <Box>
                                    <Box>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    </Box>
                                    <Box p={4}>
                                        {article.content}
                                    </Box>
                                    <Box>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    </Box>
                                    <Box p={6}>
                                        {article.content}
                                    </Box>
                                    <Box>
                                        <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" w="100%" />
                                    </Box>
                                    <Box p={6}>
                                        {article.content}
                                    </Box>
                                </Box>
                                <Box py={2}>
                                    <Divider borderColor="gray.300" />
                                </Box>
                                <Box px={[4, 6, 8, 12]}>
                                    <Box pt={12}>
                                        <Text as="b" fontSize='2xl' textTransform="uppercase">
                                            Up Next
                                        </Text>
                                        {news.slice(3, 6).map((article, index) => (
                                            <Grid templateColumns="2fr 1fr" gap={4} mt={4}>
                                                <Link href={article.url} isExternal>
                                                    <Text
                                                        fontSize='lg'
                                                        lineHeight="24px"
                                                        height="72px"
                                                        overflow="hidden"
                                                        display="-webkit-box"
                                                        style={{
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: "vertical",
                                                        }}
                                                    >
                                                        {article.description}
                                                    </Text>
                                                </Link>
                                                <Link href={article.url} isExternal transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}>
                                                    <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                                </Link>
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
                                        <Text as="b" fontSize='2xl' textTransform="uppercase">
                                            Most read
                                        </Text>
                                        <Grid templateColumns="1fr 1fr" gap={4} mt={4}>
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <React.Fragment key={i}>
                                                    {[i, i + 5].map((j) => (
                                                        <Box key={j} display="flex" alignItems="flex-start" gap={2}>
                                                            <Text fontSize="2xl" color="teal" fontWeight="bold" minWidth="30px">
                                                                {j + 1}
                                                            </Text>
                                                            <Box flex="1">
                                                                <Link href={news[11 + j]?.url} isExternal>
                                                                    <Text
                                                                        fontSize="lg"
                                                                        lineHeight="24px"
                                                                        height="72px"
                                                                        overflow="hidden"
                                                                        display="-webkit-box"
                                                                        style={{
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: "vertical",
                                                                        }}
                                                                    >
                                                                        {news[11 + j]?.description}
                                                                    </Text>
                                                                </Link>
                                                                {/* Không hiển thị Divider nếu j là 4 */}
                                                                {j !== 4 && j < 9 && <Divider borderColor="gray.300" pt={4} />}
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </Grid>

                                    </Box>
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
                                        <Link href={article.url} isExternal transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}>
                                            <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                        </Link>
                                        <Link href={article.url} isExternal>
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
                                        </Link>
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
                                        <Link href={article.url} isExternal transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}>
                                            <Image src={article.urlToImage || "https://via.placeholder.com/100"} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                        </Link>
                                        <Link href={article.url} isExternal>
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
                                        </Link>
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
