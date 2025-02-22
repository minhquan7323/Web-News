import axios from "axios"

export const axiosJWT = axios.create()

export const signInUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, data)
    return res.data
}

export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, data)
    return res.data
}

export const signOutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signout`)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getdetailsuser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getalluser`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/updateuser/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/deleteuser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshtoken`, {
//         withCredentials: true
//     })
//     return res.data
// }
export const refreshToken = async (refresh_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refreshtoken`, {}, {
        headers: {
            token: `Bearer ${refresh_token}`
        }
    })
    return res.data
}

export const deleteManyUsers = async (ids, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/deletemany`, ids, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}