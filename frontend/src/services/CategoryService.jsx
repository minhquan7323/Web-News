import axios from "axios"

export const createCategory = async (data) => {
    const payload = {
        ...data,
        parentId: data.parentId || null
    }
    const res = axios.post(`${import.meta.env.VITE_API_URL}/category/create`, payload)
    return res
}

export const getAllCategory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/getall`)
    return res.data
}

export const updateCategory = async (id, data) => {
    const payload = {
        ...data,
        parentId: data.parentId || null
    }
    const res = axios.put(`${import.meta.env.VITE_API_URL}/category/update/${id}`, payload)
    return res
}

export const getDetailsCategory = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/details/${id}`)
    return res.data
}

export const deleteCategory = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/category/delete/${id}`)
    return res
}