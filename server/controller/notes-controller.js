import express from 'express'
import mongoose from 'mongoose'
import noteModel from '../models/notes-model.js'
import userModel from '../models/user-model.js'
import { createError } from '../utils/createError.js'

export const getNotes = async (req, res, next) => {
    
    try {
        const notes = await noteModel.find()
        res.status(200).json(notes)
    } catch(err) {
        console.log(err)
        return next(createError(500, 'Failed to fetch notes'))
    }
}


export const addNotes = async (req, res, next) => {
    console.log("ADD NOTE")
    // const username = req.params

    const { title, body, tags, user } = req.body
    let existingUser 
    
    try {
        existingUser = await userModel.findById(user).select('-password')
        console.log("EXISTING USER", existingUser)
        if(!existingUser){
            return next(createError(409, 'Unable to find user by this id'))
        }
        
        let newNote = await noteModel.create({ 
            title, body, tags, user: existingUser._id
         })

        existingUser.notes.push(newNote._id)
        await existingUser.save()

        res.status(201).json({ message: 'Successfully added new note', newNote})
    } catch(err) {
        console.log(err)
        return next(createError(409, err.message))
    }
}

export const getNotesByUsername = async (req, res, next) => {
    const username = req.params
    console.log("USERNAME:", username)
    
    try {
        const notes = await userModel.findOne(username).select('notes').populate('notes')

        if(!notes){
            return next(createError(409, 'Unable to find user by this id'))
        }
        res.status(201).json(notes)
    } catch(err) {
        console.log(err)
        return next(createError(409, err.message))
    }
}

export const deleteNote = async (req, res, next) => {
    const id = req.params.id

    console.log("DELETE THIS NOTE:", id)
    try {
        const notes = await noteModel.findByIdAndDelete(id)
        console.log("DELETE NOTE:", notes)
        res.status(201).json(notes)

    } catch(err) {
        console.log(err)
        return next(createError(409, err.message))
    }
}

export const updateNote = async (req, res, next) => {
    let id = req.params.id
    console.log("ID:", id)
    const { title, body, tags, user } = req.body

    try {
        // id = mongoose.Types.ObjectId(id)
        // noteId = new mongoose.Types.ObjectId(id)
        console.log("UPDATE THIS NOTE:", id)    
        const notes = await noteModel.findByIdAndUpdate(id, { title: title, body: body, tags: tags })
        
        console.log("UPDATED NOTE:", notes)
        res.status(201).json(notes)

    } catch(err) {
        console.log(err)
        return next(createError(409, err.message))
    }
}