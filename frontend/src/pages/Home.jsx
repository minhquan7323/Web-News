import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, Text, Image, Heading, Stack } from "@chakra-ui/react";

const Home = () => {
    const [news, setNews] = useState([]);

    const fetchNews = async () => {
        const urlSearch = `https://newsapi.org/v2/everything?q=tesla&from=2025-01-21&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;
        try {
            const res = await axios.get(urlSearch);
            setNews(res.data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <>
            {news.map((article) => (
                <Card key={article.id} maxW="md" m="4" boxShadow="lg">
                    <Image
                        src={article.urlToImage || "https://via.placeholder.com/150"}
                        alt={article.title}
                        borderRadius="lg"
                    />
                    <CardBody>
                        <Stack spacing={3}>
                            <Heading size="md">{article.title}</Heading>
                            <Text fontSize="sm" color="gray.600">
                                {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                            </Text>
                            <Text noOfLines={3}>{article.description}</Text>
                        </Stack>
                    </CardBody>
                </Card>
            ))}
        </>
    );
};

export default Home;
