import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
    // id: null,
    isLoggedIn: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
            // state.id = action.payload.id
            state.isLoggedIn = true
            console.log('iddddd', state.id)
        },
        logout: (state) => {
            state.email = null
            state.password = null
            state.id = null
            state.isLoggedIn = false
        }
    }
})


export const { login, logout } = authSlice.actions


export default authSlice.reducer