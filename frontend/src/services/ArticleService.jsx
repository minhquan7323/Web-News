import axios from "axios"

import * as UserService from './UserService'

export const axiosJWT = UserService.axiosJWT

export const getAllArticle = async (search, types, limit, page, sort) => {
    let res = {}
    let filterParams = []
    if (types?.length > 0) {
        filterParams.push(`filter=type&filter=${types.join(',')}`)
    }
    if (page) {
        filterParams.push(`page=${page}`)
    }
    if (sort) {
        filterParams.push(`sort=${sort}&sort=price`)
    }
    if (limit) {
        filterParams.push(`limit=${limit}`)
    }
    const queryString = filterParams.length > 0 ? `&${filterParams.join('&')}` : '';
    const searchParam = search ? `search=${search}` : '';
    res = await axios.get(`${import.meta.env.VITE_API_URL}/article/getall?${searchParam}${queryString}`);

    return res.data
}

export const getTypeArticle = async (types) => {
    const filterParams = types.map(type => `filter=type&filter=${type}`).join('&')
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/article/getall?${filterParams}`)
    return res.data
}

export const getAllTypeArticle = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/article/getalltypearticle`)
    return res.data
}

export const createArticle = async (data) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL}/article/create`, data)
    return res.data
}

export const updateArticle = async (id, data) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL}/article/update/${id}`, data)
    return res.data
}

export const getDetailsArticle = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/article/details/${id}`)
    return res.data
}

export const deleteArticle = async (id, access_token) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL}/article/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyArticles = async (ids, access_token) => {
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL}/article/deletemany`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}