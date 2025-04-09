import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Grid, Link, Divider, Image, VStack, HStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { sortByDate } from '../utils'
import { ArticleInfinitySkeleton } from './SkeletonComponent'
import * as CommentService from '../services/CommentService'

const InfiniteArticleList = ({
    data,
    isLoading,
    emptyMessage = "No articles found",
    emptySubMessage = "There are no articles available at the moment",
    skipFirstArticle = false,
    description = true,
    itemsPerPage = 6
}) => {
    const navigate = useNavigate()
    const [displayedItems, setDisplayedItems] = useState(itemsPerPage)
    const [loadMore, setLoadMore] = useState(false)
    const listRef = useRef(null)
    const [commentsCount, setCommentsCount] = useState({})

    // Xử lý dữ liệu
    const allArticles = Array.isArray(data) ? data : (data?.pages ? data.pages.flat() : [])
    const sortedArticles = sortByDate(allArticles)
    const visibleArticles = sortedArticles.slice(0, displayedItems)

    useEffect(() => {
        setDisplayedItems(itemsPerPage)
    }, [data, itemsPerPage])

    useEffect(() => {
        if (loadMore && displayedItems < sortedArticles.length) {
            setDisplayedItems(prev => Math.min(prev + itemsPerPage, sortedArticles.length))
            setLoadMore(false)
        }
    }, [loadMore, displayedItems, sortedArticles.length, itemsPerPage])

    useEffect(() => {
        const handleScroll = () => {
            if (!listRef.current) return

            const scrollPosition = window.scrollY + window.innerHeight
            const listHeight = listRef.current.clientHeight + listRef.current.offsetTop

            if (scrollPosition >= listHeight - 100) {
                setLoadMore(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (listRef.current && listRef.current.clientHeight <= window.innerHeight && sortedArticles.length > displayedItems) {
            setLoadMore(true)
        }
    }, [sortedArticles.length, displayedItems])

    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }
    useEffect(() => {
        const fetchCommentsCount = async () => {
            const counts = {}
            for (const article of data) {
                const res = await CommentService.getCommentsByPost(article._id)
                const filterComments = res.data.filter(comment => comment.pending === false)
                counts[article._id] = filterComments.length
            }
            setCommentsCount(counts)
        }
        fetchCommentsCount()
    }, [data])
    if (isLoading) {
        return (
            <VStack spacing={4} width="100%">
                {[1, 2, 3, 4, 5].map((index) => (
                    <ArticleInfinitySkeleton key={index} />
                ))}
            </VStack>
        )
    }

    if (!allArticles || allArticles.length === 0) {
        return (
            <Box textAlign="center" py={10}>
                <Text fontSize="xl" color="gray.500">{emptyMessage}</Text>
                <Text mt={2} color="gray.400">{emptySubMessage}</Text>
            </Box>
        )
    }

    return (
        <Box ref={listRef}>
            {visibleArticles.map((article, index) => {
                const shouldSkip = skipFirstArticle && index === 0
                if (shouldSkip) return null

                return (
                    <Box key={article._id}>
                        <Box py={4}>
                            <Link onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none", color: "teal" }}>
                                <Grid templateColumns="2fr 3fr" gap={4}>
                                    <Image
                                        src={article.imageUrl || "https://via.placeholder.com/150"}
                                        alt={article.title}
                                        objectFit="cover"
                                        h='auto'
                                        minH="80px"
                                        maxH='200px'
                                        w="100%"
                                        minW='100px'
                                        borderRadius="5px"
                                        transition="opacity 0.1s ease-in-out"
                                        _hover={{ opacity: 0.7 }}
                                    />

                                    <VStack align='start'>
                                        <Text
                                            fontSize='lg'
                                            fontWeight='bold'
                                            lineHeight="24px"
                                            height="48px"
                                            overflow="hidden"
                                            display="-webkit-box"
                                            style={{
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                            _hover={{ textDecoration: "underline" }}
                                        >
                                            {article.title}
                                        </Text>
                                        <Text fontSize='sm' color='gray'>
                                            {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </Text>
                                        {description && <Text noOfLines={2}>{article.description}</Text>}
                                        <HStack width="100%" justifyContent="flex-end" spacing={4}>
                                            <Text fontSize='sm' opacity='0.5'>{article.read} 👁️</Text>
                                            <Text fontSize='sm' color='gray.400'>{commentsCount[article._id]} <i className="fa-regular fa-comment"></i></Text>
                                        </HStack>
                                    </VStack>
                                </Grid>
                            </Link>
                        </Box>
                        {index < visibleArticles.length - 1 && <Divider borderColor="gray.300" />}
                    </Box>
                )
            })}
        </Box>
    )
}

export default InfiniteArticleList 