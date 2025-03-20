import axios from "axios"

export const signInUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, data)
    return res.data
}

export const getDetailsUser = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/details/${userId}`)
    return res.data
}

// export const signUpUser = async (data) => {
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, data)
//     return res.data
// }

// export const signOutUser = async () => {
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signout`)
//     return res.data
// }

// export const deleteUser = async (id, access_token) => {
//     const res = await axios.delete(`${import.meta.env.VITE_API_URL}/user/deleteuser/${id}`, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

// export const deleteManyUsers = async (ids, access_token) => {
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/deletemany`, ids, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

export const getAllUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getall`)
    return res.data
}

export const updateUser = async (userId, data) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update/${userId}`, data)
    return res.data
}