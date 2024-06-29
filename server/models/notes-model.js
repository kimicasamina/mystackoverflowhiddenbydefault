import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }

})

const noteModel = mongoose.model('notes', noteSchema)
export default noteModel

