import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Text, Spinner, Grid, Link, GridItem, Divider, Image, VStack, Input, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import * as ArticleService from '../services/ArticleService'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronRightIcon } from '@chakra-ui/icons'

const ArticleSearch = () => {
    const location = useLocation()
    const observerRef = useRef()
    const navigate = useNavigate()
    const lastArticleRef = useRef()

    const [query, setQuery] = useState(location.state?.query || "")
    const [newsSearch, setNewsSearch] = useState('')

    const fetchAllArticle = async ({ pageParam = 1 }) => {
        const res = await ArticleService.getAllArticle(query, [], 1, pageParam)
        return res?.data || []
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useInfiniteQuery({
        queryKey: ['articles', query],
        queryFn: fetchAllArticle,
        initialPageParam: 1,
        enabled: !!query,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
    })

    const onSearch = () => {
        setNewsSearch(query)
        if (newsSearch.trim()) {
            navigate('/search', { state: { query: newsSearch } })
            setNewsSearch('')
        }
    }
    useEffect(() => {
        if (isFetchingNextPage) return
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })
        if (lastArticleRef.current) {
            observerRef.current.observe(lastArticleRef.current)
        }
        return () => observerRef.current?.disconnect()
    }, [isFetchingNextPage, hasNextPage])
    useEffect(() => {
        if (location.state?.query) {
            setQuery(location.state.query)
        }
    }, [location.state])
    useEffect(() => {
        if (query) {
            refetch()
        }
    }, [query, refetch])

    const validSearch = newsSearch != ''
    return (
        <Box p={[4, 6, 8, 12]} pt={[12, 12, 12, 12]}>
            <Breadcrumb spacing='8px' py={4} separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'><Text as='b'>Home</Text></BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Search</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box>
                <Box display="flex" alignItems="center" p={8}>
                    <Input
                        placeholder='Search'
                        mr={2}
                        color='teal'
                        value={newsSearch}
                        onChange={(e) => setNewsSearch(e.target.value)}
                        onKeyDown={(k) => {
                            if (k.key === "Enter") {
                                onSearch()
                            }
                        }}
                    />
                    <Button colorScheme='teal' size='md' onClick={onSearch} disabled={!validSearch}>
                        <i className="fas fa-magnifying-glass"></i>
                    </Button>
                </Box>
                <Divider borderColor="teal" />
            </Box>
            {isLoading ? (
                <Spinner size='xl' />
            ) : data?.pages.map((page, pageIndex) => (
                page.map((item, index) => {
                    const isLastItem = pageIndex === data.pages.length - 1 && index === page.length - 1
                    return (
                        <Box key={item._id} ref={isLastItem ? lastArticleRef : null}>
                            <Box py={4}>
                                <Link href={item.url}>
                                    <Grid templateColumns="2fr 3fr" gap={4}>
                                        <Image src={item.imageUrl} alt={item.title}
                                            objectFit="cover" h='auto' minH="80px" maxH='200px'
                                            w="100%" minW='100px'
                                            transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}
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
                                            >
                                                {item.title}
                                            </Text>
                                            <Text fontSize='sm' color='gray'>{new Date(item.updatedAt).toLocaleString()}</Text>
                                            <Text>{item.description}</Text>
                                        </VStack>
                                    </Grid>
                                </Link>
                            </Box>
                            {!isLastItem && <Divider borderColor="gray.300" />}
                            {/* {!(pageIndex === data.pages.length - 1 && index === page.length - 1) ? (
                                <Box py={2}>
                                    <Divider borderColor="gray.300" />
                                </Box>
                            ) : null} */}


                        </Box>
                    )
                })
            ))}

            {isFetchingNextPage && <Spinner size='md' mt={4} />}
        </Box>
    )
}

export default ArticleSearch
