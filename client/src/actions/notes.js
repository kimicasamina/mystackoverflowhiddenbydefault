import axios from 'axios'
import { useParams } from 'react-router-dom'

export const getNotes = (username) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/notes/${username}`)
        console.log(data)
        dispatch({ type: 'FETCH_NOTES', payload: data })
    } catch(err) {
        console.log(err)
    }
}

export const addNote = (input) => async (dispatch) => {
    try {
        const { data } = await axios.post('/notes/add', input)
        dispatch({ type: 'ADD_NOTE', payload: data })
        return data
    } catch(err) {
        console.log(err)
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/notes/${id}/delete`)
        console.log("ID:", id)
        dispatch({ type: 'DELETE_NOTE', payload: data })
    } catch(err) {
        console.log(err)
    }
}

export const updateNote = (input, id) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/notes/${id}/update`, input)
        dispatch({ type: 'UPDATE_NOTE', payload: data })
    } catch(err) {
        console.log(err)
    }
}



