import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as ArticleService from '../services/ArticleService'
import * as CategoryService from '../services/CategoryService'
import ArticleGrid from "../components/ArticleGrid"
import { Box, Text, HStack, VStack, useBreakpointValue } from "@chakra-ui/react"
import { useQuery } from '@tanstack/react-query'
import BreadcrumbNav from '../components/BreadcrumbNav'

const ArticleList = () => {
    const { id: typeId } = useParams()
    const navigate = useNavigate()
    const [articleList, setArticleList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryArticles, setCategoryArticles] = useState({})
    const [parentCategory, setParentCategory] = useState(null)

    const fetchGetArticleByType = async (categoryId) => {
        const res = await ArticleService.getArticleByType(categoryId)
        return res.data
    }

    const fetchCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
    }

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategory,
        retry: 2,
        retryDelay: 1000
    })

    const fetchArticles = async (categoryId) => {
        const articles = await fetchGetArticleByType(categoryId)
        setArticleList(articles)
    }

    const fetchArticlesForSubcategories = async (parentId) => {
        const subcategories = categories?.filter(cat => cat.parentId === parentId) || []
        const articlesMap = {}

        for (const subcategory of subcategories) {
            const articles = await fetchGetArticleByType(subcategory._id)
            articlesMap[subcategory._id] = articles
        }

        setCategoryArticles(articlesMap)
    }

    useEffect(() => {
        const loadData = async () => {
            if (categories) {
                const category = categories.find(cat => cat._id === typeId)
                setSelectedCategory(category)

                if (category?.parentId) {
                    const parent = categories.find(cat => cat._id === category.parentId)
                    setParentCategory(parent)
                } else {
                    setParentCategory(null)
                }
                await fetchArticles(typeId)
                await fetchArticlesForSubcategories(typeId)
            }
        }

        loadData()
    }, [typeId, categories])

    const handleCategoryClick = async (categoryId) => {
        const articles = await fetchGetArticleByType(categoryId)
        setArticleList(articles)
        await fetchArticlesForSubcategories(categoryId)
        navigate(`/type/${categoryId}`)
    }

    return (
        <Box p={[4, 6, 8, 12]} pt={[12, 12, 12, 12]}>
            {selectedCategory && (
                <>
                    <BreadcrumbNav
                        currentCategory={selectedCategory}
                        parentCategory={parentCategory}
                    />
                    <VStack align="stretch">
                        {articleList.length > 0 && (
                            <ArticleGrid articles={articleList} />
                        )}
                        <HStack spacing={4} wrap="wrap">
                            {categories
                                ?.filter(cat => cat.parentId === typeId)
                                .map((category) => (
                                    <Box key={category._id} width="100%">
                                        <Text
                                            fontSize="xl"
                                            fontWeight="bold"
                                            color="teal.600"
                                            mb={4}
                                            cursor="pointer"
                                            _hover={{ color: "teal.400", textDecoration: "underline" }}
                                            onClick={() => handleCategoryClick(category._id)}
                                        >
                                            {category.name}
                                        </Text>
                                        <ArticleGrid articles={categoryArticles[category._id] || []} />
                                    </Box>
                                ))}
                        </HStack>
                    </VStack>
                </>
            )}
        </Box>
    )
}

export default ArticleList