import axios from 'axios'

export const loginUser = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.post('/user/login', formData)
        dispatch({ type: "SET_CREDENTIALS", payload: data })
        return data
    } catch(err) {
        console.log(err)
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/user/logout')
        dispatch({ type: "DELETE_CREDENTIALS", payload: null})
        return data
    } catch(err) {
        console.log(err)
    }
}

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/user/getuser')
        dispatch({ type: "SET_CREDENTIALS", payload: data })
    } catch(err) {
        console.log(err)
    }
}