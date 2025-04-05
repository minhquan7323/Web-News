import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as UserService from '../services/UserService'
import ArticleGrid from "../components/ArticleGrid"
import { Box } from "@chakra-ui/react"

const WatchLater = () => {
    const [watchLaterList, setWatchLaterList] = useState([])
    const user = useSelector((state) => state?.user)

    const fetchWatchLater = async () => {
        const res = await UserService.getWatchLater(user?.userId)
        setWatchLaterList(res.data)
    }

    useEffect(() => {
        if (user?.userId) {
            fetchWatchLater()
        }
    }, [user?.userId])

    return (
        <Box pt={16}>
            <ArticleGrid
                articles={watchLaterList}
                title={'Watch Later List'}
                onArticlesChange={setWatchLaterList}
                isWatchLaterList={true}
            />
        </Box>
    )
}

export default WatchLater 