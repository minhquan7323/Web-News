import React from "react"
import { Box, Text, Grid, GridItem, Image, Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const NewsList = ({ moreFrom, news, templateColumnss = "2fr 2fr" }) => {
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