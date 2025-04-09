import React, { useState, useEffect } from "react"
import { Box, Text, Grid, GridItem, Image, Divider, HStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import * as CommentService from '../services/CommentService'

const NewsList = ({ moreFrom, news, templateColumnss = "2fr 2fr" }) => {
    const [commentsCount, setCommentsCount] = useState({})
    useEffect(() => {
        const fetchCommentsCount = async () => {
            const counts = {}
            for (const article of news) {
                const res = await CommentService.getCommentsByPost(article._id)
                const filterComments = res.data.filter(comment => comment.pending === false)
                counts[article._id] = filterComments.length
            }
            setCommentsCount(counts)
        }
        fetchCommentsCount()
    }, [news])
    return (
        <Box>
            <Text as="b" borderLeft="6px solid teal" p={1} textTransform="uppercase">
                More from <Box as="span" color="teal">{moreFrom}</Box>
            </Text>
            {news.map((article, index) => (
                <Grid key={index} templateColumns={templateColumnss} gap={4} mt={6}>
                    <Link to={`/article/details/${article._id}`}>
                        <Box transition="opacity 0.1s ease-in-out" _hover={{ opacity: 0.7 }}>
                            <Image src={article.imageUrl} alt={article.title} objectFit="cover" h="auto" maxH='120px' w="100%" />
                        </Box>
                    </Link>
                    <Link to={`/article/details/${article._id}`} >
                        <Text
                            fontSize="xs"
                            maxW="100%"
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
                        <HStack justifyContent='space-between'>
                            <Text fontSize='sm' opacity='0.5'>{article.read} 👁️</Text>
                            <Text fontSize='sm' color='gray.400'>{commentsCount[article._id]} <i className="fa-regular fa-comment"></i></Text>
                        </HStack>
                    </Link>
                    {index < news.length - 1 && (
                        <GridItem key={index} colSpan={2}>
                            <Box py={2}>
                                <Divider borderColor="gray.300" />
                            </Box>
                        </GridItem>
                    )}
                </Grid>
            ))}
        </Box>
    )
}

export default NewsList