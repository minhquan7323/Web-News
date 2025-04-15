import React, { useEffect, useMemo, useState } from "react"
import { Text, Image, Stack, Grid, GridItem, Box, Link, useBreakpointValue, Divider, HStack, VStack } from "@chakra-ui/react"
import * as ArticleService from '../services/ArticleService'
import * as UserService from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { sortByDate, sortByUpdatedAt } from "../utils"
import InfiniteArticleList from "../components/InfiniteArticleList"
import { FeaturedArticleSkeleton, SideArticleSkeleton } from "../components/SkeletonComponent"
import MostReadArticles from "../components/MostReadArticles"
import ArticleStats from "../components/ArticleStats"
import { useSelector } from "react-redux"
import FeaturedArticles from '../components/FeaturedArticles'

const Home = () => {
    const [articles, setArticles] = useState([])
    const [watchLaterList, setWatchLaterList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)

    const handleClickNav = (type, id) => {
        if (type === 'details') {
            navigate(`/article/details/${id}`)
        }
        else if (type === 'watchlater') {
            navigate(`/watchlater`)
        }
    }
    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        const filteredArticles = res.data?.filter(article => !article.hide) || []
        setArticles(filteredArticles)
    }

    const fetchWatchLater = async () => {
        const res = await UserService.getWatchLater(user?.userId)
        setWatchLaterList(res?.data)
    }

    const mostReadArticles = useMemo(() =>
        [...articles].sort((a, b) => b.read - a.read).slice(0, 10),
        [articles]
    )
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            await fetchAllArticle()
            setIsLoading(false)
        }

        loadData()
    }, [])

    useEffect(() => {
        if (user?.userId) {
            fetchWatchLater()
        }
    }, [user?.userId])

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        lg: "2fr 1fr",
    })

    const featuredArticle = articles.filter(article => article.featured)
    return (
        <Box p={4} paddingTop={10}>
            <Grid templateColumns={gridTemplate} gap={6} mt={6}>
                <GridItem alignSelf="start">
                    {isLoading ? (
                        <FeaturedArticleSkeleton />
                    ) : (
                        articles.length > 0 && sortByDate(articles)?.slice(0, 1).map((article) => (
                            <Link key={article._id} onClick={() => handleClickNav('details', article._id)} _hover={{ textDecoration: "none", color: "teal" }}>
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    borderRadius="5px"
                                    objectFit="contain"
                                    h="400px"
                                    w="100%"
                                    bg="gray.100"
                                    transition="opacity 0.2s ease-in-out"
                                    _hover={{ opacity: 0.7 }}
                                />
                                <Stack spacing={3}>
                                    <Text fontSize='3xl' _hover={{ textDecoration: "underline" }}>{article.title}</Text>
                                    <Stack spacing={1}>
                                        <Text fontSize="sm" color="gray.400">
                                            {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </Text>
                                    </Stack>
                                    <Text noOfLines={2}>{article.description}</Text>
                                    <ArticleStats read={article.read} commentCount={article.commentCount} />
                                </Stack>
                            </Link>
                        ))
                    )}
                    <Box>
                        <MostReadArticles articles={mostReadArticles} />
                    </Box>
                    <InfiniteArticleList
                        data={articles}
                        isLoading={isLoading}
                        skipFirstArticle={true}
                        description={false}
                    />
                </GridItem>

                <GridItem alignSelf="start">
                    <VStack align="left" spacing={4}>
                        {isLoading ? (
                            [1, 2, 3, 4, 5].map((index) => (
                                <React.Fragment key={index}>
                                    <SideArticleSkeleton />
                                    {index < 4 && (
                                        <Box py={2} w="100%">
                                            <Divider borderColor="gray.300" />
                                        </Box>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <Box display={{ base: "none", lg: "block" }}>
                                <FeaturedArticles articles={featuredArticle} linkList={'featuredList'} title={'Nổi bật'} display={5} />
                                {user && watchLaterList.length > 0 && <FeaturedArticles articles={watchLaterList} linkList={'watchlater'} title={'đọc tiếp'} display={5} />}
                            </Box>
                        )}
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Home