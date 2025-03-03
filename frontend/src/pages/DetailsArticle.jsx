import React, { useEffect, useState } from "react"
import axios from "axios"
import { Text, Image, Grid, GridItem, Box, Link, useBreakpointValue, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack } from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
// import CommentFacebook from "../components/CommentFacebook"
import { useParams } from "react-router-dom"
import * as ArticleService from '../services/ArticleService'
import { useQuery } from '@tanstack/react-query'
// import { initFacebookSDK } from "../utils"
import { useMutationHooks } from '../hooks/useMutationHook'
import NewsList from "../components/NewsList"

const DetailsArticle = () => {
    const { id: articleId } = useParams()
    const [isUpdatedRead, setIsUpdatedRead] = useState(false)

    const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, ...rests } = data
            const res = await ArticleService.updateArticle(id, rests)
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

    const { data: allArticles = [] } = useQuery({
        queryKey: ['allArticles'],
        queryFn: fetchAllArticles,
    })

    const { data: articleDetails = {} } = useQuery({
        queryKey: ['details', articleId],
        queryFn: () => fetchGetDetailsArticle(articleId),
        enabled: !!articleId,
    })

    const mostReadArticles = allArticles.sort((a, b) => b.read - a.read).slice(0, 10)
    const aloArticles = allArticles.filter(article => article.type
        .some(category => category.name === 'cc')).slice(0, 3)
    const upNextArticles = allArticles.filter(article => article._id !== articleId)
        .sort(() => Math.random() - 0.5).slice(0, 4)

    // useEffect(() => {
    //     initFacebookSDK()
    // }, [])
    useEffect(() => {
        if (articleDetails?._id && typeof articleDetails.read === 'number' && !isUpdatedRead) {
            mutationUpdate.mutate({
                id: articleDetails._id,
                read: articleDetails.read + 1,
            })
            setIsUpdatedRead(true)
        }
    }, [articleDetails?._id])

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
                                    <Text opacity='0.5  '>👁️ {articleDetails.read || 0} views</Text>
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
                            <Box border="1px solid" borderColor="teal" p={2} mt={10}>
                                <Text as='b' fontSize={'xl'}>Comment</Text>
                                {/* <CommentFacebook dataHref={import.meta.env.VITE_IS_LOCAL ?
                                    `https://yourwebsite.com/products/${articleDetails._id}`
                                    : window.location.href}
                                /> */}
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
                                                        width="100px"
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
                </GridItem>

                <GridItem>
                    <VStack spacing={12}>
                        <NewsList moreFrom={'Most read'} news={mostReadArticles.slice(0, 3)} />
                        <NewsList moreFrom={'Most cc'} news={aloArticles} />
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default DetailsArticle
