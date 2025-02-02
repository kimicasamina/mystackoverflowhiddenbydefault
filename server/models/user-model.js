import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }, 
    notes: [{
        type: mongoose.Types.ObjectId,
        ref: "notes",
        // required: true
    }]


})



// const userModel = userConnection.model('user', userSchema)

const userModel = mongoose.model('users', userSchema)
export default userModel
