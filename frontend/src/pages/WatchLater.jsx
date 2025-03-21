import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as UserService from '../services/UserService'
import ArticleGrid from "../components/ArticleGrid"

const WatchLater = () => {
    const [watchLaterList, setWatchLaterList] = useState([])
    const user = useSelector((state) => state?.user)

    const fetchWatchLater = async () => {
        const res = await UserService.getWatchLater(user?.userId)
        if (res?.status === "OK") {
            setWatchLaterList(res.data)
        }
    }

    useEffect(() => {
        if (user?.userId) {
            fetchWatchLater()
        }
    }, [user?.userId])

    return <ArticleGrid articles={watchLaterList} title={'Watch Later List'} />
}

export default WatchLater 