import React, { useEffect, useState } from "react"
import ArticleGrid from "../components/ArticleGrid"
import { Box } from "@chakra-ui/react"
import * as ArticleService from '../services/ArticleService'

const FeaturedList = () => {
    const [articles, setArticles] = useState([])

    const fetchAllArticle = async () => {
        const res = await ArticleService.getAllArticle()
        const filteredArticles = res.data?.filter(article => !article.hide) || []
        setArticles(filteredArticles)
    }

    useEffect(() => {
        fetchAllArticle()
    }, [])

    const featuredArticle = articles.filter(article => article.featured)

    return (
        <Box pt={16}>
            <ArticleGrid
                articles={featuredArticle}
                title={'Các bài viết nổi bật'}
                onArticlesChange={setArticles}
            />
        </Box>
    )
}

export default FeaturedList 