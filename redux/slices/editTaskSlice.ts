import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { images } from "../../images";

const initialState = {
    taskDetail: [],
}



const editTaskSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setPlanState: (state, action) => {

            let temp = [action.payload]
            state.taskDetail = temp
            console.log('state', state.taskDetail)
        },

    },
})


export const { setPlanState } = editTaskSlice.actions




export default editTaskSlice.reducer