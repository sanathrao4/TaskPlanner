import { combineReducers } from "redux";
import authSliceReducer from "./slices/authSlice";
import plannedTaskListSliceReducer from './slices/taskSlice'
import userListSliceReducer from "./slices/userListSlice";
import editTaskSliceReducer from "./slices/editTaskSlice";


export default combineReducers({
    auth: authSliceReducer,
    userList: userListSliceReducer,
    taskList: plannedTaskListSliceReducer,
    editTaskList: editTaskSliceReducer
})

