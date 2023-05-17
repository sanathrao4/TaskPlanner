import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    userList: []
}
const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        setUserState: (state, action) => {
            let temp = [...action.payload]
            state.userList = temp
        },

    }
})


export const { setUserState } = userListSlice.actions


export default userListSlice.reducer