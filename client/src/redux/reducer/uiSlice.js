import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { keyword: null },
    reducers: {
        setKeyword: (state, action) => {
            console.log(action.payload)
            state.keyword = action.payload
        }

    }
})


export const { setKeyword } = uiSlice.actions
export default uiSlice.reducer
