import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import notesReducer from "./reducer/notes";
import uiSlice from "./reducer/uiSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";


const store = configureStore({
    reducer: {
        user: userReducer,
        notes: notesReducer,
        ui: uiSlice
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    // middleware: [thunk],
    // middleware: [thunk],
    // reducer: {
    //     user: userSlice,
    // },
})


export default store