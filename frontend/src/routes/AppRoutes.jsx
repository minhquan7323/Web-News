import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import App from '../App'
import SignIn from '../pages/SignIn'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
            </Route>
            {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
    )
}
export default AppRoutes