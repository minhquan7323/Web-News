import React, { useEffect, useState } from "react"
import { Card, CardBody, Text, Image, Heading, Stack, Grid, GridItem, Box, Link, useBreakpointValue, Flex, Divider, HStack, VStack, } from "@chakra-ui/react"
import * as ArticleService from '../services/ArticleService'
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
const Home = () => {
    const fetchGetDetailsArticle = async (articleId) => {
        const res = await ArticleService.getDetailsArticle('67b8a4b8890843722000d625')
        console.log(res.data);

        return res.data
        // }
    }

    const navigate = useNavigate()
    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }

    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        return res.data
    }

    const queryArticle = useQuery({
        queryKey: ['articles'],
        queryFn: fetchAllArticle,
        retry: 3,
        retryDelay: 1000,
    })
    const { isLoading: isLoadingArticles, data: articles } = queryArticle

    return (
        <Box p={4} paddingTop={10}>
            <Grid templateColumns="2fr 1fr" gap={6} mt={6}>
                <GridItem>
                    {articles?.slice(0, 1).map((article) => (
                        <Link key={article._id} href={article.url} isExternal _hover={{ textDecoration: "none" }}>
                            <Image src={article.imageUrl || "https://via.placeholder.com/150"} alt={article.title} borderRadius="5px" objectFit="cover" h="100%" maxH="500px" w="100%" transition="opacity 0.2s ease-in-out" _hover={{ opacity: 0.7 }} />
                            <Stack spacing={3}>
                                <Text fontSize='3xl'>
                                    {article.title}
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    {article.source} - {new Date(article.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                                <Text noOfLines={2}>
                                    {article.description}
                                </Text>
                            </Stack>
                        </Link>
                    ))}
                    {/* <VStack alignItems="start" spacing={4} w="100%">
                        {articles?.map((article, index) => (
                            <React.Fragment key={article._id}>
                                <Box onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }} cursor='pointer'>
                                    <HStack alignItems="start" >
                                        <Image
                                            src={article.imageUrl || "https://via.placeholder.com/150"}
                                            alt={article.title}
                                            borderRadius="5px"
                                            objectFit="cover"
                                            h="100px"
                                            w="100px"
                                            transition="opacity 0.2s ease-in-out"
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
                                {index < articles.length - 1 && (
                                    <Box py={2} w="100%">
                                        <Divider borderColor="gray.300" />
                                    </Box>
                                )}
                            </React.Fragment>
                        ))}
                    </VStack> */}
                </GridItem>
                <GridItem>
                    <VStack alignItems="start" spacing={4} w="100%">
                        {articles?.map((article, index) => (
                            <React.Fragment key={article._id}>
                                <Box onClick={() => handleDetailsArticle(article._id)} _hover={{ textDecoration: "none" }} cursor='pointer'>
                                    <HStack alignItems="start" >
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            borderRadius="5px"
                                            objectFit="cover"
                                            h="100px"
                                            w="100px"
                                            transition="opacity 0.2s ease-in-out"
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
                                {index < articles.length - 1 && (
                                    <Box py={2} w="100%">
                                        <Divider borderColor="gray.300" />
                                    </Box>
                                )}
                            </React.Fragment>
                        ))}
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Home
