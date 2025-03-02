import axios from "axios"

export const signInUser = async (userId) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, { userId })
    return res.data
}

export const getDetailsUser = async (userId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getdetailsuser/${userId}`)
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

// export const getDetailsUser = async (id, access_token) => {
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getdetailsuser/${id}`, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

// export const getAllUser = async (access_token) => {
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/getalluser`, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }

// export const updateUser = async (id, data, access_token) => {
//     const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/updateuser/${id}`, data, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
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