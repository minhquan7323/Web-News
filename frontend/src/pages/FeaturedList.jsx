import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import * as ArticleService from '../services/ArticleService'
import * as CategoryService from '../services/CategoryService'
import ArticleGrid from "../components/ArticleGrid"
import { Box, Text, HStack, VStack, useColorModeValue } from "@chakra-ui/react"
import { useQuery } from '@tanstack/react-query'
import BreadcrumbNav from '../components/BreadcrumbNav'
import { ArticleGridSkeleton } from "../components/SkeletonComponent" // Đảm bảo đúng đường dẫn import

const ArticleList = () => {
    const { id: typeId } = useParams()
    const navigate = useNavigate()
    const [articleList, setArticleList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryArticles, setCategoryArticles] = useState({})
    const [parentCategory, setParentCategory] = useState(null)
    const [isSubLoading, setIsSubLoading] = useState(true) // State quản lý loading tổng cho subcategories

    const skeletonBgColor = useColorModeValue("gray.100", "gray.700")

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
        const filterArticles = articles.filter(article => article.hide === false)
        setArticleList(filterArticles)
    }

    const fetchArticlesForSubcategories = async (parentId) => {
        setIsSubLoading(true) // Bắt đầu kích hoạt trạng thái loading tổng
        const subcategories = categories?.filter(cat => cat.parentId === parentId) || []
        const articlesMap = {}

        // Sử dụng Promise.all để fetch API đồng thời cho tất cả các subcategory (nhanh hơn vòng for cũ)
        await Promise.all(
            subcategories.map(async (subcategory) => {
                const articles = await fetchGetArticleByType(subcategory._id)
                // Lọc bỏ bài viết bị ẩn ngay khi lấy về
                articlesMap[subcategory._id] = articles.filter(article => article.hide === false)
            })
        )

        setCategoryArticles(articlesMap)
        setIsSubLoading(false) // Đã tải xong toàn bộ dữ liệu của subcategories
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
                    <VStack align="stretch" spacing={8}>
                        {articleList.length > 0 && (
                            <ArticleGrid articles={articleList} isLoading={false} />
                        )}
                        
                        <HStack spacing={4} wrap="wrap" width="100%">
                            {isSubLoading ? (
                                // Hiển thị 1 skeleton tổng đại diện trong lúc đợi tất cả các API con chạy xong
                                <Box width="100%" px={4}>
                                    <Text fontSize="xl" fontWeight="bold" color="gray.400" mb={4}>
                                        Đang tải danh mục...
                                    </Text>
                                    <ArticleGridSkeleton bgColor={skeletonBgColor} />
                                </Box>
                            ) : (
                                // Sau khi hoàn tất load dữ liệu, tiến hành lọc sạch: Chỉ hiện subcategory có bài viết (> 0)
                                categories
                                    ?.filter(cat => cat.parentId === typeId)
                                    ?.filter(cat => categoryArticles[cat._id] && categoryArticles[cat._id].length > 0)
                                    ?.map((category) => (
                                        <Box key={category._id} width="100%" mb={6}>
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
                                            <ArticleGrid 
                                                articles={categoryArticles[category._id]} 
                                                isLoading={false} 
                                            />
                                        </Box>
                                    ))
                            )}
                        </HStack>
                    </VStack>
                </>
            )}
        </Box>
    )
}

export default ArticleList