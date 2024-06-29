const notesReducer = (notes = [], action) => {
    switch (action.type) {
        case "FETCH_NOTES":
            return action.payload.notes

        case "ADD_NOTE":
            console.log("ADD_NOTE ACTION:", action.payload.newNote)
            return [...notes, action.payload.newNote]

        case "UPDATE_NOTE":
            const newNote = notes.map(note => {
                if(note._id === action.payload._id){
                    return action.payload
                }
            })

            return {...newNote}

        case "DELETE_NOTE":
            const newNotes = notes.filter((note, index) => index !== action.payload._id)
            console.log("NEW NOTES AFTER DELETE:", newNotes)
            return [...newNotes]
        

        default:
            return notes
    }
}

export default notesReducer