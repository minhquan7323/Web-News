import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import * as ArticleService from '../services/ArticleService'
import ArticleGrid from "../components/ArticleGrid"

const ArticleList = () => {
    const { id: typeId } = useParams()
    const [articleList, setArticleList] = useState([])

    const fetchGetArticleByType = async () => {
        const res = await ArticleService.getArticleByType(typeId)
        setArticleList(res.data)
    }

    useEffect(() => {
        fetchGetArticleByType()
    }, [typeId])

    return <ArticleGrid articles={articleList} />
}

export default ArticleList
