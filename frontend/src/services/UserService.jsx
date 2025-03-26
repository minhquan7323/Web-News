import axios from "axios"

export const signInUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, data)
    return res.data
}

export const getDetailsUser = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/details/${userId}`)
    return res.data
}

export const getAllUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getall`)
    return res.data
}

export const updateUser = async (userId, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update/${userId}`, data)
    return res.data
}

export const getWatchLater = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/watch-later/${userId}`)
    return res.data
}

export const addWatchLater = async (userId, articleId) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/add-watch-later`, { userId, articleId })
    return res.data
}

export const removeWatchLater = async (userId, articleId) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/remove-watch-later`, { userId, articleId })
    return res.data
}
