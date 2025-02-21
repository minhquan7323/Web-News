import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import Editor from '../pages/editor'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/editor' element={<Editor />} />
            </Route>
            {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
    )
}
export default AppRoutes