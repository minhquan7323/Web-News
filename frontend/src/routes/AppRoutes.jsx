import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import DetailsArticle from '../pages/DetailsArticle'
import NotFound from '../pages/NotFound'
import Admin from '../pages/Admin'
import ArticleAdd from '../pages/Admin/ArticleAdd'
import ArticleUpdate from '../pages/Admin/ArticleUpdate'
import ArticleSearch from '../pages/ArticleSearch'
import * as UserService from '../services/UserService'
import { useUser } from '@clerk/clerk-react'
import ArticleList from '../pages/ArticleList'
import WatchLater from "../pages/WatchLater"
import FeaturedList from '../pages/FeaturedList'

const AppRoutes = () => {
    const [isAdmin, setIsAdmin] = useState('')
    const { user } = useUser()

    const handleGetDetailsUser = async (userId) => {
        const res = await UserService.getDetailsUser(userId)
        setIsAdmin(res.data.isAdmin)

    }
    useEffect(() => {
        if (user) {
            handleGetDetailsUser(user.id)
        }
    }, [user])

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='article/details/:id' element={<DetailsArticle />} />
                <Route path='search' element={<ArticleSearch />} />
                <Route path='type/:id' element={<ArticleList />} />
                <Route path='featured-list' element={<FeaturedList />} />
                {user?.id && (
                    <Route path='watch-later' element={<WatchLater />} />
                )}
                {isAdmin && (
                    <>
                        <Route path='system/admin' element={<Admin />} />
                        <Route path='system/admin/add-article' element={<ArticleAdd />} />
                        <Route path='system/admin/update-article/:id' element={<ArticleUpdate />} />
                    </>
                )}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
export default AppRoutes