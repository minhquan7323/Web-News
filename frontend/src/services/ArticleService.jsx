import axios from "axios"

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
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/article/create`, data)
    return res.data
}

export const updateArticle = async (id, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/article/update/${id}`, data)
    return res.data
}

export const getDetailsArticle = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/article/details/${id}`)
    return res.data
}

export const deleteArticle = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/article/delete/${id}`)
    return res.data
}

export const deleteManyArticles = async (ids) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/article/deletemany`, ids)
    return res.data
}