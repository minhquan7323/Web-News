import axios from "axios"

export const createCategory = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/category/create`, data)
    return res.data
}

export const getAllCategory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/getall`)
    return res.data
}

export const updateCategory = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/category/update/${id}`, data)
    return res.data
}

export const getDetailsCategory = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/details/${id}`)
    return res.data
}