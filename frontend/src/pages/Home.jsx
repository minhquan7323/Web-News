import React, { useEffect, useState } from "react"
import { Text, Image, Stack, Grid, GridItem, Box, Link, useBreakpointValue, Divider, HStack, VStack, Skeleton } from "@chakra-ui/react"
import * as ArticleService from '../services/ArticleService'
import { useNavigate } from 'react-router-dom'
import { sortByDate } from "../utils"
import InfiniteArticleList from "../components/InfiniteArticleList"
import { FeaturedArticleSkeleton, SideArticleSkeleton } from "../components/SkeletonComponent"

const Home = () => {
    const [featuredArticle, setFeaturedArticle] = useState([])
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }

    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        setArticles(res.data || [])
    }

    const fetchFeaturedArticle = async () => {
        const res = await ArticleService.getFeaturedArticle()
        setFeaturedArticle(res.data || [])
    }

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            await fetchAllArticle()
            await fetchFeaturedArticle()
            setIsLoading(false)
        }

        loadData()
    }, [])

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        lg: "2fr 1fr",
    })

    const visibleArticles = useBreakpointValue({ base: 0, lg: featuredArticle.length })

    return (
        <Box p={4} paddingTop={10}>
            <Grid templateColumns={gridTemplate} gap={6} mt={6}>
                <GridItem alignSelf="start">
                    {isLoading ? (
                        <FeaturedArticleSkeleton />
                    ) : (
                        articles.length > 0 && sortByDate(articles)?.slice(0, 1).map((article) => (
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
                        ))
                    )}
                    <InfiniteArticleList
                        data={articles}
                        isLoading={isLoading}
                        skipFirstArticle={true}
                        description={false}
                    />
                </GridItem>

                <GridItem alignSelf="start">
                    <VStack alignItems="start" spacing={4} w="100%">
                        {isLoading ? (
                            <>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <React.Fragment key={index}>
                                        <SideArticleSkeleton />
                                        {index < 4 && (
                                            <Box py={2} w="100%">
                                                <Divider borderColor="gray.300" />
                                            </Box>
                                        )}
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            sortByDate(featuredArticle)?.slice(0, visibleArticles).map((article, index) => (
                                <React.Fragment key={article._id}>
                                    <Box onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }} cursor='pointer'>
                                        <HStack alignItems="start">
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.title}
                                                objectFit="cover"
                                                minH="100px"
                                                maxH='100px'
                                                minW='100px'
                                                maxW='100px'
                                                borderRadius="5px"
                                                transition="opacity 0.1s ease-in-out"
                                                _hover={{ opacity: 0.7 }}
                                            />
                                            <Stack spacing={1}>
                                                <Text fontSize="lg" noOfLines={3} _hover={{ textDecoration: "underline" }}>
                                                    {article.title}
                                                </Text>
                                                <Text fontSize="sm" color="gray.400">
                                                    {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </Text>
                                            </Stack>
                                        </HStack>
                                    </Box>
                                    {index < featuredArticle.length - 1 && (
                                        <Box py={2} w="100%">
                                            <Divider borderColor="gray.300" />
                                        </Box>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Home
