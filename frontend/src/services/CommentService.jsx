import axios from "axios"

export const getCommentsByPost = async (articleId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${articleId}`)
    return res.data
}

export const createComment = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/comments`, data)
    return res.data
}

export const deleteComment = async (commentId) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`)
    return res.data
}

export const updateComment = async (commentId, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, data)
    return res.data
}

export const getAllComments = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments`)
    return res.data
}
