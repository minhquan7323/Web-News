import React, { useEffect, useState } from "react"
import { Text, Image, Stack, Grid, Box, Link, useBreakpointValue, useColorModeValue, Tooltip, Skeleton } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { sortByDate } from "../utils"
import * as UserService from '../services/UserService'
import { useSelector } from 'react-redux'
import { useMessage } from '../components/Message/Message'

const ArticleGrid = ({ articles, title }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const { success, error, warning } = useMessage()
    const [watchLaterList, setWatchLaterList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchWatchLater = async () => {
            if (user?.userId) {
                const res = await UserService.getWatchLater(user.userId)
                setWatchLaterList(res.data)
            }
        }
        fetchWatchLater()
    }, [user?.userId])

    useEffect(() => {
        if (articles.length !== 0) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
    }, [articles])

    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }

    const handleWatchLater = async (articleId) => {
        if (!user?.userId) {
            warning('Please login first')
            return
        }

        try {
            const isInWatchLater = watchLaterList.some(item => item._id === articleId)
            let res

            if (isInWatchLater) {
                res = await UserService.removeWatchLater(user.userId, articleId)
                success('Removed from Watch Later')
                setWatchLaterList(prev => prev.filter(item => item._id !== articleId))
            } else {
                res = await UserService.addWatchLater(user.userId, articleId)
                success('Added to Watch Later')
                setWatchLaterList(prev => [...prev, { _id: articleId }])
            }

            if (res?.status !== 'OK') {
                error(isInWatchLater ? 'Failed to remove from Watch Later' : 'Failed to add to Watch Later')
            }
        } catch (error) {
            error(isInWatchLater ? 'Failed to remove from Watch Later' : 'Failed to add to Watch Later')
        }
    }

    const isInWatchLater = (articleId) => {
        return watchLaterList.some(item => item._id === articleId)
    }

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr 1fr",
    })

    const bgColor = useColorModeValue("gray.100", "gray.700")

    const renderSkeleton = () => {
        return Array(8).fill(0).map((_, index) => (
            <Box key={index} p={2} backgroundColor={bgColor} borderRadius='5px'>
                <Skeleton height="200px" borderRadius="5px" mb={3} />
                <Stack spacing={3}>
                    <Skeleton height="24px" />
                    <Skeleton height="16px" width="70%" />
                    <Skeleton height="40px" noOfLines={2} />
                </Stack>
            </Box>
        ))
    }

    return (
        <Box>
            {title && (
                <Text fontSize="2xl" fontWeight="bold" mb={4} px={4}>
                    {title}
                </Text>
            )}
            <Grid templateColumns={gridTemplate} gap={4} mt={6} px={4}>
                {isLoading ? (
                    renderSkeleton()
                ) : (
                    sortByDate(articles)?.map((article) => (
                        <Box
                            key={article._id}
                            p={2}
                            backgroundColor={bgColor}
                            borderRadius='5px'
                            position="relative"
                            _hover={{
                                "& .watch-later-icon": {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            }}
                        >
                            <Tooltip
                                label={isInWatchLater(article._id) ? "Remove from Watch Later" : "Add to Watch Later"}
                                placement="top"
                                hasArrow
                                bg="teal.500"
                                color="white"
                                borderRadius="md"
                                px={3}
                                py={1}
                            >
                                <Box
                                    className="watch-later-icon"
                                    position="absolute"
                                    top={2}
                                    right={2}
                                    zIndex={2}
                                    opacity={0}
                                    transform="translateY(-10px)"
                                    transition="all 0.3s ease"
                                    cursor="pointer"
                                    bg={"rgba(0, 0, 0, 0.5)"}
                                    p={2}
                                    borderRadius="full"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleWatchLater(article._id)
                                    }}
                                    _hover={{
                                        bg: "rgba(0, 0, 0, 0.7)",
                                        transform: "translateY(0) scale(1.1)"
                                    }}
                                >
                                    <i
                                        className={isInWatchLater(article._id) ? "fa-solid fa-circle-check" : "fa-solid fa-clock"}
                                        style={{ color: 'white', fontSize: '1.2rem' }}
                                    ></i>
                                </Box>
                            </Tooltip>
                            <Link onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }}>
                                <Image src={article.imageUrl} alt={article.title} objectFit="cover" h="200px" w="100%" borderRadius="5px" transition="opacity 0.2s ease-in-out" _hover={{ opacity: 0.7 }} />
                                <Stack spacing={3}>
                                    <Text fontSize='xl' minH='90px' _hover={{ textDecoration: "underline" }}>{article.title}</Text>
                                    <Stack spacing={1}>
                                        <Text fontSize="sm" color="gray.400">
                                            {article.source?.map((source) => source).join(', ')} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </Text>
                                    </Stack>
                                    <Text noOfLines={2}>{article.description}</Text>
                                </Stack>
                            </Link>
                        </Box>
                    ))
                )}
            </Grid>
        </Box>
    )
}

export default ArticleGrid 