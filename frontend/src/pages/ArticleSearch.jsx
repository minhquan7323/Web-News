import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Text, Input, Button, Divider } from '@chakra-ui/react'
import * as ArticleService from '../services/ArticleService'
import BreadcrumbNav from '../components/BreadcrumbNav'
import InfiniteArticleList from '../components/InfiniteArticleList'

const ArticleSearch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [query, setQuery] = useState(location.state?.query || "")
    const [newsSearch, setNewsSearch] = useState('')
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchAllArticle = async (searchQuery) => {
        setIsLoading(true)
        const res = await ArticleService.getAllArticle(searchQuery)
        setArticles(res?.data || [])
        setIsLoading(false)
    }

    const onSearch = () => {
        if (newsSearch.trim()) {
            setQuery(newsSearch)
            navigate('/search', { state: { query: newsSearch } })
            setNewsSearch('')
        }
    }

    useEffect(() => {
        if (location.state?.query) {
            setQuery(location.state.query)
        }
    }, [location.state])

    useEffect(() => {
        if (query) {
            fetchAllArticle(query)
        }
    }, [query])

    const validSearch = newsSearch != ''
    return (
        <Box p={[4, 6, 8, 12]} pt={[12, 12, 12, 12]}>
            <BreadcrumbNav title='Search' />
            <Box>
                <Box display="flex" alignItems="center" p={8}>
                    <Input
                        placeholder='Search'
                        mr={2}
                        color='teal'
                        value={newsSearch}
                        onChange={(e) => setNewsSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSearch()}
                    />
                    <Button colorScheme='teal' size='md' onClick={onSearch} disabled={!validSearch}>
                        <i className="fas fa-magnifying-glass"></i>
                    </Button>
                </Box>
                <Divider borderColor="teal" />
            </Box>
            <Box pt={4}>
                <Text fontSize='xl' fontWeight='bold'>Search with "<Text as='span' color='teal'>{query}</Text>"</Text>
            </Box>

            <InfiniteArticleList
                data={articles}
                isLoading={isLoading}
            />
        </Box>
    )
}

export default ArticleSearch