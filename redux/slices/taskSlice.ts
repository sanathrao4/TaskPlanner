import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { images } from "../../images";

const initialState = {
    planList: [],
}

// [task1, task2, task3,.....]

// task1: {
//       name: exercise,
//       category: selectedCategory,
//       date: date.toDateString(),
//       time: time.toTimeString(),
//       sets: totalSets,
//       reps: repsList,
//     }



const plannedTaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addToPlan: (state, action) => {

            let temp = [...state.planList, action.payload]
            state.planList = temp
            console.log('state', state.planList)
        },
        removeFromPlan: (state, action) => {
            state.planList = [...action.payload]
        },
        clearAll: (state, action) => {

        }
    },
})


export const { addToPlan } = plannedTaskSlice.actions




export default plannedTaskSlice.reducer