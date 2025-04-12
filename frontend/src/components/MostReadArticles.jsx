import React from 'react'
import { Text, Grid, Box, Link, Divider } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';

const MostReadArticles = ({ articles, title = "Đọc nhiều nhất" }) => {
    const navigate = useNavigate();
    const handleDetailsArticle = (id) => {
        navigate(`/article/details/${id}`)
    }
    return (
        <Box pt={12}>
            <Text as="b" fontSize='2xl' textTransform="uppercase" color='teal'>
                {title}
            </Text>
            <Grid templateColumns="1fr 1fr" gap={4} mt={4}>
                {articles.map((article, index) => (
                    <Box key={article._id} display="flex" alignItems="flex-start" gap={2}>
                        <Text fontSize="2xl" color="teal" fontWeight="bold" minWidth="30px">
                            {index + 1}
                        </Text>
                        <Box flex="1">
                            <Link onClick={() => handleDetailsArticle(article._id)}>
                                <Text
                                    fontSize="sm"
                                    lineHeight="24px"
                                    height="72px"
                                    overflow="hidden"
                                    display="-webkit-box"
                                    width="auto"
                                    style={{
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                    }}
                                    noOfLines={3}
                                >
                                    {article.title}
                                </Text>
                            </Link>
                            {index < articles.length - 1 && index !== 8 && <Divider borderColor="gray.300" pt={4} />}
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default MostReadArticles 