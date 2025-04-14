import React from 'react'
import { SimpleGrid, Stat, StatLabel, StatNumber, Skeleton, useColorModeValue } from '@chakra-ui/react'
import * as CommentService from '../services/CommentService'
import * as ArticleService from '../services/ArticleService'
import * as UserService from '../services/UserService'
import { useDataQuery } from '../hooks/useDataQuery'

const Dashboard = () => {
    const articleQuery = useDataQuery('articles', ArticleService.getAllArticle)
    const userQuery = useDataQuery('allUsers', UserService.getAllUser)
    const commentQuery = useDataQuery('allComments', CommentService.getAllComments)

    const stats = {
        articles: articleQuery.data?.length,
        users: userQuery.data?.length,
        comments: commentQuery.data?.length,
        views: articleQuery.data?.reduce((sum, article) => sum + (article.read), 0),
    }

    const statItems = [
        { label: 'Bài báo', key: 'articles', isLoading: articleQuery?.isLoading },
        { label: 'Người dùng', key: 'users', isLoading: userQuery?.isLoading },
        { label: 'Bình luận', key: 'comments', isLoading: commentQuery?.isLoading },
        { label: 'Lượt xem', key: 'views', isLoading: articleQuery?.isLoading },
    ]
    const numberColor = useColorModeValue('teal.600', 'teal.200')
    const labelColor = useColorModeValue('gray.600', 'gray.300')
    const cardBg = useColorModeValue('white', 'gray.700')

    return (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={4} px={4}>
            {statItems.map(({ label, key, isLoading }) => (
                <Stat
                    key={key}
                    p={2}
                    bg={cardBg}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="md"
                >
                    <StatLabel color={labelColor}>{label}</StatLabel>
                    <Skeleton isLoaded={!isLoading}>
                        <StatNumber color={numberColor}>{stats[key]}</StatNumber>
                    </Skeleton>
                </Stat>
            ))}
        </SimpleGrid>
    )
}

export default Dashboard