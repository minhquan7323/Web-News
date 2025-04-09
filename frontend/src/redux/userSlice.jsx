import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    isAdmin: '',
    imageUrl: '',
    fullName: '',
    isBanned: ''
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { userId = '', isAdmin = '', imageUrl = '', fullName = '', isBanned = '' } = action.payload
            state.userId = userId
            state.isAdmin = isAdmin
            state.imageUrl = imageUrl
            state.fullName = fullName
            state.isBanned = isBanned
        },
        resetUser: () => ({ ...initialState })
    }
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer