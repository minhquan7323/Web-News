import React, { useEffect, useMemo, useRef, useState } from "react"
import { Text, Image, Grid, GridItem, Box, Link, useBreakpointValue, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Input, Button, Avatar, HStack, useColorModeValue } from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useParams } from "react-router-dom"
import { SendOutlined } from '@ant-design/icons'
import * as ArticleService from '../services/ArticleService'
import * as CommentService from '../services/CommentService'
import { useQuery } from '@tanstack/react-query'
import { useMutationHooks } from '../hooks/useMutationHook'
import NewsList from "../components/NewsList"
import { useSelector } from "react-redux"
import CommentPopover from '../components/CommentPopover'

const DetailsArticle = () => {
    const user = useSelector((state) => state?.user)
    const commentsEndRef = useRef(null)
    const { id: articleId } = useParams()
    const [isUpdatedRead, setIsUpdatedRead] = useState(false)
    const [randomCategories, setRandomCategories] = useState([])
    const [upNextArticles, setUpNextArticles] = useState([])
    const [stateComment, setStateComment] = useState({
        userId: user.userId,
        articleId: articleId,
        content: ''
    })

    const mutation = useMutationHooks(async (data) => {
        const { ...rests } = data
        const res = await CommentService.createComment(rests)
        return res
    })
    const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, ...rests } = data
            const res = await ArticleService.updateArticle(id, rests)
            return res
        }
    )
    const mutationUpdateComment = useMutationHooks(
        async (data) => {
            const { commentId, ...rests } = data
            const res = await CommentService.updateComment(commentId, rests)
            return res
        }
    )

    const fetchAllArticles = async () => {
        const res = await ArticleService.getAllArticle()
        return res.data
    }
    const fetchGetDetailsArticle = async (articleId) => {
        if (articleId) {
            const res = await ArticleService.getDetailsArticle(articleId)
            return res.data
        }
    }
    const fetchAllComments = async () => {
        const res = await CommentService.getCommentsByPost(articleId)
        return res.data
    }
    const fetchDeleteComment = async (commentId) => {
        const res = await CommentService.deleteComment(commentId)
        return res.data
    }

    const { data: allArticles = [] } = useQuery({
        queryKey: ['allArticles'],
        queryFn: fetchAllArticles,
    })
    const { data: articleDetails = {} } = useQuery({
        queryKey: ['details', articleId],
        queryFn: () => fetchGetDetailsArticle(articleId),
        enabled: !!articleId,
    })
    const { data: allComments = [], refetch: refetchComments } = useQuery({
        queryKey: ['allComments'],
        queryFn: fetchAllComments,
    })

    const mostReadArticles = useMemo(() =>
        [...allArticles].sort((a, b) => b.read - a.read).slice(0, 10),
        [allArticles]
    )

    useEffect(() => {
        if (allArticles.length > 0) {
            const categories = [...new Set(allArticles.flatMap(article => article.type.map(category => category.name)))]
            const shuffledCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 2)
            setRandomCategories(shuffledCategories)
        }
    }, [allArticles])

    const categorizedArticles = useMemo(() => {
        return randomCategories.map(category => ({
            category,
            articles: allArticles.filter(article =>
                article.type.some(cat => cat.name === category)
            ).slice(0, 3)
        }))
    }, [allArticles, randomCategories])

    useEffect(() => {
        if (articleDetails?._id && typeof articleDetails.read === 'number' && !isUpdatedRead) {
            mutationUpdate.mutate({
                id: articleDetails._id,
                read: articleDetails.read + 1,
            })
            setIsUpdatedRead(true)
        }
    }, [articleDetails?._id, isUpdatedRead])

    useEffect(() => {
        const filteredArticles = allArticles
            .filter(article => article._id !== articleId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
        setUpNextArticles(filteredArticles)

    }, [allArticles, articleId])


    const scrollToBottom = () => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollTop = commentsEndRef.current.scrollHeight
        }
    }

    const handleComment = () => {
        if (!stateComment.content.trim()) return
        mutation.mutate(stateComment, {
            onSettled: () => {
                refetchComments().then(() => {
                    setTimeout(scrollToBottom, 100)
                })
            }
        })
        setStateComment({ ...stateComment, content: '' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [allComments])

    const handleOnchange = (e) => {
        setStateComment({
            userId: user.userId,
            articleId: articleId,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteComment = async (commentId) => {
        await fetchDeleteComment(commentId)
        refetchComments()
    }

    const handleApproveComment = async (commentId) => {
        mutationUpdateComment.mutate(
            { commentId, pending: false },
            {
                onSettled: () => {
                    refetchComments()
                }
            }
        )
    }

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr",
        md: "1fr",
        lg: "9fr 3fr",
    })

    return (
        <Box p={[4, 6, 8, 12]} pt={[12, 12, 12, 12]}>
            <Breadcrumb spacing='8px' py={4} separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'><Text as='b'>Home</Text></BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>Details</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Grid templateColumns={gridTemplate} gap={6}>
                <Box>
                    <Text as='b' fontSize='5xl'>
                        {articleDetails.title}
                    </Text>
                    <Box p={8} color="gray">
                        <Box>
                            <Text>
                                By <u>{articleDetails.author}</u>
                            </Text>
                        </Box>
                        <Box>
                            Updated at {new Date(articleDetails.updatedAt).toLocaleString()}
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid templateColumns={gridTemplate} gap={6}>
                <GridItem>
                    <Box>
                        <Box>
                            <Box>
                                <Image src={articleDetails.imageUrl} alt={articleDetails.title} objectFit="cover" h="auto" w="100%" />
                                <Box p={4}>
                                    <Text opacity='0.5'>👁️ {articleDetails.read || 0} views</Text>
                                    <Text fontSize='24px' align='center'>{articleDetails.description}</Text>
                                </Box>
                            </Box>
                            <Box py={2}>
                                <Divider borderColor="gray.300" />
                            </Box>
                            <Box p={6}>
                                <Box dangerouslySetInnerHTML={{ __html: articleDetails.content }} />
                            </Box>
                        </Box>
                        <Box py={2}>
                            <Divider borderColor="gray.300" />
                        </Box>
                        <Box width={'100%'}>
                            <Box
                                backgroundColor={useColorModeValue("gray.50", "gray.700")} borderRadius="5px" p={2}>
                                <Text as='b' fontSize={'xl'} textTransform='uppercase'>Comment</Text>
                                {/* <CommentFacebook dataHref={import.meta.env.VITE_IS_LOCAL ?
                                    `https://yourwebsite.com/products/${articleDetails._id}`
                                    : window.location.href}
                                /> */}
                                {allComments.length > 0 ? (
                                    <VStack align='left' overflow='auto' height='250px' my={4} ref={commentsEndRef}>
                                        {allComments.map((comment) => (
                                            (!comment.pending || user?.isAdmin || comment.userId === user?.userId) && (
                                                <Box key={comment._id}>
                                                    <HStack align='top'>
                                                        <HStack flex={1} opacity={comment.pending ? 0.5 : 1} transition="opacity 0.3s ease">
                                                            <Avatar name={comment.fullName} src={comment.imageUrl} />
                                                            <VStack align='left' w='100%'>
                                                                <HStack w='100%' justifyContent='space-between'>
                                                                    <Text fontWeight='bold'>{comment.fullName}</Text>
                                                                    {!user?.isAdmin && comment.pending && (
                                                                        <Text fontSize="sm" color="yellow.500">Waiting for approval</Text>
                                                                    )}
                                                                </HStack>
                                                                <HStack justifyContent='space-between'>
                                                                    <Text>{comment.content}</Text>
                                                                    <Text fontSize='sm' color='gray.400'>
                                                                        {new Date(comment.createdAt).toLocaleString()}
                                                                    </Text>
                                                                </HStack>
                                                            </VStack>
                                                        </HStack>
                                                        <Box pr={2}>
                                                            {user?.isAdmin && (
                                                                <CommentPopover
                                                                    comment={comment}
                                                                    onDelete={handleDeleteComment}
                                                                    onApprove={handleApproveComment}
                                                                />
                                                            )}
                                                        </Box>
                                                    </HStack>
                                                </Box>
                                            )
                                        ))}
                                    </VStack>
                                ) : (
                                    <VStack overflow='auto' height='200px' my={4} ref={commentsEndRef} justify="center" align="center">
                                        <Text fontSize='2xl' color='gray.400'>
                                            No comments yet
                                        </Text>
                                    </VStack>
                                )}
                                {user?.userId ? (
                                    <Box display='flex' gap={2}>
                                        <Input placeholder="Comment here" value={stateComment.content}
                                            name="content" onChange={handleOnchange}
                                            onKeyDown={(e) => e.key === "Enter" && handleComment()}
                                        />
                                        <Button colorScheme="teal" onClick={() => handleComment()}><SendOutlined /></Button>
                                    </Box>
                                ) : (
                                    <Box textAlign='center' fontWeight='bold' color='red'>
                                        Sign in to comment
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Box px={[4, 6, 8, 12]}>
                            <Box pt={12}>
                                <Text as="b" fontSize='2xl' textTransform="uppercase">
                                    Up Next
                                </Text>
                                {upNextArticles.map((article, index) => (
                                    <Grid key={index} templateColumns="2fr 1fr" gap={4} mt={4}>
                                        <Link href={article._id} >
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
                                        <Link href={article._id} transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}>
                                            <Image src={article.imageUrl} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                                        </Link>
                                        {index < upNextArticles.length - 1 && (
                                            <GridItem key={index} colSpan={2}>
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
                                    {mostReadArticles.map((article, index) => (
                                        <Box key={article._id} display="flex" alignItems="flex-start" gap={2}>
                                            <Text fontSize="2xl" color="teal" fontWeight="bold" minWidth="30px">
                                                {index + 1}
                                            </Text>
                                            <Box flex="1">
                                                <Link href={article._id}>
                                                    <Text
                                                        fontSize="sm"
                                                        lineHeight="24px"
                                                        height="72px"
                                                        overflow="hidden"
                                                        display="-webkit-box"
                                                        width="auto"
                                                        style={{
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                        }}
                                                    >
                                                        {article.title}
                                                    </Text>
                                                </Link>
                                                {index < mostReadArticles.length - 1 && <Divider borderColor="gray.300" pt={4} />}
                                            </Box>
                                        </Box>
                                    ))}
                                </Grid>
                            </Box>

                        </Box>
                    </Box>
                </GridItem >

                <GridItem>
                    <VStack spacing={12}>
                        {categorizedArticles.map(({ category, articles }, index) => (
                            <NewsList key={index} moreFrom={category} news={articles} />
                        ))}
                    </VStack>
                </GridItem>
            </Grid >
        </Box >
    )
}

export default DetailsArticle
