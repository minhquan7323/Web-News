import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import Editor from '../pages/editor'
import DetailsArticle from '../pages/DetailsArticle'
import NotFound from '../pages/NotFound'
import Admin from '../pages/Admin'
import ArticleAdd from '../pages/ArticleAdd'
import ArticleUpdate from '../pages/ArticleUpdate'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='editor' element={<Editor />} />
                <Route path='article/details/:id' element={<DetailsArticle />} />
                <Route path='system/admin' element={<Admin />} />
                <Route path='system/admin/add-article' element={<ArticleAdd />} />
                <Route path='system/admin/update-article/:id' element={<ArticleUpdate />} />
                {/* <Route path="system/admin" element={user && isCheckAdmin ? <Admin /> : <NotFound />} /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
export default AppRoutes