import axios from "axios"

import * as UserService from './UserService'

export const axiosJWT = UserService.axiosJWT

export const getAllProduct = async (search, types, limit, page, sort, price, covers) => {
    let res = {}
    let filterParams = []
    // if (search?.length > 0) {
    //     filterParams.push(`filter=name&filter=${search}`)
    // }
    if (types?.length > 0) {
        filterParams.push(`filter=type&filter=${types.join(',')}`)
    }
    if (price && price.length === 2) {
        filterParams.push(`filter=price&filter=${price}`)
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
    if (covers?.length > 0) {
        filterParams.push(`filter=cover&filter=${covers.join(',')}`)
    }
    // const queryString = filterParams.length > 0 ? `&${filterParams.join('&')}` : ''
    // res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getall?${queryString}`)
    const queryString = filterParams.length > 0 ? `&${filterParams.join('&')}` : '';
    const searchParam = search ? `search=${search}` : '';
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getall?${searchParam}${queryString}`);

    return res.data
}

export const getTypeProduct = async (types) => {
    const filterParams = types.map(type => `filter=type&filter=${type}`).join('&')
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getall?${filterParams}`)
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getalltypeproduct`)
    return res.data
}

export const createProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailsArticle = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/article/details/${id}`)
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteManyProducts = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/deletemany`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}